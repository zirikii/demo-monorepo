import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useProperty } from "@/features/property/PropertyProvider";
import type { PropertyState } from "@/features/property/types";
import { toLocalIso } from "@/lib/clock";
import { queueName } from "@/features/studio/config";
import { evaluateRouting } from "@/features/studio/routing";
import { useStudio } from "@/features/studio/StudioProvider";
import type { RoutingOutcome } from "@/features/studio/types";
import { getNode, requireNode, ROOT_ID, type FormId, type TemplateValues } from "./flows";
import { buildContext } from "./engine/context";
import {
  conversationReducer,
  initialConversation,
  liveOptions,
  renderStep,
  resolveFacts,
  resolveStepId,
  templateValues,
  type ConversationAction,
  type ConversationCustomer,
  type ConversationState,
  type RenderedOption,
  type Via,
} from "./engine/conversation";
import { validateForm, type FormResult } from "./engine/forms";
import { isSafetyConcern, resolveIntent } from "./engine/intent";
import { buildRecord, evaluateHandoff, handoffFacts, newSessionRef, promptOptions, routingSignals, stepTopicEnabled } from "./engine/session";
import { runChatTurn, type ChatInputItem } from "./chat/grokChat";
import {
  buildChatInstructions,
  buildVoiceInstructions,
  buildVoiceTools,
  describeCard,
  TOOL_GO_TO_STEP,
  TOOL_SELECT_RECORD,
  TOOL_SUBMIT_FORM,
} from "./engine/voicePrompt";
import { createPlayer, startMicrophone, type MicStream, type PcmPlayer } from "./voice/audio";
import { DemoVoice, canRecogniseSpeech } from "./voice/demoVoice";
import { GrokRealtimeClient, fetchVoiceStatus, requestVoiceGrant, type ToolResult } from "./voice/grokRealtime";

export type AssistantMode = "chat" | "voice";
export type VoiceStatus = "idle" | "connecting" | "listening" | "thinking" | "speaking" | "error";
export type VoiceProviderKind = "grok" | "demo";

export type VoiceState = {
  status: VoiceStatus;
  provider: VoiceProviderKind;
  /** True when the server has XAI_API_KEY and can mint Grok sessions. */
  grokConfigured: boolean;
  level: number;
  muted: boolean;
  interim: string;
  error: string | null;
  canRecognise: boolean;
};

export type OpenOptions = { step?: string; label?: string; mode?: AssistantMode; text?: string; recordId?: string };

export type AssistantContextValue = {
  isOpen: boolean;
  mode: AssistantMode;
  expanded: boolean;
  typing: boolean;
  conversation: ConversationState;
  options: RenderedOption[];
  voice: VoiceState;
  /** The routing decision behind the latest handoff, with a trace of every rule. */
  handoff: RoutingOutcome | null;
  open: (opts?: OpenOptions) => void;
  close: () => void;
  setExpanded: (expanded: boolean) => void;
  setMode: (mode: AssistantMode) => void;
  sendText: (text: string, via?: Via) => void;
  chooseOption: (option: RenderedOption) => void;
  goToStep: (stepId: string, userLabel?: string) => void;
  submitForm: (form: FormId, values: Record<string, string>, next: string) => FormResult;
  back: () => void;
  restart: () => void;
  toggleMute: () => void;
};

const AssistantContext = createContext<AssistantContextValue | null>(null);

const TYPING_MS = 650;

function stepPayload(stepId: string, values: TemplateValues, customer: ConversationCustomer): ToolResult {
  const { node, text, options, card } = renderStep(stepId, values, customer);
  return {
    step_id: node.id,
    title: node.title,
    say: text,
    options: options.filter((o) => !o.recordId).map((o) => ({ label: o.label, next: o.next })),
    ...(node.pick ? { records: options.filter((o) => o.recordId).map((o) => ({ record_id: o.recordId, label: o.label })) } : {}),
    on_screen: describeCard(card, values),
  };
}

export function AssistantProvider({ children }: { children: ReactNode }) {
  const store = useProperty();
  const studio = useStudio();
  const { config } = studio;
  const { profile, property, channels, bookings, invoices, team, events, rateLog, stopSell, signedIn } = store;

  const propertyState = useMemo<PropertyState>(
    () => ({ profile, property, channels, bookings, invoices, team, events, rateLog, stopSell }),
    [profile, property, channels, bookings, invoices, team, events, rateLog, stopSell],
  );
  const customer = useMemo<ConversationCustomer>(() => ({ property: propertyState, signedIn }), [propertyState, signedIn]);
  const context = useMemo(
    () =>
      buildContext({ state: propertyState, signedIn }, { personalGreeting: config.assistant.personalGreeting, insights: config.assistant.eventInsights }),
    [propertyState, signedIn, config.assistant.personalGreeting, config.assistant.eventInsights],
  );

  const [conversation, reactDispatch] = useReducer(conversationReducer, { context, customer }, initialConversation);
  const [isOpen, setOpen] = useState(false);
  const [mode, setModeState] = useState<AssistantMode>("chat");
  const [expanded, setExpanded] = useState(false);
  const [typing, setTyping] = useState(false);
  const [handoff, setHandoff] = useState<RoutingOutcome | null>(null);
  const [voice, setVoice] = useState<VoiceState>({
    status: "idle",
    provider: "demo",
    grokConfigured: false,
    level: 0,
    muted: false,
    interim: "",
    error: null,
    canRecognise: false,
  });

  const stateRef = useRef(conversation);
  stateRef.current = conversation;
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const studioRef = useRef(studio);
  studioRef.current = studio;
  const storeRef = useRef(store);
  storeRef.current = store;
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const grok = useRef<GrokRealtimeClient | null>(null);
  const mic = useRef<MicStream | null>(null);
  const player = useRef<PcmPlayer | null>(null);
  const demo = useRef<DemoVoice | null>(null);
  const spokenId = useRef(0);
  const grokConfigured = useRef(false);
  const chatResponseId = useRef<string | null>(null);
  const chatNotes = useRef<string[]>([]);
  const chatQueue = useRef<Promise<void>>(Promise.resolve());
  const chatTurn = useRef(0);
  const session = useRef(newSessionRef());
  const sessionMeta = useRef({ voice: false, grok: false, liveHandoff: false });
  const handoffRef = useRef<RoutingOutcome | null>(null);
  const appliedEffects = useRef(new Set<number>());

  const patchVoice = useCallback((patch: Partial<VoiceState>) => setVoice((v) => ({ ...v, ...patch })), []);

  // Advances stateRef immediately so later calls in the same handler (a deep link that then starts
  // voice, say) see this action instead of the last render's state. The reducer is pure, so the
  // render that follows lands on the same state.
  const dispatch = useCallback((action: ConversationAction) => {
    stateRef.current = conversationReducer(stateRef.current, action);
    reactDispatch(action);
  }, []);

  useEffect(() => {
    dispatch({ type: "set-context", context, customer });
  }, [context, customer, dispatch]);

  useEffect(() => {
    let cancelled = false;
    void fetchVoiceStatus().then((status) => {
      if (cancelled) return;
      grokConfigured.current = status.configured;
      patchVoice({ grokConfigured: status.configured, canRecognise: canRecogniseSpeech() });
    });
    return () => {
      cancelled = true;
    };
  }, [patchVoice]);

  const greeting = useCallback(() => renderStep(ROOT_ID, templateValues(stateRef.current), stateRef.current.customer).text, []);

  const ensureGreeting = useCallback(() => {
    if (stateRef.current.messages.length === 0) dispatch({ type: "step", stepId: ROOT_ID });
  }, [dispatch]);

  const saveSession = useCallback(() => {
    const state = stateRef.current;
    if (!state.messages.some((m) => m.role === "user")) return;
    studioRef.current.saveRecord(
      buildRecord({
        ...session.current,
        state,
        channel: sessionMeta.current.voice ? "voice" : "chat",
        engine: sessionMeta.current.grok ? "grok" : "scripted",
        handoff: handoffRef.current,
      }),
    );
  }, []);

  /** Where the step request really lands: topic switches, decisions and the handoff queue all apply. */
  const prepareStep = useCallback((requested: string, set?: TemplateValues): { stepId: string; set?: TemplateValues } => {
    const { config: cfg, log } = studioRef.current;
    const state = stateRef.current;
    const values = { ...templateValues(state), ...resolveFacts(set, templateValues(state)) };
    const target = getNode(requested) ? resolveStepId(requested, values) : "fallback";
    const stepId = stepTopicEnabled(cfg, target) ? target : "handoff";
    if (stepId !== "handoff") return { stepId, set };
    const signals = routingSignals({ ...state, facts: { ...state.facts, ...resolveFacts(set, templateValues(state)) } }, log, session.current.id);
    const outcome = evaluateHandoff(cfg, signals);
    handoffRef.current = outcome;
    setHandoff(outcome);
    if (cfg.assistant.showRoutingNotes) {
      const { decision } = outcome;
      dispatch({
        type: "system",
        text: `Routed to ${queueName(cfg, decision.queue)} · ${decision.priority} · ${decision.ruleName ?? "Standard routing"} — ${decision.reason}`,
      });
    }
    return { stepId, set: { ...set, ...handoffFacts(cfg, outcome, session.current.ref, state.customer) } };
  }, [dispatch]);

  /** Shows an already-prepared step, with a short typing pause in chat mode. */
  const showPrepared = useCallback(
    ({ stepId, set }: { stepId: string; set?: TemplateValues }) => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
      if (modeRef.current === "voice" && grok.current) {
        dispatch({ type: "step", stepId, set, silent: true });
        return;
      }
      setTyping(true);
      typingTimer.current = setTimeout(
        () => {
          setTyping(false);
          dispatch({ type: "step", stepId, set });
        },
        modeRef.current === "voice" ? 250 : TYPING_MS,
      );
    },
    [dispatch],
  );

  const respond = useCallback((requested: string, set?: TemplateValues) => showPrepared(prepareStep(requested, set)), [prepareStep, showPrepared]);

  /** Script for a prepared step, for notes to Grok while the chat is still showing the typing pause. */
  const scriptFor = useCallback(({ stepId, set }: { stepId: string; set?: TemplateValues }) => {
    const base = templateValues(stateRef.current);
    const values = { ...base, ...resolveFacts(set, base) };
    return { ...renderStep(stepId, values, stateRef.current.customer), values };
  }, []);

  /** Live voice hears notes straight away; Grok chat gets them with the hotelier's next message. */
  const tellGrok = useCallback((note: string) => {
    if (grok.current?.connected) grok.current.sendUserText(note);
    else if (!grok.current && grokConfigured.current) chatNotes.current.push(note);
  }, []);

  const respondScripted = useCallback(
    (text: string) => {
      const state = stateRef.current;
      const match = resolveIntent(text, state.currentStepId, liveOptions(state));
      if (!match) respond("fallback");
      else if (match.kind === "option") respond(match.option.next, match.option.set);
      else respond(match.stepId);
    },
    [respond],
  );

  /** A live routing rule matched: show the handoff step and tell Grok why. */
  const handOff = useCallback(
    (outcome: RoutingOutcome, said: string) => {
      sessionMeta.current.liveHandoff = true;
      const prepared = prepareStep("handoff");
      showPrepared(prepared);
      const { decision } = outcome;
      tellGrok(
        `(The hotelier said: "${said}". SiteMinder's routing rule "${decision.ruleName}" matched: ${decision.reason}. The screen already shows step handoff, so don't move it. Tell the hotelier: ${scriptFor(prepared).text})`,
      );
    },
    [prepareStep, scriptFor, showPrepared, tellGrok],
  );

  /** Runs live routing after a hotelier turn (typed, spoken, chip or form). Only one live handoff per chat. */
  const routeAfterTurn = useCallback(
    (said: string): boolean => {
      if (sessionMeta.current.liveHandoff || stateRef.current.currentStepId === "handoff") return false;
      const { config: cfg, log } = studioRef.current;
      const outcome = evaluateRouting(cfg, routingSignals(stateRef.current, log, session.current.id), "live");
      if (outcome.decision.action !== "handoff") return false;
      handOff(outcome, said);
      return true;
    },
    [handOff],
  );

  /** Safety beats everything: show the advice straight away, then a person. */
  const showSafety = useCallback(
    (said: string) => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
      setTyping(false);
      dispatch({ type: "step", stepId: "safety" });
      sessionMeta.current.liveHandoff = true;
      const prepared = prepareStep("handoff");
      showPrepared(prepared);
      tellGrok(
        `(Safety concern: the hotelier said "${said}". The screen shows the safety advice and a handoff to the ${scriptFor(prepared).values.handoffTeam ?? "support team"}, so don't move it. Tell them to call triple zero (000) if anyone is hurt or in danger, and that you're connecting them with the team now.)`,
      );
    },
    [dispatch, prepareStep, scriptFor, showPrepared, tellGrok],
  );

  const formContext = useCallback(() => {
    const s = storeRef.current;
    return {
      facts: templateValues(stateRef.current),
      rooms: s.property.roomTypes.map((r) => r.name),
      teamEmails: s.team.map((u) => u.email),
      today: toLocalIso(new Date()).slice(0, 10),
    };
  }, []);

  const handleToolCall = useCallback(
    (name: string, args: Record<string, unknown>): ToolResult => {
      const state = stateRef.current;
      const { config: cfg } = studioRef.current;
      if (name === TOOL_GO_TO_STEP) {
        const requested = String(args.step_id ?? "");
        if (!getNode(requested)) return { error: `Unknown step ${requested}` };
        if (!stepTopicEnabled(cfg, requested)) {
          return { error: `The SiteMinder support team has switched off step ${requested}'s topic for the assistant. Go to handoff instead.` };
        }
        const label = typeof args.option_label === "string" ? args.option_label.toLowerCase() : "";
        const chosen = liveOptions(state).find((o) => o.next === requested && (!label || o.label.toLowerCase() === label));
        const values = templateValues(state);
        const { stepId, set } = prepareStep(requested, resolveFacts(chosen?.set, values));
        if (stepId !== state.currentStepId) dispatch({ type: "step", stepId, set, silent: true });
        return stepPayload(stepId, { ...values, ...set }, state.customer);
      }
      if (name === TOOL_SELECT_RECORD) {
        const recordId = String(args.record_id ?? "").replace(/\s/g, "").toLowerCase();
        const options = liveOptions(state).filter((o) => o.recordId);
        const option = options.find((o) => o.recordId?.toLowerCase() === recordId);
        if (!option) {
          return {
            error: options.length
              ? `${recordId} isn't one of the choices on this step. Choices: ${options.map((o) => `${o.recordId} (${o.label})`).join(", ")}`
              : `The screen isn't asking for a record. Call ${TOOL_GO_TO_STEP} first.`,
          };
        }
        const { stepId, set } = prepareStep(option.next, option.set);
        dispatch({ type: "step", stepId, set, silent: true });
        return stepPayload(stepId, { ...templateValues(state), ...set }, state.customer);
      }
      if (name === TOOL_SUBMIT_FORM) {
        const form = String(args.form ?? "") as FormId;
        const node = state.currentStepId ? getNode(state.currentStepId) : undefined;
        const card = node?.card;
        if (card?.kind !== "form" || card.form !== form) {
          return { error: `The screen isn't showing the ${form} form. Call ${TOOL_GO_TO_STEP} first.` };
        }
        const result = validateForm(form, (args.values as Record<string, unknown>) ?? {}, formContext());
        if (!result.ok) return { error: "Some fields need fixing", fields: result.errors };
        dispatch({ type: "user", text: result.summary, via: modeRef.current === "voice" ? "voice" : "text" });
        if (routeAfterTurn(result.summary)) return stepPayload("handoff", templateValues(stateRef.current), state.customer);
        const { stepId, set } = prepareStep(card.next, result.facts);
        dispatch({ type: "step", stepId, set, silent: true });
        return stepPayload(stepId, { ...templateValues(state), ...set }, state.customer);
      }
      return { error: `Unknown tool ${name}` };
    },
    [dispatch, formContext, prepareStep, routeAfterTurn],
  );

  /** Fills a step Grok opened but never wrote about with the step's own script. */
  const settlePendingStep = useCallback(() => {
    const last = stateRef.current.messages[stateRef.current.messages.length - 1];
    if (last?.role !== "assistant" || !last.awaitingVoice || last.text || !last.stepId) return false;
    const text = renderStep(last.stepId, last.values ?? templateValues(stateRef.current), stateRef.current.customer).text;
    dispatch({ type: "assistant-transcript", text, final: true });
    return true;
  }, [dispatch]);

  const askGrokChat = useCallback(
    async (text: string) => {
      const turn = ++chatTurn.current;
      const current = () => turn === chatTurn.current;
      if (typingTimer.current) clearTimeout(typingTimer.current);
      setTyping(true);
      sessionMeta.current.grok = true;
      const state = stateRef.current;
      const { config: cfg } = studioRef.current;
      const input: ChatInputItem[] = [
        ...(chatResponseId.current
          ? []
          : [{ role: "system" as const, content: buildChatInstructions(templateValues(state), { ...promptOptions(cfg, state.customer), voiceForms: true }, greeting()) }]),
        ...chatNotes.current.map((note) => ({ role: "user" as const, content: note })),
        { role: "user", content: text },
      ];
      chatNotes.current = [];
      try {
        const reply = await runChatTurn({
          input,
          previousResponseId: chatResponseId.current,
          tools: buildVoiceTools(),
          onToolCall: (name, args) => (current() ? handleToolCall(name, args) : { error: "Conversation was reset" }),
        });
        if (!current()) return;
        chatResponseId.current = reply.responseId;
        if (reply.text) dispatch({ type: "assistant-transcript", text: reply.text, final: true });
        else settlePendingStep();
      } catch {
        if (!current()) return;
        dispatch({ type: "system", text: "Grok couldn't reply, so here's the guided answer." });
        if (!settlePendingStep()) respondScripted(text);
      } finally {
        if (current()) setTyping(false);
      }
    },
    [dispatch, greeting, handleToolCall, respondScripted, settlePendingStep],
  );

  const sendText = useCallback(
    (text: string, via: Via = "text") => {
      const trimmed = text.trim();
      if (!trimmed) return;
      ensureGreeting();
      dispatch({ type: "user", text: trimmed, via });
      if (isSafetyConcern(trimmed)) {
        showSafety(trimmed);
        return;
      }
      if (routeAfterTurn(trimmed)) return;
      if (modeRef.current === "voice" && grok.current) {
        tellGrok(trimmed);
        return;
      }
      if (grokConfigured.current) {
        // Serialised so each turn chains onto the previous response id.
        chatQueue.current = chatQueue.current.then(() => askGrokChat(trimmed));
        return;
      }
      respondScripted(trimmed);
    },
    [askGrokChat, dispatch, ensureGreeting, respondScripted, routeAfterTurn, showSafety, tellGrok],
  );

  const chooseOption = useCallback(
    (option: RenderedOption) => {
      const values = templateValues(stateRef.current);
      dispatch({ type: "user", text: option.label, via: "chip" });
      if (routeAfterTurn(option.label)) return;
      const prepared = prepareStep(option.next, resolveFacts(option.set, values));
      showPrepared(prepared);
      const script = scriptFor(prepared);
      tellGrok(`(Hotelier tapped: "${option.label}". The screen now shows step ${script.node.id}. Say: ${script.text})`);
    },
    [dispatch, prepareStep, routeAfterTurn, scriptFor, showPrepared, tellGrok],
  );

  /** Deep link into a step. With a record id on a picker step, skips the picker and routes that record. */
  const jumpTo = useCallback(
    (requested: string, userLabel: string | undefined, immediate: boolean, recordId?: string) => {
      const node = getNode(requested);
      if (!node) return;
      ensureGreeting();
      const said = userLabel ?? node.title;
      dispatch({ type: "user", text: said, via: "chip" });
      if (routeAfterTurn(said)) return;
      const values = templateValues(stateRef.current);
      const picked = recordId && node.pick
        ? renderStep(requested, values, stateRef.current.customer).options.find((o) => o.recordId === recordId)
        : undefined;
      const target = picked?.next ?? requested;
      const prepared = prepareStep(target, picked ? resolveFacts(picked.set, values) : undefined);
      if (immediate) {
        if (typingTimer.current) clearTimeout(typingTimer.current);
        setTyping(false);
        dispatch({ type: "step", stepId: prepared.stepId, set: prepared.set, silent: modeRef.current === "voice" && Boolean(grok.current) });
      } else {
        showPrepared(prepared);
      }
      tellGrok(`(Hotelier tapped: "${said}". The screen now shows step ${prepared.stepId}.)`);
    },
    [dispatch, ensureGreeting, prepareStep, routeAfterTurn, showPrepared, tellGrok],
  );

  const goToStep = useCallback((stepId: string, userLabel?: string) => jumpTo(stepId, userLabel, false), [jumpTo]);

  const submitForm = useCallback(
    (form: FormId, values: Record<string, string>, next: string): FormResult => {
      const result = validateForm(form, values, formContext());
      if (!result.ok) return result;
      dispatch({ type: "user", text: result.summary, via: "text" });
      if (routeAfterTurn(result.summary)) return result;
      respond(next, result.facts);
      tellGrok(`(Hotelier submitted the ${form} form on screen: ${result.summary}. The screen now shows step ${next}.)`);
      return result;
    },
    [dispatch, formContext, respond, routeAfterTurn, tellGrok],
  );

  const stopVoice = useCallback(() => {
    grok.current?.close();
    grok.current = null;
    mic.current?.stop();
    mic.current = null;
    player.current?.close();
    player.current = null;
    demo.current?.close();
    demo.current = null;
    patchVoice({ status: "idle", level: 0, interim: "" });
  }, [patchVoice]);

  const startDemoVoice = useCallback(
    (reason?: string) => {
      demo.current?.close();
      spokenId.current = 0;
      sessionMeta.current.voice = true;
      demo.current = new DemoVoice({
        onSpeaking: (speaking) => {
          if (speaking) patchVoice({ status: "speaking" });
        },
        onLevel: (level) => patchVoice({ level }),
        onInterim: (interim) => patchVoice({ interim, status: "listening" }),
        onFinal: (text) => {
          patchVoice({ interim: "", status: "thinking" });
          sendText(text, "voice");
        },
        onListening: (listening) => {
          if (listening) patchVoice({ status: "listening" });
        },
      });
      patchVoice({ provider: "demo", status: "speaking", error: reason ?? null });
      ensureGreeting();
    },
    [ensureGreeting, patchVoice, sendText],
  );

  const startGrokVoice = useCallback(async () => {
    patchVoice({ provider: "grok", status: "connecting", error: null });
    sessionMeta.current.voice = true;
    sessionMeta.current.grok = true;
    let audioSession: PcmPlayer | null = null;
    try {
      // Created before the first await so the audio context is unlocked by the click that got us here.
      audioSession = createPlayer((level) => {
        if (player.current?.isPlaying()) patchVoice({ level, status: "speaking" });
      });
      player.current = audioSession;
      const audio = audioSession.context;
      const grant = await requestVoiceGrant();
      // stopVoice or a newer session replaced the player while the grant was in flight.
      if (player.current !== audioSession) return;
      const resumeStep = stateRef.current.currentStepId;
      const resuming = Boolean(resumeStep && resumeStep !== ROOT_ID);
      // The root step starts silent and is filled by the greeting's transcript, or by its script once the greeting ends.
      if (stateRef.current.messages.length === 0) dispatch({ type: "step", stepId: ROOT_ID, silent: true });
      const { config: cfg } = studioRef.current;
      const client = new GrokRealtimeClient({
        grant,
        voice: cfg.assistant.voice,
        instructions: buildVoiceInstructions(templateValues(stateRef.current), promptOptions(cfg, stateRef.current.customer), greeting(), resumeStep),
        tools: buildVoiceTools({ voiceForms: cfg.assistant.voiceForms }),
        greeting: resuming ? undefined : greeting(),
        handlers: {
          onOpen: () => {
            void startMicrophone(
              audio,
              (chunk) => client.appendAudio(chunk),
              (level) => {
                if (!player.current?.isPlaying()) patchVoice({ level });
              },
            )
              .then((stream) => {
                if (player.current !== audioSession) {
                  stream.stop();
                  return;
                }
                mic.current = stream;
                patchVoice({ status: "listening" });
              })
              .catch(() => patchVoice({ status: "error", error: "Microphone access was blocked. Allow it in your browser to talk to SiteMinder Support." }));
          },
          onUserSpeechStarted: () => {
            player.current?.interrupt();
            patchVoice({ status: "listening" });
          },
          onUserSpeechStopped: () => patchVoice({ status: "thinking", level: 0 }),
          onUserTranscript: (text) => {
            dispatch({ type: "user", text, via: "voice" });
            if (isSafetyConcern(text)) showSafety(text);
            else routeAfterTurn(text);
          },
          onAssistantTranscript: (text, final) => dispatch({ type: "assistant-transcript", text, final }),
          onAudio: (b64) => player.current?.enqueue(b64),
          // response.done lands well before the audio finishes, so hand the turn back only once it has played out.
          onResponseDone: () => {
            settlePendingStep();
            void audioSession?.whenIdle().then(() => {
              if (player.current === audioSession) patchVoice({ status: "listening", level: 0 });
            });
          },
          waitForPlayback: async () => {
            await audioSession?.whenIdle();
            if (player.current === audioSession) patchVoice({ status: "thinking", level: 0 });
          },
          onToolCall: handleToolCall,
          onError: (message) => patchVoice({ error: message }),
          onClose: () => {
            if (grok.current === client) patchVoice({ status: "idle" });
          },
        },
      });
      grok.current = client;
      client.connect();
    } catch (err) {
      if (audioSession && player.current !== audioSession) return;
      audioSession?.close();
      player.current = null;
      const message = err instanceof Error ? err.message : "Grok voice is unavailable";
      startDemoVoice(`${message}. Using browser voice instead.`);
    }
  }, [dispatch, greeting, handleToolCall, patchVoice, routeAfterTurn, settlePendingStep, showSafety, startDemoVoice]);

  const setMode = useCallback(
    (next: AssistantMode) => {
      if (next === modeRef.current) return;
      modeRef.current = next;
      setModeState(next);
      if (next === "chat") {
        const wasLive = Boolean(grok.current);
        stopVoice();
        const step = stateRef.current.currentStepId;
        if (wasLive && step) tellGrok(`(The hotelier switched from voice back to chat on step ${step}.)`);
        return;
      }
      if (grokConfigured.current) void startGrokVoice();
      else startDemoVoice();
    },
    [startDemoVoice, startGrokVoice, stopVoice, tellGrok],
  );

  // Browser voice speaks each new assistant turn, then listens for the reply.
  useEffect(() => {
    const d = demo.current;
    if (mode !== "voice" || !d) return;
    const last = conversation.messages[conversation.messages.length - 1];
    if (!last || last.role !== "assistant" || !last.text || last.id <= spokenId.current) return;
    spokenId.current = last.id;
    d.speak(last.text, () => {
      patchVoice({ status: "listening" });
      d.listen();
    });
  }, [conversation.messages, mode, patchVoice]);

  // Steps that change the account (channel fixes, payments, rates, users) apply once, when shown.
  useEffect(() => {
    const last = conversation.messages[conversation.messages.length - 1];
    if (!last || last.role !== "assistant" || !last.stepId || appliedEffects.current.has(last.id)) return;
    const effect = requireNode(last.stepId).effect;
    if (!effect) return;
    appliedEffects.current.add(last.id);
    storeRef.current.apply(effect, last.values ?? {});
  }, [conversation.messages]);

  const open = useCallback(
    (opts: OpenOptions = {}) => {
      setOpen(true);
      // Voice reads the current step as it starts, so a voice deep link can't wait out the typing pause.
      if (opts.step) jumpTo(opts.step, opts.label, opts.mode === "voice", opts.recordId);
      else if (opts.text) sendText(opts.text);
      if (opts.mode) setMode(opts.mode);
    },
    [jumpTo, sendText, setMode],
  );

  const close = useCallback(() => {
    setOpen(false);
    if (modeRef.current === "voice") setMode("chat");
    saveSession();
  }, [saveSession, setMode]);

  const back = useCallback(() => {
    dispatch({ type: "back" });
  }, [dispatch]);

  const restart = useCallback(() => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setTyping(false);
    saveSession();
    session.current = newSessionRef();
    sessionMeta.current = { voice: false, grok: false, liveHandoff: false };
    handoffRef.current = null;
    setHandoff(null);
    dispatch({ type: "reset" });
    chatTurn.current++;
    chatResponseId.current = null;
    chatNotes.current = [];
    if (modeRef.current === "voice") {
      stopVoice();
      modeRef.current = "chat";
      setModeState("chat");
    }
  }, [dispatch, saveSession, stopVoice]);

  const toggleMute = useCallback(() => {
    setVoice((v) => {
      const muted = !v.muted;
      mic.current?.setMuted(muted);
      demo.current?.setMuted(muted);
      if (!muted) demo.current?.listen();
      return { ...v, muted };
    });
  }, []);

  // Reaching the end or a person logs the conversation; the pause lets a spoken line finish transcribing.
  useEffect(() => {
    const step = conversation.currentStepId;
    if (step !== "end" && step !== "handoff") return;
    const timer = setTimeout(saveSession, 1500);
    return () => clearTimeout(timer);
  }, [conversation.currentStepId, saveSession]);

  useEffect(() => {
    window.addEventListener("pagehide", saveSession);
    return () => window.removeEventListener("pagehide", saveSession);
  }, [saveSession]);

  useEffect(() => () => stopVoice(), [stopVoice]);
  useEffect(
    () => () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
    },
    [],
  );

  const value = useMemo<AssistantContextValue>(
    () => ({
      isOpen,
      mode,
      expanded,
      typing,
      conversation,
      options: typing ? [] : liveOptions(conversation),
      voice,
      handoff,
      open,
      close,
      setExpanded,
      setMode,
      sendText,
      chooseOption,
      goToStep,
      submitForm,
      back,
      restart,
      toggleMute,
    }),
    [isOpen, mode, expanded, typing, conversation, voice, handoff, open, close, setMode, sendText, chooseOption, goToStep, submitForm, back, restart, toggleMute],
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAssistant(): AssistantContextValue {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error("useAssistant must be used inside <AssistantProvider>");
  return ctx;
}

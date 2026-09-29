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
import { useAuth } from "@/hooks/useAuth";
import { getNode, renderTemplate, ROOT_ID, type FormId, type TemplateValues } from "./flows";
import { buildContext, GUEST } from "./engine/context";
import {
  conversationReducer,
  initialConversation,
  liveOptions,
  renderStep,
  resolveFacts,
  templateValues,
  type ConversationAction,
  type ConversationState,
  type RenderedOption,
  type Via,
} from "./engine/conversation";
import { validateForm, type FormResult } from "./engine/forms";
import { resolveIntent } from "./engine/intent";
import { runChatTurn, type ChatInputItem } from "./chat/grokChat";
import {
  buildChatInstructions,
  buildVoiceInstructions,
  buildVoiceTools,
  describeCard,
  TOOL_GO_TO_STEP,
  TOOL_SUBMIT_FORM,
} from "./engine/voicePrompt";
import { createPlayer, startMicrophone, type MicStream, type PcmPlayer } from "./voice/audio";
import { DemoVoice, canRecogniseSpeech } from "./voice/demoVoice";
import {
  GrokRealtimeClient,
  fetchVoiceStatus,
  requestVoiceGrant,
  type ToolResult,
} from "./voice/grokRealtime";

export type AssistantMode = "chat" | "voice";
export type VoiceStatus = "idle" | "connecting" | "listening" | "thinking" | "speaking" | "error";
export type VoiceProviderKind = "grok" | "demo";

export type VoiceState = {
  status: VoiceStatus;
  provider: VoiceProviderKind;
  /** True when the dev server has XAI_API_KEY and can mint Grok Voice sessions. */
  grokConfigured: boolean;
  level: number;
  muted: boolean;
  interim: string;
  error: string | null;
  canRecognise: boolean;
};

type OpenOptions = { step?: string; label?: string; mode?: AssistantMode };

export type AssistantContextValue = {
  isOpen: boolean;
  mode: AssistantMode;
  expanded: boolean;
  typing: boolean;
  conversation: ConversationState;
  options: RenderedOption[];
  voice: VoiceState;
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

function stepPayload(stepId: string, values: TemplateValues): ToolResult {
  const { node, text, options } = renderStep(stepId, values);
  return {
    step_id: node.id,
    title: node.title,
    say: text,
    options: options.map((o) => ({ label: o.label, next: o.next })),
    on_screen: describeCard(node.card, values),
  };
}

export function AssistantProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const context = useMemo(
    () => buildContext(user ? { firstName: user.firstName, email: user.email } : GUEST),
    [user],
  );
  const [conversation, reactDispatch] = useReducer(conversationReducer, context, initialConversation);
  const [isOpen, setOpen] = useState(false);
  const [mode, setModeState] = useState<AssistantMode>("chat");
  const [expanded, setExpanded] = useState(false);
  const [typing, setTyping] = useState(false);
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

  const patchVoice = useCallback((patch: Partial<VoiceState>) => setVoice((v) => ({ ...v, ...patch })), []);

  // Advances stateRef immediately so later calls in the same handler (a deep link that then starts
  // voice, say) see this action instead of the last render's state. The reducer is pure, so the
  // render that follows lands on the same state.
  const dispatch = useCallback((action: ConversationAction) => {
    stateRef.current = conversationReducer(stateRef.current, action);
    reactDispatch(action);
  }, []);

  useEffect(() => {
    dispatch({ type: "set-context", context });
  }, [context, dispatch]);

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

  const ensureGreeting = useCallback(() => {
    if (stateRef.current.messages.length === 0) dispatch({ type: "step", stepId: ROOT_ID });
  }, [dispatch]);

  /** Shows the next assistant step, with a short typing pause in chat mode. */
  const respond = useCallback((stepId: string, set?: TemplateValues) => {
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
  }, [dispatch]);

  /** Live voice hears notes straight away; Grok chat gets them with the customer's next message. */
  const tellGrok = useCallback((note: string) => {
    if (grok.current?.connected) grok.current.sendUserText(note);
    else if (!grok.current && grokConfigured.current) chatNotes.current.push(note);
  }, []);

  const respondScripted = useCallback(
    (text: string) => {
      const match = resolveIntent(text, stateRef.current.currentStepId);
      if (!match) respond("fallback");
      else if (match.kind === "option") respond(match.option.next, match.option.set);
      else respond(match.stepId);
    },
    [respond],
  );

  const handleToolCall = useCallback((name: string, args: Record<string, unknown>): ToolResult => {
    const state = stateRef.current;
    if (name === TOOL_GO_TO_STEP) {
      const stepId = String(args.step_id ?? "");
      if (!getNode(stepId)) return { error: `Unknown step ${stepId}` };
      const current = state.currentStepId ? getNode(state.currentStepId) : undefined;
      const label = typeof args.option_label === "string" ? args.option_label.toLowerCase() : "";
      const chosen = current?.options.find(
        (o) => o.next === stepId && (!label || renderTemplate(o.label, templateValues(state)).toLowerCase() === label),
      );
      const values = templateValues(state);
      const set = resolveFacts(chosen?.set, values);
      if (stepId !== state.currentStepId) dispatch({ type: "step", stepId, set, silent: true });
      return stepPayload(stepId, { ...values, ...set });
    }
    if (name === TOOL_SUBMIT_FORM) {
      const form = String(args.form ?? "") as FormId;
      const node = state.currentStepId ? getNode(state.currentStepId) : undefined;
      const card = node?.card;
      if (card?.kind !== "form" || card.form !== form) {
        return { error: `The screen isn't showing the ${form} form. Call ${TOOL_GO_TO_STEP} first.` };
      }
      const result = validateForm(form, (args.values as Record<string, unknown>) ?? {});
      if (!result.ok) return { error: "Some fields need fixing", fields: result.errors };
      dispatch({ type: "user", text: result.summary, via: modeRef.current === "voice" ? "voice" : "text" });
      dispatch({ type: "step", stepId: card.next, set: result.facts, silent: true });
      return stepPayload(card.next, { ...templateValues(state), ...result.facts });
    }
    return { error: `Unknown tool ${name}` };
  }, [dispatch]);

  /** Fills a step Grok opened but never wrote about with the step's own script. */
  const settlePendingStep = useCallback(() => {
    const last = stateRef.current.messages[stateRef.current.messages.length - 1];
    if (last?.role !== "assistant" || !last.awaitingVoice || last.text || !last.stepId) return false;
    dispatch({ type: "assistant-transcript", text: renderStep(last.stepId, templateValues(stateRef.current)).text, final: true });
    return true;
  }, [dispatch]);

  const askGrokChat = useCallback(
    async (text: string) => {
      const turn = ++chatTurn.current;
      const current = () => turn === chatTurn.current;
      if (typingTimer.current) clearTimeout(typingTimer.current);
      setTyping(true);
      const input: ChatInputItem[] = [
        ...(chatResponseId.current ? [] : [{ role: "system" as const, content: buildChatInstructions(templateValues(stateRef.current)) }]),
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
    [dispatch, handleToolCall, respondScripted, settlePendingStep],
  );

  const sendText = useCallback(
    (text: string, via: Via = "text") => {
      const trimmed = text.trim();
      if (!trimmed) return;
      ensureGreeting();
      dispatch({ type: "user", text: trimmed, via });
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
    [askGrokChat, dispatch, ensureGreeting, respondScripted, tellGrok],
  );

  const chooseOption = useCallback(
    (option: RenderedOption) => {
      const values = templateValues(stateRef.current);
      const facts = resolveFacts(option.set, values);
      dispatch({ type: "user", text: option.label, via: "chip" });
      respond(option.next, option.set);
      const script = renderStep(option.next, { ...values, ...facts }).text;
      tellGrok(`(Customer tapped: "${option.label}". The screen now shows step ${option.next}. Say: ${script})`);
    },
    [dispatch, respond, tellGrok],
  );

  const jumpTo = useCallback(
    (stepId: string, userLabel: string | undefined, immediate: boolean) => {
      const node = getNode(stepId);
      if (!node) return;
      ensureGreeting();
      dispatch({ type: "user", text: userLabel ?? node.title, via: "chip" });
      if (immediate) {
        if (typingTimer.current) clearTimeout(typingTimer.current);
        setTyping(false);
        dispatch({ type: "step", stepId, silent: modeRef.current === "voice" && Boolean(grok.current) });
      } else {
        respond(stepId);
      }
      tellGrok(`(Customer tapped: "${userLabel ?? node.title}". The screen now shows step ${stepId}.)`);
    },
    [dispatch, ensureGreeting, respond, tellGrok],
  );

  const goToStep = useCallback((stepId: string, userLabel?: string) => jumpTo(stepId, userLabel, false), [jumpTo]);

  const submitForm = useCallback(
    (form: FormId, values: Record<string, string>, next: string): FormResult => {
      const result = validateForm(form, values);
      if (!result.ok) return result;
      dispatch({ type: "user", text: result.summary, via: "text" });
      respond(next, result.facts);
      tellGrok(`(Customer submitted the ${form} form on screen: ${result.summary}. The screen now shows step ${next}.)`);
      return result;
    },
    [dispatch, respond, tellGrok],
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
    let session: PcmPlayer | null = null;
    try {
      // Created before the first await so the audio context is unlocked by the click that got us here.
      session = createPlayer((level) => {
        if (player.current?.isPlaying()) patchVoice({ level, status: "speaking" });
      });
      player.current = session;
      const audio = session.context;
      const grant = await requestVoiceGrant();
      // stopVoice or a newer session replaced the player while the grant was in flight.
      if (player.current !== session) return;
      const resumeStep = stateRef.current.currentStepId;
      const resuming = Boolean(resumeStep && resumeStep !== ROOT_ID);
      // The root step starts silent and is filled by the greeting's transcript, or by its script once the greeting ends.
      if (stateRef.current.messages.length === 0) dispatch({ type: "step", stepId: ROOT_ID, silent: true });
      const client = new GrokRealtimeClient({
        grant,
        instructions: buildVoiceInstructions(templateValues(stateRef.current), resumeStep),
        tools: buildVoiceTools(),
        greeting: resuming ? undefined : renderStep(ROOT_ID, templateValues(stateRef.current)).text,
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
                if (player.current !== session) {
                  stream.stop();
                  return;
                }
                mic.current = stream;
                patchVoice({ status: "listening" });
              })
              .catch(() => patchVoice({ status: "error", error: "Microphone access was blocked. Allow it in your browser to talk to the assistant." }));
          },
          onUserSpeechStarted: () => {
            player.current?.interrupt();
            patchVoice({ status: "listening" });
          },
          onUserSpeechStopped: () => patchVoice({ status: "thinking", level: 0 }),
          onUserTranscript: (text) => dispatch({ type: "user", text, via: "voice" }),
          onAssistantTranscript: (text, final) => dispatch({ type: "assistant-transcript", text, final }),
          onAudio: (b64) => player.current?.enqueue(b64),
          // response.done lands well before the audio finishes, so hand the turn back only once it has played out.
          onResponseDone: () => {
            settlePendingStep();
            void session?.whenIdle().then(() => {
              if (player.current === session) patchVoice({ status: "listening", level: 0 });
            });
          },
          waitForPlayback: async () => {
            await session?.whenIdle();
            if (player.current === session) patchVoice({ status: "thinking", level: 0 });
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
      if (session && player.current !== session) return;
      session?.close();
      player.current = null;
      const message = err instanceof Error ? err.message : "Grok voice is unavailable";
      startDemoVoice(`${message}. Using demo voice instead.`);
    }
  }, [dispatch, handleToolCall, patchVoice, settlePendingStep, startDemoVoice]);

  const setMode = useCallback(
    (next: AssistantMode) => {
      if (next === modeRef.current) return;
      modeRef.current = next;
      setModeState(next);
      if (next === "chat") {
        const wasLive = Boolean(grok.current);
        stopVoice();
        const step = stateRef.current.currentStepId;
        if (wasLive && step) tellGrok(`(The customer switched from voice back to chat on step ${step}.)`);
        return;
      }
      if (voice.grokConfigured) void startGrokVoice();
      else startDemoVoice();
    },
    [startDemoVoice, startGrokVoice, stopVoice, tellGrok, voice.grokConfigured],
  );

  // Demo voice speaks each new assistant turn, then listens for the reply.
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

  const open = useCallback(
    (opts: OpenOptions = {}) => {
      setOpen(true);
      // Voice reads the current step as it starts, so a voice deep link can't wait out the typing pause.
      if (opts.step) jumpTo(opts.step, opts.label, opts.mode === "voice");
      if (opts.mode) setMode(opts.mode);
    },
    [jumpTo, setMode],
  );

  const close = useCallback(() => {
    setOpen(false);
    if (modeRef.current === "voice") setMode("chat");
  }, [setMode]);

  const back = useCallback(() => {
    dispatch({ type: "back" });
  }, [dispatch]);

  const restart = useCallback(() => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setTyping(false);
    dispatch({ type: "reset" });
    chatTurn.current++;
    chatResponseId.current = null;
    chatNotes.current = [];
    if (modeRef.current === "voice") {
      stopVoice();
      modeRef.current = "chat";
      setModeState("chat");
    }
  }, [dispatch, stopVoice]);

  const toggleMute = useCallback(() => {
    setVoice((v) => {
      const muted = !v.muted;
      mic.current?.setMuted(muted);
      demo.current?.setMuted(muted);
      if (!muted) demo.current?.listen();
      return { ...v, muted };
    });
  }, []);

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
    [isOpen, mode, expanded, typing, conversation, voice, open, close, setMode, sendText, chooseOption, goToStep, submitForm, back, restart, toggleMute],
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAssistant(): AssistantContextValue {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error("useAssistant must be used inside <AssistantProvider>");
  return ctx;
}

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
  templateValues,
  type ConversationState,
  type RenderedOption,
  type Via,
} from "./engine/conversation";
import { validateForm, type FormResult } from "./engine/forms";
import { resolveIntent } from "./engine/intent";
import {
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
  const [conversation, dispatch] = useReducer(conversationReducer, context, initialConversation);
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

  const patchVoice = useCallback((patch: Partial<VoiceState>) => setVoice((v) => ({ ...v, ...patch })), []);

  useEffect(() => {
    dispatch({ type: "set-context", context });
  }, [context]);

  useEffect(() => {
    let cancelled = false;
    void fetchVoiceStatus().then((status) => {
      if (!cancelled) patchVoice({ grokConfigured: status.configured, canRecognise: canRecogniseSpeech() });
    });
    return () => {
      cancelled = true;
    };
  }, [patchVoice]);

  const ensureGreeting = useCallback(() => {
    if (stateRef.current.messages.length === 0) dispatch({ type: "step", stepId: ROOT_ID });
  }, []);

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
  }, []);

  const tellGrok = useCallback((note: string) => {
    if (grok.current?.connected) grok.current.sendUserText(note);
  }, []);

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
      const match = resolveIntent(trimmed, stateRef.current.currentStepId);
      if (!match) respond("fallback");
      else if (match.kind === "option") respond(match.option.next, match.option.set);
      else respond(match.stepId);
    },
    [ensureGreeting, respond, tellGrok],
  );

  const chooseOption = useCallback(
    (option: RenderedOption) => {
      dispatch({ type: "user", text: option.label, via: "chip" });
      respond(option.next, option.set);
      if (grok.current) {
        const values = { ...templateValues(stateRef.current) };
        const script = renderStep(option.next, values).text;
        tellGrok(`(Customer tapped: "${option.label}". The screen now shows step ${option.next}. Say: ${script})`);
      }
    },
    [respond, tellGrok],
  );

  const goToStep = useCallback(
    (stepId: string, userLabel?: string) => {
      const node = getNode(stepId);
      if (!node) return;
      ensureGreeting();
      dispatch({ type: "user", text: userLabel ?? node.title, via: "chip" });
      respond(stepId);
      if (grok.current) tellGrok(`(Customer tapped: "${userLabel ?? node.title}". The screen now shows step ${stepId}.)`);
    },
    [ensureGreeting, respond, tellGrok],
  );

  const submitForm = useCallback(
    (form: FormId, values: Record<string, string>, next: string): FormResult => {
      const result = validateForm(form, values);
      if (!result.ok) return result;
      dispatch({ type: "user", text: result.summary, via: "text" });
      respond(next, result.facts);
      if (grok.current) tellGrok(`(Customer submitted the ${form} form on screen: ${result.summary}. The screen now shows step ${next}.)`);
      return result;
    },
    [respond, tellGrok],
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
      const set = chosen?.set
        ? Object.fromEntries(Object.entries(chosen.set).map(([k, v]) => [k, renderTemplate(v, values)]))
        : undefined;
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
      dispatch({ type: "user", text: result.summary, via: "voice" });
      dispatch({ type: "step", stepId: card.next, set: result.facts, silent: true });
      return stepPayload(card.next, { ...templateValues(state), ...result.facts });
    }
    return { error: `Unknown tool ${name}` };
  }, []);

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
    try {
      const grant = await requestVoiceGrant();
      if (modeRef.current !== "voice") return;
      const resumeStep = stateRef.current.currentStepId;
      // Grok speaks the greeting itself; the silent root step is filled by its transcript.
      if (stateRef.current.messages.length === 0) dispatch({ type: "step", stepId: ROOT_ID, silent: true });
      player.current = createPlayer((level) => {
        if (player.current?.isPlaying()) patchVoice({ level, status: "speaking" });
      });
      const client = new GrokRealtimeClient({
        grant,
        instructions: buildVoiceInstructions(templateValues(stateRef.current), resumeStep),
        tools: buildVoiceTools(),
        handlers: {
          onOpen: () => {
            void startMicrophone(
              (chunk) => client.appendAudio(chunk),
              (level) => {
                if (!player.current?.isPlaying()) patchVoice({ level });
              },
            )
              .then((stream) => {
                mic.current = stream;
                patchVoice({ status: "listening" });
              })
              .catch(() => patchVoice({ status: "error", error: "Microphone access was blocked. Allow it in your browser to talk to the assistant." }));
          },
          onUserSpeechStarted: () => {
            player.current?.interrupt();
            patchVoice({ status: "listening" });
          },
          onUserTranscript: (text) => dispatch({ type: "user", text, via: "voice" }),
          onAssistantTranscript: (text, final) => dispatch({ type: "assistant-transcript", text, final }),
          onAudio: (b64) => player.current?.enqueue(b64),
          onResponseDone: () => patchVoice({ status: "listening" }),
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
      const message = err instanceof Error ? err.message : "Grok voice is unavailable";
      startDemoVoice(`${message}. Using demo voice instead.`);
    }
  }, [handleToolCall, patchVoice, startDemoVoice]);

  const setMode = useCallback(
    (next: AssistantMode) => {
      if (next === modeRef.current) return;
      modeRef.current = next;
      setModeState(next);
      if (next === "chat") {
        stopVoice();
        return;
      }
      if (voice.grokConfigured) void startGrokVoice();
      else startDemoVoice();
    },
    [startDemoVoice, startGrokVoice, stopVoice, voice.grokConfigured],
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
      if (opts.step) goToStep(opts.step, opts.label);
      if (opts.mode) setMode(opts.mode);
    },
    [goToStep, setMode],
  );

  const close = useCallback(() => {
    setOpen(false);
    if (modeRef.current === "voice") setMode("chat");
  }, [setMode]);

  const back = useCallback(() => {
    dispatch({ type: "back" });
  }, []);

  const restart = useCallback(() => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setTyping(false);
    dispatch({ type: "reset" });
    if (modeRef.current === "voice") {
      stopVoice();
      modeRef.current = "chat";
      setModeState("chat");
    }
  }, [stopVoice]);

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

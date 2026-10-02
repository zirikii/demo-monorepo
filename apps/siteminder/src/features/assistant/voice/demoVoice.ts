type SpeechRecognitionResultLike = { isFinal: boolean; 0: { transcript: string } };
type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type RecognitionCtor = new () => SpeechRecognitionLike;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function canRecogniseSpeech(): boolean {
  return recognitionCtor() !== null;
}

export type DemoVoiceHandlers = {
  onSpeaking: (speaking: boolean) => void;
  onLevel: (level: number) => void;
  onInterim: (text: string) => void;
  onFinal: (text: string) => void;
  onListening: (listening: boolean) => void;
};

/**
 * Stand-in for Grok Voice while the API key is pending: browser speech synthesis for the
 * assistant, browser speech recognition (where available) for the customer, and a synthetic
 * level so the visualiser animates even on machines without audio output.
 */
export class DemoVoice {
  private recognition: SpeechRecognitionLike | null = null;
  private raf = 0;
  private speakTimer: ReturnType<typeof setTimeout> | null = null;
  private muted = false;
  private active = true;
  private readonly handlers: DemoVoiceHandlers;

  constructor(handlers: DemoVoiceHandlers) {
    this.handlers = handlers;
  }

  speak(text: string, onDone?: () => void): void {
    this.stopSpeaking();
    this.stopListening();
    const finish = () => {
      if (!this.active) return;
      this.stopSpeaking();
      onDone?.();
    };
    this.handlers.onSpeaking(true);
    this.animate();

    // Browsers without voices (headless, some Linux builds) still get a paced "speaking" state.
    const estimateMs = Math.min(9000, 900 + text.length * 55);
    this.speakTimer = setTimeout(finish, estimateMs);

    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (synth && synth.getVoices().length > 0) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-AU";
      utterance.rate = 1.03;
      const voice =
        synth.getVoices().find((v) => v.lang === "en-AU") ??
        synth.getVoices().find((v) => v.lang.startsWith("en"));
      if (voice) utterance.voice = voice;
      utterance.onend = () => {
        if (this.speakTimer) clearTimeout(this.speakTimer);
        finish();
      };
      synth.cancel();
      synth.speak(utterance);
    }
  }

  listen(): void {
    if (this.muted || !this.active) return;
    const Ctor = recognitionCtor();
    if (!Ctor) {
      this.handlers.onListening(true);
      return;
    }
    this.stopListening();
    const rec = new Ctor();
    rec.lang = "en-AU";
    rec.continuous = false;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i]!;
        if (result.isFinal) {
          this.handlers.onFinal(result[0].transcript);
          return;
        }
        interim += result[0].transcript;
      }
      this.handlers.onInterim(interim);
      this.handlers.onLevel(0.35 + Math.random() * 0.4);
    };
    rec.onend = () => this.handlers.onListening(false);
    rec.onerror = () => this.handlers.onListening(false);
    this.recognition = rec;
    try {
      rec.start();
      this.handlers.onListening(true);
    } catch {
      this.handlers.onListening(false);
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (muted) this.stopListening();
  }

  interrupt(): void {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    this.stopSpeaking();
  }

  close(): void {
    this.active = false;
    this.interrupt();
    this.stopListening();
  }

  private stopListening(): void {
    if (this.recognition) {
      this.recognition.onend = null;
      this.recognition.abort();
      this.recognition = null;
    }
    this.handlers.onListening(false);
  }

  private stopSpeaking(): void {
    if (this.speakTimer) clearTimeout(this.speakTimer);
    this.speakTimer = null;
    cancelAnimationFrame(this.raf);
    this.handlers.onLevel(0);
    this.handlers.onSpeaking(false);
  }

  private animate(): void {
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const level = 0.45 + 0.3 * Math.sin(t * 9) * Math.sin(t * 2.3) + 0.15 * Math.sin(t * 17);
      this.handlers.onLevel(Math.max(0.1, Math.min(1, level)));
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }
}

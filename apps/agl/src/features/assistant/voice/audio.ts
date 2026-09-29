import {
  REALTIME_SAMPLE_RATE,
  base64ToInt16,
  floatTo16BitPcm,
  int16ToBase64,
  pcm16ToFloat,
  resampleLinear,
  rmsLevel,
} from "./pcm";

const WORKLET_SOURCE = `
class PcmCapture extends AudioWorkletProcessor {
  constructor() { super(); this.buffer = []; this.size = 0; }
  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (channel) {
      this.buffer.push(new Float32Array(channel));
      this.size += channel.length;
      if (this.size >= 960) {
        const out = new Float32Array(this.size);
        let offset = 0;
        for (const b of this.buffer) { out.set(b, offset); offset += b.length; }
        this.port.postMessage(out, [out.buffer]);
        this.buffer = []; this.size = 0;
      }
    }
    return true;
  }
}
registerProcessor("pcm-capture", PcmCapture);
`;

export type MicStream = { stop: () => void; setMuted: (muted: boolean) => void };

/**
 * Streams the microphone as base64 PCM16 chunks (~40ms each) at the realtime sample rate. Borrows
 * the player's context, which was unlocked by the user's click; the caller owns closing it.
 */
export async function startMicrophone(
  ctx: AudioContext,
  onChunk: (base64: string) => void,
  onLevel: (level: number) => void,
): Promise<MicStream> {
  const media = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 },
  });
  const url = URL.createObjectURL(new Blob([WORKLET_SOURCE], { type: "application/javascript" }));
  await ctx.audioWorklet.addModule(url);
  URL.revokeObjectURL(url);

  const source = ctx.createMediaStreamSource(media);
  const node = new AudioWorkletNode(ctx, "pcm-capture");
  let muted = false;

  node.port.onmessage = (event: MessageEvent<Float32Array>) => {
    if (muted) {
      onLevel(0);
      return;
    }
    const samples = resampleLinear(event.data, ctx.sampleRate, REALTIME_SAMPLE_RATE);
    onLevel(rmsLevel(samples));
    onChunk(int16ToBase64(floatTo16BitPcm(samples)));
  };
  source.connect(node);

  return {
    setMuted: (next) => {
      muted = next;
      media.getAudioTracks().forEach((t) => (t.enabled = !next));
    },
    stop: () => {
      node.port.onmessage = null;
      source.disconnect();
      node.disconnect();
      media.getTracks().forEach((t) => t.stop());
    },
  };
}

export type PcmPlayer = {
  context: AudioContext;
  enqueue: (base64: string) => void;
  /** Drops queued audio immediately — used when the customer barges in. */
  interrupt: () => void;
  isPlaying: () => boolean;
  /** Resolves once every queued chunk has played (or been interrupted). */
  whenIdle: () => Promise<void>;
  close: () => void;
};

/** Must be called synchronously inside a user gesture, or browsers keep the context suspended. */
export function createPlayer(onLevel: (level: number) => void): PcmPlayer {
  const ctx = new AudioContext({ sampleRate: REALTIME_SAMPLE_RATE });
  void ctx.resume();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  analyser.connect(ctx.destination);
  const sources = new Set<AudioBufferSourceNode>();
  let idleWaiters: (() => void)[] = [];
  const settleIdle = () => {
    if (sources.size > 0) return;
    const waiters = idleWaiters;
    idleWaiters = [];
    waiters.forEach((resolve) => resolve());
  };
  let playhead = 0;
  let raf = 0;
  const scratch = new Float32Array(analyser.fftSize);

  const meter = () => {
    analyser.getFloatTimeDomainData(scratch);
    onLevel(sources.size ? rmsLevel(scratch) : 0);
    raf = requestAnimationFrame(meter);
  };
  raf = requestAnimationFrame(meter);

  return {
    context: ctx,
    enqueue(base64) {
      if (ctx.state === "suspended") void ctx.resume();
      const samples = pcm16ToFloat(base64ToInt16(base64));
      if (samples.length === 0) return;
      const buffer = ctx.createBuffer(1, samples.length, REALTIME_SAMPLE_RATE);
      buffer.copyToChannel(samples, 0);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(analyser);
      playhead = Math.max(playhead, ctx.currentTime + 0.02);
      src.start(playhead);
      playhead += buffer.duration;
      sources.add(src);
      src.onended = () => {
        sources.delete(src);
        settleIdle();
      };
    },
    interrupt() {
      sources.forEach((s) => {
        try {
          s.stop();
        } catch {
          // Already stopped.
        }
      });
      sources.clear();
      playhead = ctx.currentTime;
      settleIdle();
    },
    isPlaying: () => sources.size > 0,
    whenIdle: () =>
      sources.size === 0 ? Promise.resolve() : new Promise<void>((resolve) => idleWaiters.push(resolve)),
    close() {
      cancelAnimationFrame(raf);
      this.interrupt();
      void ctx.close();
    },
  };
}

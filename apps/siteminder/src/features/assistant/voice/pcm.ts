/** xAI realtime defaults to 24kHz mono 16-bit little-endian PCM in both directions. */
export const REALTIME_SAMPLE_RATE = 24_000;

export function floatTo16BitPcm(input: Float32Array): Int16Array {
  const out = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]!));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

export function pcm16ToFloat(input: Int16Array): Float32Array<ArrayBuffer> {
  const out = new Float32Array(input.length);
  for (let i = 0; i < input.length; i++) out[i] = input[i]! / (input[i]! < 0 ? 0x8000 : 0x7fff);
  return out;
}

export function int16ToBase64(pcm: Int16Array): string {
  const bytes = new Uint8Array(pcm.buffer, pcm.byteOffset, pcm.byteLength);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function base64ToInt16(b64: string): Int16Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer, 0, Math.floor(bytes.length / 2));
}

/** Linear resampler for browsers that ignore the AudioContext sampleRate hint. */
export function resampleLinear(
  input: Float32Array,
  fromRate: number,
  toRate: number,
): Float32Array {
  if (fromRate === toRate) return input;
  const ratio = fromRate / toRate;
  const length = Math.floor(input.length / ratio);
  const out = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    const pos = i * ratio;
    const left = Math.floor(pos);
    const right = Math.min(left + 1, input.length - 1);
    const frac = pos - left;
    out[i] = input[left]! * (1 - frac) + input[right]! * frac;
  }
  return out;
}

export function rms(samples: Float32Array): number {
  if (samples.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < samples.length; i++) sum += samples[i]! * samples[i]!;
  return Math.sqrt(sum / samples.length);
}

/** RMS level mapped to 0–1 with a gentle curve so quiet speech still animates the visualiser. */
export function rmsLevel(samples: Float32Array): number {
  return Math.min(1, Math.sqrt(rms(samples)) * 1.6);
}

export type SpeechGateOptions = {
  sampleRate?: number;
  /** A frame must be this many times louder than the room's noise floor to count as speech. */
  floorRatio?: number;
  /** ...and at least this fraction of the speaker's recent voice level (0.25 ≈ 12 dB below). */
  speechRatio?: number;
  /** Keeps the gate open through the dips between words. */
  holdMs?: number;
  /** Delay so the quiet onset of a word is sent once the gate opens, instead of clipped. */
  preRollMs?: number;
};

const MIN_SPEECH_RMS = 0.003;
const FLOOR_RISE_DB_PER_S = 3;
const SPEECH_DECAY_DB_PER_S = 1;
const gain = (dbPerSecond: number, ms: number) => 10 ** ((dbPerSecond * ms) / 20_000);

/**
 * Replaces mic frames that are much quieter than the speaker's own voice with digital silence.
 * On a Zoom, Teams or Meet call the other participants reach the mic from outside the browser, so
 * its echo canceller can't remove them, and server VAD hears them as the user still talking — the
 * turn never ends, or they barge in on the reply. Returns the frames ready to send, `preRollMs` late.
 */
export function createSpeechGate({
  sampleRate = REALTIME_SAMPLE_RATE,
  floorRatio = 3,
  speechRatio = 0.25,
  holdMs = 300,
  preRollMs = 100,
}: SpeechGateOptions = {}): (frame: Float32Array) => Float32Array[] {
  let floor = Infinity;
  let speech = 0;
  let holdLeft = 0;
  let queuedMs = 0;
  const queue: { samples: Float32Array; ms: number; open: boolean }[] = [];

  return (samples) => {
    const ms = (samples.length / sampleRate) * 1000;
    const level = rms(samples);
    floor = Math.min(level, floor * gain(FLOOR_RISE_DB_PER_S, ms));
    const loud = level > Math.max(MIN_SPEECH_RMS, floor * floorRatio, speech * speechRatio);
    if (loud) {
      // Rises fast and settles slowly, so a word's tail doesn't drag the reference down.
      speech += (level - speech) * (level > speech ? 0.5 : 0.05);
      holdLeft = holdMs;
      queue.forEach((f) => (f.open = true));
    } else {
      speech *= gain(-SPEECH_DECAY_DB_PER_S, ms);
      holdLeft = Math.max(0, holdLeft - ms);
    }
    queue.push({ samples, ms, open: loud || holdLeft > 0 });
    queuedMs += ms;

    const out: Float32Array[] = [];
    while (queue.length > 0 && queuedMs - queue[0]!.ms >= preRollMs) {
      const head = queue.shift()!;
      queuedMs -= head.ms;
      out.push(head.open ? head.samples : new Float32Array(head.samples.length));
    }
    return out;
  };
}

import { describe, expect, it } from "vitest";
import { createSpeechGate, rms } from "@/features/assistant/voice/pcm";

/** 40ms frame at 24kHz whose RMS is exactly `level`. */
const frame = (level: number) =>
  new Float32Array(960).map((_, i) => (i % 2 ? level : -level));

function run(levels: number[]): number[] {
  const gate = createSpeechGate();
  return levels.flatMap((level) => gate(frame(level))).map((f) => Number(rms(f).toFixed(4)));
}

const repeat = (level: number, frames: number) => Array<number>(frames).fill(level);

describe("speech gate", () => {
  it("silences meeting audio that leaks into the mic once the speaker stops", () => {
    const out = run([...repeat(0.001, 10), ...repeat(0.1, 25), ...repeat(0.015, 50)]);
    expect(out.slice(10, 35)).toEqual(repeat(0.1, 25));
    // Bleed starts at frame 35; the 300ms hold lets a few frames through, then silence.
    expect(out.slice(45)).toEqual(repeat(0, out.length - 45));
  });

  it("sends the quiet onset of a word instead of clipping it", () => {
    const out = run([...repeat(0.001, 10), 0.002, ...repeat(0.1, 10)]);
    expect(out[5]).toBe(0);
    expect(out[10]).toBe(0.002);
  });

  it("still opens for a softer reply after a long pause", () => {
    const out = run([...repeat(0.1, 25), ...repeat(0.001, 125), ...repeat(0.02, 10)]);
    expect(out.slice(150)).toContain(0.02);
  });
});

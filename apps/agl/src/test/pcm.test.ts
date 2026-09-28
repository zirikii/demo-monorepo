import { describe, expect, it } from "vitest";
import {
  base64ToInt16,
  floatTo16BitPcm,
  int16ToBase64,
  pcm16ToFloat,
  resampleLinear,
  rmsLevel,
} from "@/features/assistant/voice/pcm";

describe("PCM helpers", () => {
  it("round-trips float audio through 16-bit base64", () => {
    const input = new Float32Array([0, 0.5, -0.5, 1, -1, 2]);
    const pcm = floatTo16BitPcm(input);
    expect(Array.from(pcm)).toEqual([0, 16383, -16384, 32767, -32768, 32767]);
    const back = pcm16ToFloat(base64ToInt16(int16ToBase64(pcm)));
    expect(back[1]).toBeCloseTo(0.5, 3);
    expect(back[4]).toBe(-1);
  });

  it("resamples 48kHz down to 24kHz", () => {
    const input = new Float32Array(480).map((_, i) => i / 480);
    const out = resampleLinear(input, 48_000, 24_000);
    expect(out.length).toBe(240);
    expect(out[10]).toBeCloseTo(input[20]!, 5);
    expect(resampleLinear(input, 24_000, 24_000)).toBe(input);
  });

  it("maps silence to 0 and loud audio towards 1", () => {
    expect(rmsLevel(new Float32Array(128))).toBe(0);
    expect(rmsLevel(new Float32Array(128).fill(0.8))).toBe(1);
    expect(rmsLevel(new Float32Array())).toBe(0);
  });
});

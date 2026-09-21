export const CAPTURE_COUNTDOWN = [3, 2, 1] as const;

export const LIVENESS_PHASES = ["fit", "hold", "done"] as const;

export type LivenessPhase = (typeof LIVENESS_PHASES)[number];

export function simulationDelay(instant: boolean): number {
  return instant ? 0 : 800;
}

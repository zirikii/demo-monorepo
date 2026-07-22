import type { IncomingMessage } from "node:http";

/** Track client disconnect for long-running dispatch. Attach before any await. */
export function trackRequestAbort(req: IncomingMessage): {
  isAborted: () => boolean;
  dispose: () => void;
} {
  let aborted = Boolean(req.destroyed);
  const onAbort = () => {
    aborted = true;
  };
  req.on("close", onAbort);
  // close may have already fired before the listener was attached
  if (req.destroyed) aborted = true;

  return {
    isAborted: () => aborted || Boolean(req.destroyed),
    dispose: () => {
      req.off("close", onAbort);
    },
  };
}

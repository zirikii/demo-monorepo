import type { IncomingMessage, ServerResponse } from "node:http";

/**
 * Track client disconnect for long-running dispatch.
 * Attach before any await. Do not use req.destroyed / req "close" — after the
 * POST body is fully read, Node marks the request stream destroyed even while
 * the client is still waiting for the response.
 */
export function trackRequestAbort(
  _req: IncomingMessage,
  res: ServerResponse,
): {
  isAborted: () => boolean;
  dispose: () => void;
} {
  let aborted = false;
  const onClose = () => {
    if (!res.writableFinished) aborted = true;
  };
  res.on("close", onClose);

  return {
    isAborted: () => aborted,
    dispose: () => {
      res.off("close", onClose);
    },
  };
}

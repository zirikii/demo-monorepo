import { EventEmitter } from "node:events";
import { describe, expect, it, vi } from "vitest";
import { trackRequestAbort } from "../../server/requestAbort";

function fakeReq(destroyed = false) {
  const req = new EventEmitter() as EventEmitter & { destroyed: boolean };
  req.destroyed = destroyed;
  return req;
}

describe("trackRequestAbort", () => {
  it("starts aborted when the request is already destroyed", () => {
    const req = fakeReq(true);
    const abort = trackRequestAbort(req as never);
    expect(abort.isAborted()).toBe(true);
    abort.dispose();
  });

  it("flips to aborted when close fires during an await gap", async () => {
    const req = fakeReq();
    const abort = trackRequestAbort(req as never);

    let release!: () => void;
    const createGate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const createDone = (async () => {
      await createGate;
      return { id: "agent-1" };
    })();

    // Simulate browser abort while Agent.create is in flight
    req.emit("close");
    req.destroyed = true;
    release();

    await createDone;
    expect(abort.isAborted()).toBe(true);
    abort.dispose();
  });

  it("stays false when the client never disconnects", () => {
    const req = fakeReq();
    const abort = trackRequestAbort(req as never);
    expect(abort.isAborted()).toBe(false);
    abort.dispose();
  });

  it("stops listening after dispose", () => {
    const req = fakeReq();
    const abort = trackRequestAbort(req as never);
    abort.dispose();
    req.emit("close");
    expect(abort.isAborted()).toBe(false);
  });
});

describe("dispatch abort gating (regression)", () => {
  it("skips send when abort happened during create", async () => {
    const req = fakeReq();
    const abort = trackRequestAbort(req as never);
    const send = vi.fn(async (_prompt: string) => ({ id: "run-1", cancel: vi.fn() }));
    const create = vi.fn(async () => {
      req.emit("close");
      req.destroyed = true;
      return { agentId: "bc-1", send };
    });

    let sent = false;
    try {
      expect(abort.isAborted()).toBe(false);
      const agent = await create();
      expect(abort.isAborted()).toBe(true);
      if (!abort.isAborted()) {
        await agent.send("prompt");
        sent = true;
      }
    } finally {
      abort.dispose();
    }

    expect(create).toHaveBeenCalledTimes(1);
    expect(sent).toBe(false);
    expect(send).not.toHaveBeenCalled();
  });
});

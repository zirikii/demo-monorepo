import { EventEmitter } from "node:events";
import { describe, expect, it, vi } from "vitest";
import { trackRequestAbort } from "../../server/requestAbort";

function fakeReq(destroyed = false) {
  const req = new EventEmitter() as EventEmitter & { destroyed: boolean };
  req.destroyed = destroyed;
  return req;
}

function fakeRes(writableFinished = false) {
  const res = new EventEmitter() as EventEmitter & { writableFinished: boolean };
  res.writableFinished = writableFinished;
  return res;
}

describe("trackRequestAbort", () => {
  it("does not treat a finished request body as a client abort", () => {
    // After readBody(), Node sets req.destroyed — that must not block dispatch.
    const req = fakeReq(true);
    const res = fakeRes(false);
    const abort = trackRequestAbort(req as never, res as never);
    expect(abort.isAborted()).toBe(false);
    abort.dispose();
  });

  it("flips to aborted when the response closes before finishing", async () => {
    const req = fakeReq();
    const res = fakeRes(false);
    const abort = trackRequestAbort(req as never, res as never);

    let release!: () => void;
    const createGate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const createDone = (async () => {
      await createGate;
      return { id: "agent-1" };
    })();

    // Simulate browser disconnect while Agent.create is in flight
    res.emit("close");
    release();

    await createDone;
    expect(abort.isAborted()).toBe(true);
    abort.dispose();
  });

  it("stays false when the response finishes normally", () => {
    const req = fakeReq(true);
    const res = fakeRes(false);
    const abort = trackRequestAbort(req as never, res as never);
    res.writableFinished = true;
    res.emit("close");
    expect(abort.isAborted()).toBe(false);
    abort.dispose();
  });

  it("stops listening after dispose", () => {
    const req = fakeReq();
    const res = fakeRes(false);
    const abort = trackRequestAbort(req as never, res as never);
    abort.dispose();
    res.emit("close");
    expect(abort.isAborted()).toBe(false);
  });
});

describe("dispatch abort gating (regression)", () => {
  it("skips send when abort happened during create", async () => {
    const req = fakeReq();
    const res = fakeRes(false);
    const abort = trackRequestAbort(req as never, res as never);
    const send = vi.fn(async (_prompt: string) => ({ id: "run-1", cancel: vi.fn() }));
    const create = vi.fn(async () => {
      res.emit("close");
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

  it("still sends when only the request body stream is destroyed", async () => {
    const req = fakeReq(true);
    const res = fakeRes(false);
    const abort = trackRequestAbort(req as never, res as never);
    const send = vi.fn(async (_prompt: string) => ({ id: "run-1", cancel: vi.fn() }));
    const create = vi.fn(async () => ({ agentId: "bc-1", send }));

    let sent = false;
    try {
      expect(abort.isAborted()).toBe(false);
      const agent = await create();
      if (!abort.isAborted()) {
        await agent.send("prompt");
        sent = true;
      }
    } finally {
      abort.dispose();
    }

    expect(sent).toBe(true);
    expect(send).toHaveBeenCalledTimes(1);
  });
});

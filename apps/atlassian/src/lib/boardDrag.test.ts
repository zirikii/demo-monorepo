import { afterEach, describe, expect, it, vi } from "vitest";
import { columnStatusAtPoint } from "./boardDrag";

function stubHitTest(nodes: Element[]) {
  Object.defineProperty(document, "elementsFromPoint", {
    configurable: true,
    writable: true,
    value: () => nodes,
  });
}

describe("columnStatusAtPoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.replaceChildren();
  });

  it("reads the column attribute from the element under the pointer", () => {
    const column = document.createElement("section");
    column.setAttribute("data-column-status", "In progress");
    const card = document.createElement("a");
    column.append(card);
    document.body.append(column);
    stubHitTest([card, column]);

    expect(columnStatusAtPoint(12, 24)).toBe("In progress");
  });

  it("returns null when the pointer is not over a column", () => {
    stubHitTest([document.body]);

    expect(columnStatusAtPoint(1, 1)).toBeNull();
  });

  it("returns null for a non-finite pointer", () => {
    expect(columnStatusAtPoint(Number.NaN, 0)).toBeNull();
  });

  it("falls back to elementFromPoint when the stack API is missing", () => {
    const column = document.createElement("section");
    column.setAttribute("data-column-status", "Done");
    Reflect.deleteProperty(document, "elementsFromPoint");
    Object.defineProperty(document, "elementFromPoint", {
      configurable: true,
      value: () => column,
    });

    expect(columnStatusAtPoint(4, 8)).toBe("Done");
  });
});

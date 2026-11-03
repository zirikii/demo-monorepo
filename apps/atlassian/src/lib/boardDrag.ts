import { BOARD_COLUMNS } from "@/data/jira";
import type { IssueStatus } from "@/data/types";

export const COLUMN_STATUS_ATTR = "data-column-status";

export function isIssueStatus(value: string | null | undefined): value is IssueStatus {
  return BOARD_COLUMNS.some((column) => column === value);
}

function statusFromNode(node: Element): IssueStatus | null {
  const column = node.closest(`[${COLUMN_STATUS_ATTR}]`);
  const value = column?.getAttribute(COLUMN_STATUS_ATTR);
  return isIssueStatus(value) ? value : null;
}

/**
 * Column under a drag pointer. Chromium does not fire `drop` when the drag
 * source is a link, so the board resolves the destination on `dragEnd`.
 */
export function columnStatusAtPoint(x: number, y: number): IssueStatus | null {
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

  if (typeof document.elementsFromPoint === "function") {
    for (const node of document.elementsFromPoint(x, y)) {
      const status = statusFromNode(node);
      if (status) return status;
    }
    return null;
  }

  if (typeof document.elementFromPoint !== "function") return null;
  const hit = document.elementFromPoint(x, y);
  return hit ? statusFromNode(hit) : null;
}

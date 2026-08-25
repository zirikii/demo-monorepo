import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { IssueStatus, JiraIssue } from "@/data/types";

const DRAG_THRESHOLD_PX = 8;

export interface BoardCardDrag {
  issue: JiraIssue;
  width: number;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
  dropStatus: IssueStatus | null;
}

interface DragSession {
  issue: JiraIssue;
  pointerId: number;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
  width: number;
  active: boolean;
  source: HTMLElement;
}

function readColumnStatus(node: EventTarget | null): IssueStatus | null {
  if (!(node instanceof Element)) return null;
  const column = node.closest("[data-board-column]");
  const value = column?.getAttribute("data-board-column");
  if (value === "To do" || value === "In progress" || value === "In review" || value === "Done") {
    return value;
  }
  return null;
}

function columnStatusFromPoint(x: number, y: number): IssueStatus | null {
  return readColumnStatus(document.elementFromPoint(x, y));
}

export function useBoardCardDrag(onDrop: (input: { key: string; status: IssueStatus }) => void) {
  const [drag, setDrag] = useState<BoardCardDrag | null>(null);
  const sessionRef = useRef<DragSession | null>(null);
  const ignoreClickRef = useRef(false);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const onDropRef = useRef(onDrop);
  const detachRef = useRef<(() => void) | null>(null);
  onDropRef.current = onDrop;

  const stopSession = useCallback(() => {
    const session = sessionRef.current;
    sessionRef.current = null;
    if (session) {
      try {
        if (
          typeof session.source.hasPointerCapture === "function" &&
          session.source.hasPointerCapture(session.pointerId)
        ) {
          session.source.releasePointerCapture(session.pointerId);
        }
      } catch {
        /* jsdom does not implement pointer capture */
      }
    }
    document.body.style.removeProperty("cursor");
    document.body.style.removeProperty("user-select");
    setDrag(null);
  }, []);

  const placeGhost = useCallback((x: number, y: number, offsetX: number, offsetY: number) => {
    const ghost = ghostRef.current;
    if (!ghost) return;
    ghost.style.transform = `translate(${x - offsetX}px, ${y - offsetY}px) rotate(3deg)`;
  }, []);

  const onCardPointerDown = useCallback(
    (issue: JiraIssue, event: ReactPointerEvent<HTMLAnchorElement>) => {
      if (event.button !== 0) return;
      const source = event.currentTarget;
      const rect = source.getBoundingClientRect();
      const session: DragSession = {
        issue,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top,
        width: rect.width,
        active: false,
        source,
      };
      sessionRef.current = session;

      const onPointerMove = (moveEvent: PointerEvent) => {
        const current = sessionRef.current;
        if (!current || moveEvent.pointerId !== current.pointerId) return;
        const dx = moveEvent.clientX - current.startX;
        const dy = moveEvent.clientY - current.startY;
        if (!current.active) {
          if (Math.hypot(dx, dy) < DRAG_THRESHOLD_PX) return;
          current.active = true;
          ignoreClickRef.current = true;
          try {
            if (typeof current.source.setPointerCapture === "function") {
              current.source.setPointerCapture(current.pointerId);
            }
          } catch {
            /* jsdom does not implement pointer capture */
          }
          document.body.style.cursor = "grabbing";
          document.body.style.userSelect = "none";
          setDrag({
            issue: current.issue,
            width: current.width,
            offsetX: current.offsetX,
            offsetY: current.offsetY,
            x: moveEvent.clientX,
            y: moveEvent.clientY,
            dropStatus: columnStatusFromPoint(moveEvent.clientX, moveEvent.clientY),
          });
          requestAnimationFrame(() => {
            placeGhost(moveEvent.clientX, moveEvent.clientY, current.offsetX, current.offsetY);
          });
          return;
        }
        placeGhost(moveEvent.clientX, moveEvent.clientY, current.offsetX, current.offsetY);
        const nextStatus = columnStatusFromPoint(moveEvent.clientX, moveEvent.clientY);
        setDrag((prev) => {
          if (!prev || prev.dropStatus === nextStatus) return prev;
          return { ...prev, dropStatus: nextStatus };
        });
      };

      const detach = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        window.removeEventListener("keydown", onKeyDown);
        detachRef.current = null;
      };

      const onPointerUp = (upEvent: PointerEvent) => {
        const current = sessionRef.current;
        detach();
        if (!current || upEvent.pointerId !== current.pointerId) return;
        const dropStatus = current.active
          ? columnStatusFromPoint(upEvent.clientX, upEvent.clientY)
          : null;
        const shouldMove =
          current.active && dropStatus !== null && dropStatus !== current.issue.status;
        stopSession();
        if (shouldMove && dropStatus) {
          onDropRef.current({ key: current.issue.key, status: dropStatus });
        }
      };

      const onKeyDown = (keyEvent: KeyboardEvent) => {
        if (keyEvent.key !== "Escape") return;
        detach();
        stopSession();
      };

      detachRef.current = detach;
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
      window.addEventListener("keydown", onKeyDown);
    },
    [placeGhost, stopSession],
  );

  useEffect(() => {
    return () => {
      detachRef.current?.();
      stopSession();
    };
  }, [stopSession]);

  const onCardClick = useCallback((event: { preventDefault: () => void }) => {
    if (!ignoreClickRef.current) return;
    event.preventDefault();
    ignoreClickRef.current = false;
  }, []);

  return { drag, ghostRef, onCardPointerDown, onCardClick };
}

"use client";

import { X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * Native <dialog> modal: browser handles focus trapping, ESC and the inert
 * backdrop. Closes itself when the route is hidden by Next's <Activity>.
 */
export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useLayoutEffect(() => () => onClose(), [onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(92vw,440px)] rounded-panel bg-white p-0 shadow-panel backdrop:bg-navy/50 backdrop:backdrop-blur-sm"
    >
      <div className="relative px-8 pt-10 pb-8 text-center">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute top-3 right-3 rounded-full p-2 text-muted hover:bg-surface hover:text-ink">
          <X className="size-5" aria-hidden />
        </button>
        <h3 id="modal-title" className="type-h3 text-navy">
          {title}
        </h3>
        <div className="type-body mt-3 text-body">{children}</div>
      </div>
    </dialog>
  );
}

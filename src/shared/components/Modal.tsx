import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md border border-white/10 bg-ink p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="font-display text-xl font-semibold">{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}

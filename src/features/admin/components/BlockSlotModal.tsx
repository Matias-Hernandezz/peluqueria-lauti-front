import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function BlockSlotModal({ open, onClose, onConfirm }: Props) {
  const [reason, setReason] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-sm border border-white/10 bg-ink p-6">
        <h2 className="font-display text-xl font-semibold">Bloquear horario</h2>
        <input
          className="mt-4 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-gold"
          placeholder="Motivo (feriado, almuerzo…)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/70"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(reason)}
            className="bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink"
          >
            Bloquear
          </button>
        </div>
      </div>
    </div>
  );
}

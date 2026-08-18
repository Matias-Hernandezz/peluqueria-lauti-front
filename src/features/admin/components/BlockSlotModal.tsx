import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createBlockedSlot } from "../api/blockedSlotsApi";
import { useAuth } from "../hooks/useAuth";
import { Modal } from "../../../shared/components/Modal";
import { Input } from "../../../shared/components/Input";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultStart?: string;
  onCreated?: () => void;
}

function padSeconds(value: string): string {
  // datetime-local da "YYYY-MM-DDTHH:MM"; normalizamos a segundos.
  return value.length === 16 ? `${value}:00` : value;
}

export function BlockSlotModal({
  open,
  onClose,
  defaultStart,
  onCreated,
}: Props) {
  const { token } = useAuth();
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [reason, setReason] = useState("");

  // Cada vez que se abre, arrancamos el form de cero (con la hora sugerida).
  useEffect(() => {
    if (open) {
      setStartAt(defaultStart ?? "");
      setEndAt("");
      setReason("");
    }
  }, [open, defaultStart]);

  const create = useMutation({
    mutationFn: () =>
      createBlockedSlot(token, {
        start_at: padSeconds(startAt),
        end_at: padSeconds(endAt),
        reason: reason || null,
      }),
    onSuccess: () => {
      onClose();
      onCreated?.();
    },
  });

  return (
    <Modal open={open} onClose={onClose} title="Bloquear horario">
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
            Inicio
          </label>
          <Input
            type="datetime-local"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
            Fin
          </label>
          <Input
            type="datetime-local"
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
            Motivo (opcional)
          </label>
          <Input
            placeholder="Feriado, almuerzo…"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {create.isError && (
          <p className="text-sm text-red-400">
            {create.error?.message ?? "No se pudo crear el bloqueo"}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/70"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => create.mutate()}
            disabled={!startAt || !endAt || create.isPending}
            className="bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink disabled:opacity-50"
          >
            Bloquear
          </button>
        </div>
      </div>
    </Modal>
  );
}

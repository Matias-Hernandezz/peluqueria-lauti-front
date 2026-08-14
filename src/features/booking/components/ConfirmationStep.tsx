import { useMutation } from "@tanstack/react-query";
import type { AppointmentCreate } from "../types";
import { createAppointment } from "../api/createAppointment";
import { formatDate, formatTime } from "../../../shared/lib/dates";

interface Props {
  payload: AppointmentCreate;
}

export function ConfirmationStep({ payload }: Props) {
  const mutation = useMutation({ mutationFn: createAppointment });

  if (mutation.isSuccess) {
    return (
      <div className="max-w-md border border-gold/30 p-8">
        <h2 className="font-display text-2xl font-semibold text-gold">
          ¡Turno confirmado!
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          Te esperamos el {formatDate(payload.start_at)} a las{" "}
          {formatTime(payload.start_at)}.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md">
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            Nombre
          </dt>
          <dd className="mt-1 text-white/80">{payload.client_name}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            Teléfono
          </dt>
          <dd className="mt-1 text-white/80">{payload.client_phone}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            Fecha y hora
          </dt>
          <dd className="mt-1 text-white/80">
            {formatDate(payload.start_at)} · {formatTime(payload.start_at)}
          </dd>
        </div>
      </dl>

      {mutation.isError && (
        <p className="mt-4 text-sm text-red-400">
          {mutation.error?.message ?? "No se pudo confirmar el turno"}
        </p>
      )}

      <button
        type="button"
        onClick={() => mutation.mutate(payload)}
        disabled={mutation.isPending}
        className="mt-6 inline-flex items-center justify-center bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold/90 disabled:opacity-50"
      >
        {mutation.isPending ? "Confirmando…" : "Confirmar turno"}
      </button>
    </div>
  );
}

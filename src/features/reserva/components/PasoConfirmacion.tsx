import { useMutation, useQuery } from "@tanstack/react-query";
import type { AppointmentCreate } from "../types";
import { createAppointment } from "../api/crearTurno";
import { fetchServices } from "../api/obtenerServicios";
import { formatDate, formatTime } from "../../../shared/lib/dates";
import { Skeleton } from "../../../shared/components/Skeleton";

interface Props {
  payload: AppointmentCreate;
  onConfirmed?: () => void;
}

function formatPrice(price: string): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export function ConfirmationStep({ payload, onConfirmed }: Props) {
  const mutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => onConfirmed?.(),
  });

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });
  const service = services.find((s) => s.id === payload.service_id);

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
            Servicio
          </dt>
          <dd className="mt-1 text-white/80">
            {isLoading ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              service?.name ?? "—"
            )}
          </dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            Precio
          </dt>
          <dd className="mt-1 text-white/80">
            {isLoading ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              (service ? formatPrice(service.price) : "—")
            )}
          </dd>
        </div>
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

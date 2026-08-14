import { useAdminAppointments } from "../hooks/useAdminAppointments";
import { formatTime, toISODate } from "../../../shared/lib/dates";

export function AgendaView() {
  const today = toISODate(new Date());
  const { data, isLoading } = useAdminAppointments(
    `${today}T00:00:00`,
    `${today}T23:59:59`,
  );
  const appointments = data ?? [];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Agenda de hoy</h1>

      {isLoading && <p className="mt-4 text-sm text-white/50">Cargando…</p>}
      {!isLoading && appointments.length === 0 && (
        <p className="mt-4 text-sm text-white/50">Sin turnos hoy.</p>
      )}

      <ul className="mt-6 space-y-3">
        {appointments.map((appointment) => (
          <li
            key={appointment.id}
            className="flex items-center justify-between border border-white/10 p-4"
          >
            <div>
              <span className="text-white">{appointment.client_name}</span>
              <span className="ml-3 text-white/50">
                {appointment.service_name ?? `Servicio #${appointment.service_id}`}
              </span>
            </div>
            <span className="text-gold">{formatTime(appointment.start_at)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

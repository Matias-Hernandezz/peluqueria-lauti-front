import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminAppointments } from "../hooks/useAdminAppointments";
import { useBlockedSlots } from "../hooks/useBlockedSlots";
import { cancelAppointment } from "../api/appointmentsApi";
import { deleteBlockedSlot } from "../api/blockedSlotsApi";
import { useAuth } from "../hooks/useAuth";
import { formatTime, toISODate } from "../../../shared/lib/dates";
import { Modal } from "../../../shared/components/Modal";
import { Select } from "../../../shared/components/Select";
import { BlockSlotModal } from "./BlockSlotModal";
import type { Appointment, AppointmentStatus } from "../types";

const DAY_NAMES = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

const STATUS_LABEL: Record<AppointmentStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  cancelled: "Cancelado",
};

const STATUS_CLASS: Record<AppointmentStatus, string> = {
  pending: "text-yellow-400",
  confirmed: "text-green-400",
  cancelled: "text-red-400",
};

export function AgendaView() {
  const { token } = useAuth();
  const qc = useQueryClient();

  const [date, setDate] = useState(() => toISODate(new Date()));
  const [status, setStatus] = useState<AppointmentStatus | "">("");
  const [detail, setDetail] = useState<Appointment | null>(null);
  const [blockOpen, setBlockOpen] = useState(false);

  const startAt = `${date}T00:00:00`;
  const endAt = `${date}T23:59:59`;

  const { data: appointments = [], isLoading } = useAdminAppointments(
    startAt,
    endAt,
    status || undefined,
  );
  const { data: blocks = [] } = useBlockedSlots(startAt, endAt);

  const cancel = useMutation({
    mutationFn: (id: number) => cancelAppointment(token, id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["admin", "appointments"] }),
  });

  const removeBlock = useMutation({
    mutationFn: (id: number) => deleteBlockedSlot(token, id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["admin", "blocked-slots"] }),
  });

  const changeDay = (delta: number) => {
    const d = new Date(`${date}T00:00:00`);
    d.setDate(d.getDate() + delta);
    setDate(toISODate(d));
  };

  const d = new Date(`${date}T00:00:00`);
  const dayLabel = `${DAY_NAMES[d.getDay()]} ${d.toLocaleDateString("es-AR")}`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold">Agenda</h1>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => changeDay(-1)}
            className="border border-white/15 px-3 py-2 text-sm text-white/70 hover:border-gold/40"
          >
            ‹
          </button>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-gold"
          />
          <button
            type="button"
            onClick={() => changeDay(1)}
            className="border border-white/15 px-3 py-2 text-sm text-white/70 hover:border-gold/40"
          >
            ›
          </button>
        </div>

        <Select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as AppointmentStatus | "")
          }
          className="max-w-[220px]"
        >
          <option value="">Todos los estados</option>
          <option value="pending">Pendientes</option>
          <option value="confirmed">Confirmados</option>
          <option value="cancelled">Cancelados</option>
        </Select>
      </div>

      <p className="mt-2 text-sm capitalize text-white/50">{dayLabel}</p>

      <button
        type="button"
        onClick={() => setBlockOpen(true)}
        className="mt-6 border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.15em] text-gold hover:bg-gold/10"
      >
        Bloquear horario
      </button>

      <section className="mt-6">
        <h2 className="text-xs uppercase tracking-[0.2em] text-white/40">
          Turnos
        </h2>
        {isLoading ? (
          <p className="mt-2 text-sm text-white/50">Cargando…</p>
        ) : appointments.length === 0 ? (
          <p className="mt-2 text-sm text-white/50">Sin turnos para este día.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {appointments.map((appt) => (
              <li
                key={appt.id}
                className="flex items-center justify-between border border-white/10 p-4"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setDetail(appt)}
                    className="text-left text-white hover:text-gold"
                  >
                    {appt.client_name}
                    <span className="ml-3 text-white/50">
                      {appt.service_name ?? `Servicio #${appt.service_id}`}
                    </span>
                  </button>
                  <div className="mt-1 text-xs text-white/50">
                    {formatTime(appt.start_at)} · {appt.client_phone}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs uppercase tracking-wide ${STATUS_CLASS[appt.status]}`}
                  >
                    {STATUS_LABEL[appt.status]}
                  </span>
                  {appt.status === "confirmed" && (
                    <button
                      type="button"
                      onClick={() => cancel.mutate(appt.id)}
                      className="border border-red-400/40 px-3 py-1.5 text-xs text-red-400 hover:bg-red-400/10"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-xs uppercase tracking-[0.2em] text-white/40">
          Bloqueos
        </h2>
        {blocks.length === 0 ? (
          <p className="mt-2 text-sm text-white/50">Sin bloqueos para este día.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {blocks.map((block) => (
              <li
                key={block.id}
                className="flex items-center justify-between border border-white/10 p-4"
              >
                <div>
                  <span className="text-white">
                    {formatTime(block.start_at)} – {formatTime(block.end_at)}
                  </span>
                  {block.reason && (
                    <span className="ml-3 text-white/50">{block.reason}</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeBlock.mutate(block.id)}
                  className="border border-red-400/40 px-3 py-1.5 text-xs text-red-400 hover:bg-red-400/10"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Modal
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title="Detalle del turno"
      >
        {detail && (
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-white/40">Cliente</dt>
              <dd className="text-white">{detail.client_name}</dd>
            </div>
            <div>
              <dt className="text-white/40">Teléfono</dt>
              <dd className="text-white">{detail.client_phone}</dd>
            </div>
            {detail.client_email && (
              <div>
                <dt className="text-white/40">Email</dt>
                <dd className="text-white">{detail.client_email}</dd>
              </div>
            )}
            <div>
              <dt className="text-white/40">Servicio</dt>
              <dd className="text-white">
                {detail.service_name ?? `Servicio #${detail.service_id}`}
              </dd>
            </div>
            <div>
              <dt className="text-white/40">Horario</dt>
              <dd className="text-white">
                {formatTime(detail.start_at)} – {formatTime(detail.end_at)}
              </dd>
            </div>
            <div>
              <dt className="text-white/40">Estado</dt>
              <dd className={STATUS_CLASS[detail.status]}>
                {STATUS_LABEL[detail.status]}
              </dd>
            </div>
          </dl>
        )}
      </Modal>

      <BlockSlotModal
        open={blockOpen}
        onClose={() => setBlockOpen(false)}
        defaultStart={`${date}T10:00`}
        onCreated={() =>
          qc.invalidateQueries({ queryKey: ["admin", "blocked-slots"] })
        }
      />
    </div>
  );
}

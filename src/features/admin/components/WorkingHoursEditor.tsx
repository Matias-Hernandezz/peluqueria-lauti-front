import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSchedule } from "../hooks/useSchedule";
import { saveSchedule } from "../api/scheduleApi";
import { useProfile } from "../hooks/useProfile";
import { updateProfile } from "../api/profileApi";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../../../shared/components/Input";
import type { WorkingHoursUpdate } from "../types";

const DAY_NAMES = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

interface DayRow {
  start: string; // "HH:MM"
  end: string;
  is_open: boolean;
}

const DEFAULT_ROW: DayRow = { start: "10:00", end: "18:00", is_open: false };

export function WorkingHoursEditor() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const { data: schedule = [], isLoading } = useSchedule();
  const { data: profile } = useProfile();
  const [rows, setRows] = useState<Record<number, DayRow>>({});
  const [interval, setInterval] = useState<string>("");

  useEffect(() => {
    const init: Record<number, DayRow> = {};
    for (const wh of schedule) {
      init[wh.weekday] = {
        start: wh.start_time.slice(0, 5),
        end: wh.end_time.slice(0, 5),
        is_open: wh.is_open,
      };
    }
    setRows(init);
  }, [schedule]);

  useEffect(() => {
    if (profile) {
      setInterval(profile.slot_interval_minutes?.toString() ?? "");
    }
  }, [profile]);

  const updateRow = (weekday: number, patch: Partial<DayRow>) => {
    setRows((prev) => ({
      ...prev,
      [weekday]: { ...(prev[weekday] ?? DEFAULT_ROW), ...patch },
    }));
  };

  const save = useMutation({
    mutationFn: () => {
      const payload: WorkingHoursUpdate[] = [];
      for (let weekday = 0; weekday < 7; weekday++) {
        const r = rows[weekday] ?? DEFAULT_ROW;
        payload.push({
          weekday,
          start_time: `${r.start}:00`,
          end_time: `${r.end}:00`,
          is_open: r.is_open,
        });
      }
      return saveSchedule(token, payload);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "schedule"] }),
  });

  const saveInterval = useMutation({
    mutationFn: () =>
      updateProfile(token, {
        slot_interval_minutes: interval ? Number(interval) : null,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "profile"] }),
  });

  if (isLoading) {
    return <p className="text-sm text-white/50">Cargando…</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">
          Horario de atención
        </h1>
        <button
          type="button"
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink disabled:opacity-50"
        >
          Guardar
        </button>
      </div>

      {save.isSuccess && (
        <p className="mt-2 text-sm text-green-400">Horario guardado.</p>
      )}
      {save.isError && (
        <p className="mt-2 text-sm text-red-400">
          {save.error?.message ?? "No se pudo guardar"}
        </p>
      )}

      <div className="mt-6 border border-white/10 p-4">
        <label className="mb-1 block text-xs uppercase tracking-wide text-white/40">
          Intervalo entre turnos (min)
        </label>
        <div className="flex flex-wrap items-end gap-3">
          <Input
            type="number"
            min={0}
            value={interval}
            placeholder="= duración del servicio"
            onChange={(e) => setInterval(e.target.value)}
            className="max-w-[180px]"
          />
          <button
            type="button"
            onClick={() => saveInterval.mutate()}
            disabled={saveInterval.isPending}
            className="border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.15em] text-gold hover:bg-gold/10 disabled:opacity-50"
          >
            Guardar intervalo
          </button>
        </div>
        {saveInterval.isSuccess && (
          <p className="mt-2 text-sm text-green-400">Intervalo guardado.</p>
        )}
        {saveInterval.isError && (
          <p className="mt-2 text-sm text-red-400">
            {saveInterval.error?.message ?? "No se pudo guardar"}
          </p>
        )}
      </div>

      <ul className="mt-6 space-y-3">
        {DAY_NAMES.map((name, weekday) => {
          const r = rows[weekday] ?? DEFAULT_ROW;
          return (
            <li
              key={weekday}
              className="flex flex-wrap items-center gap-4 border border-white/10 p-4"
            >
              <span className="w-24 text-sm text-white">{name}</span>
              <label className="flex items-center gap-2 text-xs text-white/60">
                <input
                  type="checkbox"
                  checked={r.is_open}
                  onChange={(e) => updateRow(weekday, { is_open: e.target.checked })}
                />
                Abierto
              </label>
              <Input
                type="time"
                value={r.start}
                disabled={!r.is_open}
                onChange={(e) => updateRow(weekday, { start: e.target.value })}
                className="max-w-[130px] disabled:opacity-40"
              />
              <span className="text-white/40">a</span>
              <Input
                type="time"
                value={r.end}
                disabled={!r.is_open}
                onChange={(e) => updateRow(weekday, { end: e.target.value })}
                className="max-w-[130px] disabled:opacity-40"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

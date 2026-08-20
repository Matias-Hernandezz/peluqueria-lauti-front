/**
 * Convierte los horarios de atención (WorkingHours[]) en un texto legible,
 * agrupando los días que comparten el mismo horario y compactando días
 * consecutivos en rangos.
 *
 * Ejemplos:
 *   [Lun..Vie 17-21, Sáb 17-21, Dom cerrado] -> "Lunes a Sábado de 17 a 21 · Domingo cerrado"
 *   [Lun 17-21, Mar 17-21, Mié 13-21, Jue 17-21, Vie 17-21]
 *     -> "Lunes, Martes, Jueves y Viernes de 17 a 21 · Miércoles de 13 a 21"
 */

import type { WorkingHours } from "../../../shared/types/domain";

const DAY_NAMES = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
] as const;

/** "17:00:00" -> "17" · "13:30:00" -> "13:30" */
function formatTime(value: string): string {
  const [h, m] = value.slice(0, 5).split(":");
  return m === "00" ? h : `${h}:${m}`;
}

/** ["Lunes","Martes","Jueves","Viernes"] -> "Lunes, Martes, Jueves y Viernes" */
function joinNatural(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} y ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

/**
 * Compacta una lista ordenada de weekdays en rangos de días consecutivos.
 * [0,1,2,3,4] -> "Lunes a Viernes" · [0,1,3,4] -> "Lunes, Martes, Jueves y Viernes"
 */
function describeDays(weekdays: number[]): string {
  const names: string[] = [];
  let start = weekdays[0];
  let prev = weekdays[0];

  for (let i = 1; i <= weekdays.length; i++) {
    const current = weekdays[i];
    if (current === prev + 1) {
      prev = current;
      continue;
    }
    names.push(
      start === prev ? DAY_NAMES[start] : `${DAY_NAMES[start]} a ${DAY_NAMES[prev]}`,
    );
    start = current;
    prev = current;
  }

  return joinNatural(names);
}

export function formatSchedule(hours: WorkingHours[]): string {
  if (hours.length === 0) return "";

  const sorted = [...hours].sort((a, b) => a.weekday - b.weekday);

  // Agrupar por horario idéntico; los días cerrados van todos bajo "closed".
  const groups = new Map<string, number[]>();
  for (const wh of sorted) {
    const key = wh.is_open ? `${wh.start_time}|${wh.end_time}` : "closed";
    const list = groups.get(key) ?? [];
    list.push(wh.weekday);
    groups.set(key, list);
  }

  // Ordenar los grupos por su primer día (orden cronológico de la semana).
  const parts = [...groups.entries()]
    .sort((a, b) => a[1][0] - b[1][0])
    .map(([key, days]) => {
      const label = describeDays(days);
      if (key === "closed") return `${label} cerrado`;
      const [start, end] = key.split("|");
      return `${label} de ${formatTime(start)} a ${formatTime(end)}`;
    });

  return parts.join(" · ");
}

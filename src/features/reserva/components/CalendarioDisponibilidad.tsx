import { useState } from "react";
import { useAvailability } from "../hooks/useDisponibilidad";
import { formatTime, toISODate } from "../../../shared/lib/dates";
import { Skeleton } from "../../../shared/components/Skeleton";

interface Props {
  serviceId: number;
  selected: string | null;
  onSelect: (slot: string) => void;
}

export function AvailabilityCalendar({ serviceId, selected, onSelect }: Props) {
  const today = toISODate(new Date());
  const [date, setDate] = useState(today);
  const { data, isLoading } = useAvailability(serviceId, date);

  const slots = data?.slots ?? [];

  return (
    <div>
      <input
        type="date"
        value={date}
        min={today}
        onChange={(e) => setDate(e.target.value)}
        className="border border-white/15 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-gold"
      />

      {isLoading ? (
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10" />
          ))}
        </div>
      ) : slots.length === 0 ? (
        <p className="mt-6 text-sm text-white/50">
          Sin horarios disponibles para este día.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {slots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => onSelect(slot)}
              className={`border px-4 py-3 text-sm transition-colors ${
                selected === slot
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-white/10 text-white/70 hover:border-gold/40"
              }`}
            >
              {formatTime(slot)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

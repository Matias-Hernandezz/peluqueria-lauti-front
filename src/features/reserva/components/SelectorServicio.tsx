import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "../api/obtenerServicios";
import { Skeleton } from "../../../shared/components/Skeleton";

interface Props {
  selected: number | null;
  onSelect: (id: number) => void;
}

export function ServiceSelector({ selected, onSelect }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 border border-white/10 p-6">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {(data ?? []).map((service) => (
        <button
          key={service.id}
          type="button"
          onClick={() => onSelect(service.id)}
          className={`flex flex-col gap-2 border p-6 text-left transition-colors ${
            selected === service.id
              ? "border-gold bg-gold/10"
              : "border-white/10 hover:border-gold/40"
          }`}
        >
          <span className="font-display text-xl font-semibold">
            {service.name}
          </span>
          <span className="text-sm text-white/60">
            {service.duration_minutes} min · ${service.price}
          </span>
        </button>
      ))}
    </div>
  );
}

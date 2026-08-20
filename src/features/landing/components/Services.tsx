import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "../../reserva/api/obtenerServicios";
import { Eyebrow } from "../../../shared/components/Eyebrow";
import { Icon } from "../../../shared/components/Icon";
import { Skeleton } from "../../../shared/components/Skeleton";

function formatPrice(price: string): string {
  return `$${Number(price).toLocaleString("es-AR")}`;
}

export function Services() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-6 pt-24 pb-8 md:py-24">
      <Eyebrow>Qué hacemos</Eyebrow>

      <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="font-display text-4xl font-semibold tracking-wide sm:text-5xl">
          Servicios de precisión
        </h2>
        <p className="max-w-sm text-sm font-light text-white/60">
          Cada servicio hecho con dedicación, oficio y cuidado.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 border border-gold/20 bg-white/[0.02] p-6"
            >
              <Skeleton className="h-6 w-10" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Link
              key={service.id}
              to={`/booking?service=${service.id}`}
              className="group flex flex-col border border-gold/20 bg-white/[0.02] p-6 transition-colors hover:border-gold/50"
            >
              <span className="font-display text-2xl text-gold/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 font-display text-2xl font-semibold">
                {service.name}
              </h3>
              <p className="mt-4 text-sm font-light text-white/60">
                {service.duration_minutes} min · {formatPrice(service.price)}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-xs uppercase tracking-[0.2em] text-gold transition-colors group-hover:text-white">
                Reservar <Icon name="arrow" className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

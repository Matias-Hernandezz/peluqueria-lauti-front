import { services } from "../data";
import { Eyebrow } from "../../../shared/components/Eyebrow";
import { Icon } from "../../../shared/components/Icon";

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24">
      <Eyebrow>Qué hacemos</Eyebrow>

      <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="font-display text-4xl font-semibold tracking-wide sm:text-5xl">
          Servicios de precisión
        </h2>
        <p className="max-w-sm text-sm font-light text-white/60">
          Cada servicio hecho con dedicación, oficio y cuidado.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.number}
            className="group flex flex-col border border-gold/20 bg-white/[0.02] p-6 transition-colors hover:border-gold/50"
          >
            <span className="font-display text-2xl text-gold/60">
              {service.number}
            </span>
            <h3 className="mt-10 font-display text-2xl font-semibold">
              {service.title}
            </h3>
            <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-white/60">
              {service.description}
            </p>
            <a
              href="/booking"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold transition-colors group-hover:text-white"
            >
              Consultar <Icon name="arrow" className="h-3.5 w-3.5" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

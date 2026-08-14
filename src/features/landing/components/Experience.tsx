import { features, landing } from "../data";
import { Eyebrow } from "../../../shared/components/Eyebrow";
import { Icon } from "../../../shared/components/Icon";

export function Experience() {
  return (
    <section id="experience" className="border-t border-white/5 bg-white/[0.015]">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2">
        <div>
          <Eyebrow>La experiencia</Eyebrow>

          <h2 className="mt-6 font-display text-4xl font-semibold tracking-wide sm:text-5xl">
            Prolijo. Limpio. Siempre.
          </h2>

          <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-white/60">
            {landing.experienceText}
          </p>

          <div className="mt-10 inline-flex flex-col gap-1 border border-gold/30 bg-ink/40 px-8 py-5">
            <span className="text-sm text-white">Abierto Lun–Sáb</span>
            <span className="text-xs uppercase tracking-[0.2em] text-gold">
              {landing.hours}
            </span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-4 border border-gold/15 p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
                <Icon name={feature.icon} className="h-5 w-5" />
              </span>
              <p className="text-sm font-light leading-relaxed text-white/80">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

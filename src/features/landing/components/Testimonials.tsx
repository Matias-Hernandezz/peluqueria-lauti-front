import { testimonials } from "../data";
import { Eyebrow } from "../../../shared/components/Eyebrow";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Eyebrow>Lo que dicen</Eyebrow>

      <h2 className="mt-6 font-display text-4xl font-semibold tracking-wide sm:text-5xl">
        La confianza de la ciudad
      </h2>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col border border-gold/15 p-8"
          >
            <span className="tracking-[0.3em] text-gold">★★★★★</span>
            <blockquote className="mt-5 flex-1 text-sm font-light leading-relaxed text-white/70">
              “{testimonial.text}”
            </blockquote>
            <figcaption className="mt-6">
              <div className="text-sm font-medium text-white">
                {testimonial.name}
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                {testimonial.source}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { brand } from "../../../shared/config";
import { landing } from "../data";
import { Eyebrow } from "../../../shared/components/Eyebrow";
import { Button } from "../../../shared/components/Button";

/** Velocidad del parallax: 1 = fondo fijo (las fotos quedan quietas mientras el texto scrollea). */
const PARALLAX_SPEED = 1;

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mosaicRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mosaic = mosaicRef.current;
    if (!section || !mosaic) return;

    let raf = 0;
    const update = () => {
      // Cuánto se scrolleó la sección fuera del viewport (>= 0).
      const scrolled = Math.max(0, -section.getBoundingClientRect().top);
      mosaic.style.transform = `translateY(${scrolled * PARALLAX_SPEED}px)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink"
    >
      {/* Mosaico de imágenes con parallax: se mueve más lento que el scroll */}
      <div
        ref={mosaicRef}
        className="absolute inset-0 grid h-full w-full auto-rows-fr grid-cols-2 will-change-transform md:grid-cols-5"
      >
        {landing.heroImages.map((url, i) => (
          <img
            key={url}
            src={url}
            alt={i === 2 ? "Peluquería Lauti" : ""}
            className={`h-full w-full object-cover ${
              i === 0 ? "col-span-2 md:col-span-1" : ""
            }`}
          />
        ))}
      </div>

      {/* Overlay oscuro para que el texto sea legible sobre las fotos */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/25" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
        <Eyebrow>{landing.eyebrow}</Eyebrow>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-wide sm:text-7xl">
          {brand.brandLine1}
          <br />
          {brand.brandLine2}
        </h1>

        <p className="mt-6 flex items-center gap-3 text-sm text-white/60">
          <span className="h-px w-6 bg-gold/50" aria-hidden="true" />
          {brand.address}
        </p>

        <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-white/80">
          {landing.heroHeadline}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button to="/booking">Reservar ahora</Button>
          <Button href={brand.mapsUrl} variant="outline">
            Cómo llegar
          </Button>
        </div>
      </div>
    </section>
  );
}

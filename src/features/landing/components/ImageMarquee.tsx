import { landing } from "../data";

/**
 * Cinta de imágenes en marquee infinito, dos filas en direcciones opuestas.
 * Repetimos las imágenes para que la cinta sea más ancha que la pantalla y
 * el loop sea continuo (sin huecos).
 */
const BASE = [
  ...landing.heroImages,
  ...landing.heroImages,
  ...landing.heroImages,
];

function Row({ reverse = false }: { reverse?: boolean }) {
  // Dos mitades idénticas: al animar translateX -50% el loop no salta.
  const items = [...BASE, ...BASE];

  return (
    <div
      className={`flex w-max gap-4 ${
        reverse ? "animate-marquee-right" : "animate-marquee-left"
      }`}
    >
      {items.map((url, i) => (
        <img
          key={i}
          src={url}
          alt=""
          className="h-72 w-56 shrink-0 border border-gold/15 object-cover"
        />
      ))}
    </div>
  );
}

export function ImageMarquee() {
  return (
    <section className="overflow-hidden border-y border-white/5 bg-white/[0.015] py-10">
      <div className="flex flex-col gap-4">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}

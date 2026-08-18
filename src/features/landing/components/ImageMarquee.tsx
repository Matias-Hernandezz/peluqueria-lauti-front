import { landing } from "../data";

/**
 * Marquee infinito de dos filas en direcciones opuestas.
 * Cada fila muestra 4 fotos que cubren el ancho del viewport (25vw cada una).
 * Para que el loop no salte, cada fila arma dos mitades idénticas y anima
 * translateX -50%. El margen derecho de cada foto está descontado en el
 * width (25vw - 1rem), así 4 fotos = 100vw exacto y el loop es seamless.
 */
// Fuente de fotos (sin "imagen-referencia-4" ni "MAQUINAS").
const SOURCE = [
  ...landing.heroImages.filter(
    (url) => !url.includes("imagen-referencia-4") && !url.includes("MAQUINAS"),
  ),
  ...landing.marqueeImages,
];

// Mitad arriba, mitad abajo: con 8 fotos quedan 4 y 4.
const HALF = Math.ceil(SOURCE.length / 2);
const TOP = SOURCE.slice(0, HALF);
const BOTTOM = SOURCE.slice(HALF);

function Row({ urls, reverse = false }: { urls: string[]; reverse?: boolean }) {
  // Dos mitades idénticas: al animar translateX -50% el loop no salta.
  const items = [...urls, ...urls];

  return (
    <div
      className={`flex w-max ${
        reverse ? "animate-marquee-right" : "animate-marquee-left"
      }`}
    >
      {items.map((url, i) => (
        <img
          key={i}
          src={url}
          alt=""
          className="mr-4 aspect-[3/4] w-[calc(50vw-1rem)] shrink-0 border border-gold/15 object-cover md:w-[calc(25vw-1rem)]"
        />
      ))}
    </div>
  );
}

export function ImageMarquee() {
  return (
    <section className="overflow-hidden border-y border-white/5 bg-white/[0.015] py-10">
      <div className="flex flex-col gap-4">
        <Row urls={TOP} />
        <Row urls={BOTTOM} reverse />
      </div>
    </section>
  );
}

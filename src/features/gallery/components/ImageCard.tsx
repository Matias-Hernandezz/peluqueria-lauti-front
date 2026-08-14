import type { GalleryImage } from "../types";

export function ImageCard({ image }: { image: GalleryImage }) {
  return (
    <figure className="group relative overflow-hidden border border-gold/15">
      <img
        src={image.url}
        alt={image.category ?? "Corte"}
        className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      {image.category && (
        <figcaption className="absolute bottom-0 left-0 right-0 bg-ink/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold">
          {image.category}
        </figcaption>
      )}
    </figure>
  );
}

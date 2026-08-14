import type { GalleryImage } from "../types";
import { ImageCard } from "./ImageCard";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) {
    return <p className="text-sm text-white/50">Todavía no hay imágenes.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}

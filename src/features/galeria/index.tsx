import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../../shared/components/Navbar";
import { Footer } from "../../shared/components/Footer";
import { Eyebrow } from "../../shared/components/Eyebrow";
import { fetchGalleryImages } from "./api/fetchGalleryImages";
import { GalleryGrid } from "./components/GalleryGrid";
import { CategoryFilter } from "./components/CategoryFilter";

export function GalleryPage() {
  const [category, setCategory] = useState<string | null>(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery"],
    queryFn: fetchGalleryImages,
  });

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          (data ?? [])
            .map((img) => img.category)
            .filter((c): c is string => Boolean(c)),
        ),
      ),
    [data],
  );

  const filtered = (data ?? []).filter(
    (img) => !category || img.category === category,
  );

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <Eyebrow>Galería</Eyebrow>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-wide sm:text-5xl">
          Nuestros Cortes
        </h1>

        <div className="mt-8">
          <CategoryFilter
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
        </div>

        <div className="mt-10">
          {isLoading && <p className="text-sm text-white/50">Cargando…</p>}
          {isError && (
            <p className="text-sm text-white/50">No se pudo cargar la galería.</p>
          )}
          {!isLoading && !isError && <GalleryGrid images={filtered} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

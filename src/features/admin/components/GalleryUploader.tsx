import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminGallery } from "../hooks/useAdminGallery";
import {
  uploadGalleryImage,
  deleteGalleryImage,
  updateGalleryImage,
} from "../api/galleryApi";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../../../shared/components/Input";

export function GalleryUploader() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const { data: images = [], isLoading } = useAdminGallery();
  const [category, setCategory] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["admin", "gallery"] });

  const upload = useMutation({
    mutationFn: (file: File) =>
      uploadGalleryImage(token, file, category || undefined),
    onSuccess: () => {
      if (fileRef.current) fileRef.current.value = "";
      setCategory("");
      invalidate();
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteGalleryImage(token, id),
    onSuccess: invalidate,
  });

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload.mutate(file);
  };

  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= sorted.length) return;
    const a = sorted[index];
    const b = sorted[target];
    // Intercambiamos sort_order con el vecino.
    updateGalleryImage(token, a.id, { sort_order: b.sort_order }).then(() =>
      updateGalleryImage(token, b.id, { sort_order: a.sort_order }).then(
        invalidate,
      ),
    );
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Galería</h1>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Input
          placeholder="Categoría (opcional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="max-w-xs"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onFile}
          className="hidden"
          id="gallery-file"
        />
        <label
          htmlFor="gallery-file"
          className="cursor-pointer border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.15em] text-gold hover:bg-gold/10"
        >
          Subir imagen
        </label>
      </div>

      {upload.isError && (
        <p className="mt-3 text-sm text-red-400">
          {upload.error?.message ?? "No se pudo subir"}
        </p>
      )}

      {isLoading ? (
        <p className="mt-4 text-sm text-white/50">Cargando…</p>
      ) : sorted.length === 0 ? (
        <p className="mt-4 text-sm text-white/50">Sin imágenes.</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((img, i) => (
            <li key={img.id} className="border border-white/10 p-3">
              <img
                src={img.url}
                alt={img.category ?? "Imagen"}
                className="aspect-square w-full object-cover"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-white/50">
                  {img.category ?? "Sin categoría"}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => move(i, -1)}
                    className="text-xs text-white/70 hover:text-gold disabled:opacity-30"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    disabled={i === sorted.length - 1}
                    onClick={() => move(i, 1)}
                    className="text-xs text-white/70 hover:text-gold disabled:opacity-30"
                  >
                    ›
                  </button>
                  <button
                    type="button"
                    onClick={() => remove.mutate(img.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { api } from "../../../shared/lib/apiClient";
import type { GalleryImage } from "../types";

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  return api<GalleryImage[]>("/public/gallery");
}

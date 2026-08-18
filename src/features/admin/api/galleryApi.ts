import { api, ApiError, authHeaders } from "../../../shared/lib/apiClient";
import type { GalleryImage, GalleryImageUpdate } from "../types";

export async function fetchAdminGallery(
  token: string | null,
): Promise<GalleryImage[]> {
  return api<GalleryImage[]>("/admin/gallery", { headers: authHeaders(token) });
}

export async function uploadGalleryImage(
  token: string | null,
  file: File,
  category?: string,
): Promise<GalleryImage> {
  const form = new FormData();
  form.append("file", file);
  if (category) form.append("category", category);

  const res = await fetch("/api/v1/admin/gallery", {
    method: "POST",
    // Sin Content-Type: el navegador arma el boundary del multipart solo.
    headers: authHeaders(token),
    body: form,
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail ?? detail;
    } catch {
      /* body no JSON */
    }
    throw new ApiError(
      res.status,
      typeof detail === "string" ? detail : res.statusText,
    );
  }
  return res.json();
}

export async function deleteGalleryImage(
  token: string | null,
  id: number,
): Promise<void> {
  return api<void>(`/admin/gallery/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

export async function updateGalleryImage(
  token: string | null,
  id: number,
  payload: GalleryImageUpdate,
): Promise<GalleryImage> {
  return api<GalleryImage>(`/admin/gallery/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

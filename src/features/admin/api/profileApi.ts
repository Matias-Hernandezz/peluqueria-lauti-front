import { api, authHeaders } from "../../../shared/lib/apiClient";
import type { Barber, BarberUpdate } from "../types";

export async function fetchProfile(token: string | null): Promise<Barber> {
  return api<Barber>("/admin/profile", { headers: authHeaders(token) });
}

export async function updateProfile(
  token: string | null,
  payload: BarberUpdate,
): Promise<Barber> {
  return api<Barber>("/admin/profile", {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

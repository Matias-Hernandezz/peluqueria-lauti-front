import { api, authHeaders } from "../../../shared/lib/apiClient";
import type { Service, ServiceCreate, ServiceUpdate } from "../types";

export async function fetchAdminServices(
  token: string | null,
): Promise<Service[]> {
  return api<Service[]>("/admin/services", { headers: authHeaders(token) });
}

export async function createService(
  token: string | null,
  payload: ServiceCreate,
): Promise<Service> {
  return api<Service>("/admin/services", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export async function updateService(
  token: string | null,
  id: number,
  payload: ServiceUpdate,
): Promise<Service> {
  return api<Service>(`/admin/services/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

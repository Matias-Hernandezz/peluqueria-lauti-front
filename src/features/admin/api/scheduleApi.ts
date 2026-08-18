import { api, authHeaders } from "../../../shared/lib/apiClient";
import type { WorkingHours, WorkingHoursUpdate } from "../types";

export async function fetchSchedule(
  token: string | null,
): Promise<WorkingHours[]> {
  return api<WorkingHours[]>("/admin/schedule", { headers: authHeaders(token) });
}

export async function saveSchedule(
  token: string | null,
  payload: WorkingHoursUpdate[],
): Promise<WorkingHours[]> {
  return api<WorkingHours[]>("/admin/schedule", {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

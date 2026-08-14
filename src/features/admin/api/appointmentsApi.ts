import { api, authHeaders } from "../../../shared/lib/apiClient";
import type { Appointment } from "../types";

export async function fetchAdminAppointments(
  token: string | null,
  start_at: string,
  end_at: string,
): Promise<Appointment[]> {
  return api<Appointment[]>(
    `/admin/appointments?start_at=${encodeURIComponent(start_at)}&end_at=${encodeURIComponent(end_at)}`,
    { headers: authHeaders(token) },
  );
}

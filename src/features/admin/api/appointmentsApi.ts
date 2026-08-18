import { api, authHeaders } from "../../../shared/lib/apiClient";
import type { Appointment, AppointmentStatus } from "../types";

export async function fetchAdminAppointments(
  token: string | null,
  start_at: string,
  end_at: string,
  status?: AppointmentStatus,
): Promise<Appointment[]> {
  const params = new URLSearchParams({ start_at, end_at });
  if (status) params.set("status", status);
  return api<Appointment[]>(`/admin/appointments?${params.toString()}`, {
    headers: authHeaders(token),
  });
}

export async function updateAppointment(
  token: string | null,
  id: number,
  payload: { status?: AppointmentStatus; start_at?: string },
): Promise<Appointment> {
  return api<Appointment>(`/admin/appointments/${id}`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

export async function cancelAppointment(
  token: string | null,
  id: number,
): Promise<Appointment> {
  return api<Appointment>(`/admin/appointments/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

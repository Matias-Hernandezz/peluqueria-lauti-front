import { api } from "../../../shared/lib/apiClient";
import type { Appointment, AppointmentCreate } from "../types";

export async function createAppointment(
  payload: AppointmentCreate,
): Promise<Appointment> {
  return api<Appointment>("/public/appointments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

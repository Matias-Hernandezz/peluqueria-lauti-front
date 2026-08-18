import { useQuery } from "@tanstack/react-query";
import { fetchAdminAppointments } from "../api/appointmentsApi";
import { useAuth } from "./useAuth";
import type { AppointmentStatus } from "../types";

export function useAdminAppointments(
  startAt: string,
  endAt: string,
  status?: AppointmentStatus,
) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["admin", "appointments", startAt, endAt, status],
    queryFn: () => fetchAdminAppointments(token, startAt, endAt, status),
    enabled: Boolean(token),
  });
}

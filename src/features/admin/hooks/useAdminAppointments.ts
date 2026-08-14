import { useQuery } from "@tanstack/react-query";
import { fetchAdminAppointments } from "../api/appointmentsApi";
import { useAuth } from "./useAuth";

export function useAdminAppointments(startAt: string, endAt: string) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["admin", "appointments", startAt, endAt],
    queryFn: () => fetchAdminAppointments(token, startAt, endAt),
    enabled: Boolean(token),
  });
}

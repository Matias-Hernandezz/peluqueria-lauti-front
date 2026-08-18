import { useQuery } from "@tanstack/react-query";
import { fetchSchedule } from "../api/scheduleApi";
import { useAuth } from "./useAuth";

export function useSchedule() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["admin", "schedule"],
    queryFn: () => fetchSchedule(token),
    enabled: Boolean(token),
  });
}

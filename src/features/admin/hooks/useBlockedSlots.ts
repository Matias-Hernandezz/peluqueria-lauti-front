import { useQuery } from "@tanstack/react-query";
import { fetchBlockedSlots } from "../api/blockedSlotsApi";
import { useAuth } from "./useAuth";

export function useBlockedSlots(startAt: string, endAt: string) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["admin", "blocked-slots", startAt, endAt],
    queryFn: () => fetchBlockedSlots(token, startAt, endAt),
    enabled: Boolean(token),
  });
}

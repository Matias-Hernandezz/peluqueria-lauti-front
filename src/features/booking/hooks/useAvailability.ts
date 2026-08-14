import { useQuery } from "@tanstack/react-query";
import { fetchAvailability } from "../api/fetchAvailability";

export function useAvailability(serviceId: number | null, date: string | null) {
  return useQuery({
    queryKey: ["availability", serviceId, date],
    queryFn: () => fetchAvailability(serviceId!, date!),
    enabled: Boolean(serviceId && date),
  });
}

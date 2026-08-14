import { api } from "../../../shared/lib/apiClient";
import type { AvailabilityResponse } from "../types";

export async function fetchAvailability(
  serviceId: number,
  date: string,
): Promise<AvailabilityResponse> {
  return api<AvailabilityResponse>(
    `/public/availability?service_id=${serviceId}&date=${date}`,
  );
}

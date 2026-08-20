import { api } from "../../../shared/lib/apiClient";
import type { Barber, WorkingHours } from "../../../shared/types/domain";

export interface LandingResponse {
  barber: Barber | null;
  working_hours: WorkingHours[];
}

export async function fetchLanding(): Promise<LandingResponse> {
  return api<LandingResponse>("/public/landing");
}

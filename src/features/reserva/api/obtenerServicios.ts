import { api } from "../../../shared/lib/apiClient";
import type { Service } from "../types";

export async function fetchServices(): Promise<Service[]> {
  return api<Service[]>("/public/services");
}

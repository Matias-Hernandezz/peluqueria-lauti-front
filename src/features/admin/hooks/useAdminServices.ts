import { useQuery } from "@tanstack/react-query";
import { fetchAdminServices } from "../api/servicesApi";
import { useAuth } from "./useAuth";

export function useAdminServices() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["admin", "services"],
    queryFn: () => fetchAdminServices(token),
    enabled: Boolean(token),
  });
}

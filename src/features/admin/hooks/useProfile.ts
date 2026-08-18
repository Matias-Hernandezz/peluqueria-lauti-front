import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/profileApi";
import { useAuth } from "./useAuth";

export function useProfile() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["admin", "profile"],
    queryFn: () => fetchProfile(token),
    enabled: Boolean(token),
  });
}

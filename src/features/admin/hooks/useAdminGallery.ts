import { useQuery } from "@tanstack/react-query";
import { fetchAdminGallery } from "../api/galleryApi";
import { useAuth } from "./useAuth";

export function useAdminGallery() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["admin", "gallery"],
    queryFn: () => fetchAdminGallery(token),
    enabled: Boolean(token),
  });
}

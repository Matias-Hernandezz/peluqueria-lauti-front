import { useQuery } from "@tanstack/react-query";
import { fetchLanding } from "../api/obtenerLanding";
import type { WorkingHours } from "../../../shared/types/domain";

/**
 * Horarios de atención reales (los mismos que edita el admin). Al consumir
 * `/public/landing`, cualquier cambio en el panel se refleja acá al recargar.
 */
export function useLandingHours() {
  const { data, isLoading } = useQuery({
    queryKey: ["public", "landing"],
    queryFn: fetchLanding,
    // Refresca al volver a la pestaña: si el admin cambió el horario en otra
    // ventana, al enfocar la landing se traen los datos nuevos.
    refetchOnWindowFocus: true,
  });

  return {
    hours: (data?.working_hours ?? []) as WorkingHours[],
    isLoading,
  };
}

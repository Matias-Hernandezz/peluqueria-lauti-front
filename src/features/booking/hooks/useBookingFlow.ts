import { useState } from "react";
import type { AppointmentCreate } from "../types";

export type BookingStep = 1 | 2 | 3 | 4;

export interface ClientData {
  name: string;
  phone: string;
  email: string;
}

/**
 * Estado del wizard de reserva: servicio -> horario -> datos -> confirmación.
 * La validación de cada paso está en `canNext`; el payload se arma solo cuando
 * están todos los datos.
 */
export function useBookingFlow() {
  const [step, setStep] = useState<BookingStep>(1);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [client, setClient] = useState<ClientData>({
    name: "",
    phone: "",
    email: "",
  });

  const canNext =
    (step === 1 && Boolean(serviceId)) ||
    (step === 2 && Boolean(slot)) ||
    step >= 3;

  const next = () => {
    if (canNext) setStep((s) => Math.min(s + 1, 4) as BookingStep);
  };
  const back = () => setStep((s) => Math.max(s - 1, 1) as BookingStep);

  const payload: AppointmentCreate | null =
    serviceId && slot && client.name && client.phone
      ? {
          service_id: serviceId,
          start_at: slot,
          client_name: client.name,
          client_phone: client.phone,
          client_email: client.email || null,
        }
      : null;

  return {
    step,
    serviceId,
    slot,
    client,
    payload,
    canNext,
    setServiceId,
    setSlot,
    setClient,
    next,
    back,
  };
}

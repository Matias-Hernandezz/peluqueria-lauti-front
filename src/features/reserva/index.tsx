import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Navbar } from "../../shared/components/Navbar";
import { Footer } from "../../shared/components/Footer";
import { Eyebrow } from "../../shared/components/Eyebrow";
import { useBookingFlow } from "./hooks/useFlujoReserva";
import { ServiceSelector } from "./components/SelectorServicio";
import { AvailabilityCalendar } from "./components/CalendarioDisponibilidad";
import { ClientForm } from "./components/FormularioCliente";
import { ConfirmationStep } from "./components/PasoConfirmacion";

const steps = ["Servicio", "Horario", "Tus datos", "Confirmación"];

export function BookingPage() {
  const [searchParams] = useSearchParams();
  const preselectId = Number(searchParams.get("service")) || null;
  const flow = useBookingFlow(preselectId);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-24">
        <Eyebrow>Reservas</Eyebrow>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-wide sm:text-5xl">
          Reservá tu turno
        </h1>

        <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.15em]">
          {steps.map((label, i) => (
            <li
              key={label}
              className={
                flow.step === i + 1 ? "text-gold" : "text-white/40"
              }
            >
              <span className="mr-1">{i + 1}.</span>
              {label}
            </li>
          ))}
        </ol>

        <div className="mt-10">
          {flow.step === 1 && (
            <ServiceSelector
              selected={flow.serviceId}
              onSelect={flow.setServiceId}
            />
          )}
          {flow.step === 2 && flow.serviceId && (
            <AvailabilityCalendar
              serviceId={flow.serviceId}
              selected={flow.slot}
              onSelect={flow.setSlot}
            />
          )}
          {flow.step === 3 && (
            <ClientForm
              initial={flow.client}
              onSubmit={(data) => {
                flow.setClient(data);
                flow.next();
              }}
            />
          )}
          {flow.step === 4 && flow.payload && (
            <ConfirmationStep
              payload={flow.payload}
              onConfirmed={() => setConfirmed(true)}
            />
          )}
        </div>

        <div className="mt-10 flex justify-between">
          {confirmed ? (
            <Link
              to="/"
              className="ml-auto inline-flex items-center justify-center bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold/90"
            >
              Volver al inicio
            </Link>
          ) : (
            <>
              {flow.step > 1 && (
                <button
                  type="button"
                  onClick={flow.back}
                  className="border border-white/15 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-gold/40"
                >
                  Atrás
                </button>
              )}
              {flow.step < 3 && (
                <button
                  type="button"
                  onClick={flow.next}
                  disabled={!flow.canNext}
                  className="ml-auto inline-flex items-center justify-center bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold/90 disabled:opacity-50"
                >
                  Continuar
                </button>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

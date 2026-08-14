import { useState } from "react";
import type { FormEvent } from "react";
import type { ClientData } from "../hooks/useBookingFlow";

interface Props {
  initial: ClientData;
  onSubmit: (data: ClientData) => void;
}

const inputClass =
  "border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-gold";

export function ClientForm({ initial, onSubmit }: Props) {
  const [name, setName] = useState(initial.name);
  const [phone, setPhone] = useState(initial.phone);
  const [email, setEmail] = useState(initial.email);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ name, phone, email });
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <input
        className={inputClass}
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={inputClass}
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        className={inputClass}
        type="email"
        placeholder="Email (opcional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold/90"
      >
        Continuar
      </button>
    </form>
  );
}

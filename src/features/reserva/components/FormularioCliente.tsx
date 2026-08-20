import { useState } from "react";
import type { FormEvent } from "react";
import type { ClientData } from "../hooks/useFlujoReserva";

interface Props {
  initial: ClientData;
  onSubmit: (data: ClientData) => void;
}

const inputClass =
  "w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-gold";

function digits(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function ClientForm({ initial, onSubmit }: Props) {
  const [name, setName] = useState(initial.name);
  const [phone, setPhone] = useState(initial.phone);
  const [email, setEmail] = useState(initial.email);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const nextErrors: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) {
      nextErrors.name = "Ingresá tu nombre (mínimo 2 caracteres)";
    }
    const count = digits(phone).length;
    if (count < 8 || count > 15) {
      nextErrors.phone = "Ingresá un teléfono válido (8 a 15 dígitos)";
    }
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone) return;

    onSubmit({ name: name.trim(), phone, email });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex max-w-md flex-col gap-4">
      <div>
        <input
          className={inputClass}
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>
      <div>
        <input
          className={inputClass}
          placeholder="Teléfono"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
      </div>
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

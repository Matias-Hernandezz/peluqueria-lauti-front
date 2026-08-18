import { useState } from "react";
import type { FormEvent } from "react";
import { Navbar } from "../../shared/components/Navbar";
import { Footer } from "../../shared/components/Footer";
import { Eyebrow } from "../../shared/components/Eyebrow";

const inputClass =
  "border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-gold";

export function ContactPage() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: acá va el envío real (backend, WhatsApp o email) cuando se defina.
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-24">
        <Eyebrow align="center">Contacto</Eyebrow>
        <h1 className="mt-6 text-center font-display text-4xl font-semibold tracking-wide sm:text-5xl">
          Contratanos o escribinos
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-sm font-light leading-relaxed text-white/60">
          Dejanos tus datos y contanos qué necesitás. Te respondemos a la
          brevedad.
        </p>

        {sent ? (
          <div className="mx-auto mt-10 max-w-md border border-gold/30 bg-gold/10 p-8 text-sm leading-relaxed text-white/90">
            ¡Gracias! Tu mensaje fue enviado. Te vamos a contactar.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-md flex-col gap-4"
          >
            <input
              className={inputClass}
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              className={inputClass}
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
            <input
              className={inputClass}
              type="email"
              placeholder="Email (opcional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              className={`${inputClass} min-h-32 resize-y`}
              placeholder="Descripción — contanos qué querés (corte, tintura, evento, etc.)"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold/90"
            >
              Enviar
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}

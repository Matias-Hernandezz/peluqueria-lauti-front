import { brand } from "../config";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display text-xl font-semibold">
            {brand.brandLine1}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.4em] text-gold">
            {brand.tagline}
          </span>
        </div>

        <div className="text-center text-xs leading-relaxed text-white/50 md:text-right">
          <p>{brand.address}</p>
          <p className="mt-1">{brand.phone}</p>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-[11px] text-white/40">
        © {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}

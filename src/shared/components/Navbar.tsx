import { Link } from "react-router-dom";
import { brand } from "../config";
import { Button } from "./Button";

const links = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/#services" },
  { label: "Contacto", to: "/#contact" },
  { label: "Reservar", to: "/booking" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl font-semibold tracking-wide text-gold">
            {brand.brandLine1}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button to="/booking" className="px-5 py-2.5">
          <span className="hidden sm:inline">Reservar ahora</span>
        </Button>
      </nav>
    </header>
  );
}

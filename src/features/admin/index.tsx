import { useState } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useRealtime } from "./hooks/useRealtime";
import { Icon } from "../../shared/components/Icon";

export function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  // Mantiene la data del panel sincronizada en tiempo real.
  useRealtime(isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const linkClass =
    "text-sm uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-gold";

  const closeMenu = () => setMenuOpen(false);

  const navLinks = (
    <>
      <Link to="/admin" className={linkClass} onClick={closeMenu}>
        Agenda
      </Link>
      <Link to="/admin/services" className={linkClass} onClick={closeMenu}>
        Servicios
      </Link>
      <Link to="/admin/gallery" className={linkClass} onClick={closeMenu}>
        Galería
      </Link>
      <Link to="/admin/schedule" className={linkClass} onClick={closeMenu}>
        Horario
      </Link>
      <Link to="/admin/profile" className={linkClass} onClick={closeMenu}>
        Perfil
      </Link>
    </>
  );

  return (
    <div className="flex min-h-screen bg-ink text-white">
      {/* Sidebar en desktop */}
      <aside className="hidden w-56 shrink-0 border-r border-white/5 p-6 md:block">
        <h2 className="font-display text-xl font-semibold">Admin</h2>
        <nav className="mt-6 flex flex-col gap-3">{navLinks}</nav>
        <button
          type="button"
          onClick={logout}
          className="mt-10 text-xs uppercase tracking-[0.15em] text-white/40 hover:text-gold"
        >
          Salir
        </button>
      </aside>

      {/* Columna principal (con header móvil + menú desplegable) */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/5 px-4 py-3 md:hidden">
          <h2 className="font-display text-lg font-semibold">Admin</h2>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
            aria-expanded={menuOpen}
            className="text-white/70 hover:text-gold"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </header>

        {menuOpen && (
          <div className="border-b border-white/5 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-3">{navLinks}</nav>
            <button
              type="button"
              onClick={logout}
              className="mt-6 text-xs uppercase tracking-[0.15em] text-white/40 hover:text-gold"
            >
              Salir
            </button>
          </div>
        )}

        <main className="min-w-0 flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

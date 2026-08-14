import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const linkClass =
    "text-sm uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-gold";

  return (
    <div className="flex min-h-screen bg-ink text-white">
      <aside className="w-56 shrink-0 border-r border-white/5 p-6">
        <h2 className="font-display text-xl font-semibold">Admin</h2>
        <nav className="mt-6 flex flex-col gap-3">
          <Link to="/admin" className={linkClass}>
            Agenda
          </Link>
          <Link to="/admin/services" className={linkClass}>
            Servicios
          </Link>
          <Link to="/admin/gallery" className={linkClass}>
            Galería
          </Link>
        </nav>
        <button
          type="button"
          onClick={logout}
          className="mt-10 text-xs uppercase tracking-[0.15em] text-white/40 hover:text-gold"
        >
          Salir
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

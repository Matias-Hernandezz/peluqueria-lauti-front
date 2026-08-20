import { lazy, Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { LandingPage } from "../features/landing";
import { BookingPage } from "../features/reserva";

// El feature admin se carga por separado (code-splitting): el bundle público
// (landing/booking) no incluye el código del panel.
const AdminEntry = lazy(() =>
  import("../features/admin/routes").then((m) => ({ default: m.AdminEntry })),
);

/**
 * Scroll a la sección indicada en el hash (ej. /#services). React Router no
 * scrollea solo al hash, así que lo hacemos acá cuando cambia la ruta.
 */
function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (!el) return;

    const id = requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}

function RootLayout() {
  return (
    <>
      <ScrollToHash />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/booking", element: <BookingPage /> },
      {
        path: "/admin/*",
        element: (
          <Suspense fallback={<div className="min-h-screen bg-ink" />}>
            <AdminEntry />
          </Suspense>
        ),
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

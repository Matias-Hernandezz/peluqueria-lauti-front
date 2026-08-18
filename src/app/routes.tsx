import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { LandingPage } from "../features/landing";
import { BookingPage } from "../features/reserva";
import { ContactPage } from "../features/contacto";

// El feature admin se carga por separado (code-splitting): el bundle público
// (landing/booking) no incluye el código del panel.
const AdminEntry = lazy(() =>
  import("../features/admin/routes").then((m) => ({ default: m.AdminEntry })),
);

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/booking", element: <BookingPage /> },
  { path: "/contacto", element: <ContactPage /> },
  {
    path: "/admin/*",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-ink" />}>
        <AdminEntry />
      </Suspense>
    ),
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

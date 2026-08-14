import type { RouteObject } from "react-router-dom";
import { AdminLayout } from "./index";
import { LoginPage } from "./components/LoginPage";
import { AgendaView } from "./components/AgendaView";
import { ServiceManager } from "./components/ServiceManager";
import { GalleryUploader } from "./components/GalleryUploader";

// Sub-rutas del panel, montadas bajo /admin desde app/routes.tsx.
// Todo lo que cuelga de AdminLayout queda protegido (redirige a /admin/login).
export const AdminRoutes: RouteObject[] = [
  { path: "login", element: <LoginPage /> },
  {
    element: <AdminLayout />,
    children: [
      { index: true, element: <AgendaView /> },
      { path: "services", element: <ServiceManager /> },
      { path: "gallery", element: <GalleryUploader /> },
    ],
  },
];

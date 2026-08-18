import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "./index";
import { LoginPage } from "./components/LoginPage";
import { AgendaView } from "./components/AgendaView";
import { ServiceManager } from "./components/ServiceManager";
import { GalleryUploader } from "./components/GalleryUploader";
import { WorkingHoursEditor } from "./components/WorkingHoursEditor";
import { ProfileEditor } from "./components/ProfileEditor";

/**
 * Árbol de rutas del panel, montado bajo /admin.
 * Se carga de forma diferida (React.lazy) desde app/routes.tsx, así el bundle
 * público (landing/booking) no incluye el código del panel.
 */
export function AdminEntry() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<AdminLayout />}>
        <Route index element={<AgendaView />} />
        <Route path="services" element={<ServiceManager />} />
        <Route path="gallery" element={<GalleryUploader />} />
        <Route path="schedule" element={<WorkingHoursEditor />} />
        <Route path="profile" element={<ProfileEditor />} />
      </Route>
    </Routes>
  );
}

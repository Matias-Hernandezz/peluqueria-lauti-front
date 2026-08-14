import { createBrowserRouter, Navigate } from "react-router-dom";
import { LandingPage } from "../features/landing";
import { GalleryPage } from "../features/gallery";
import { BookingPage } from "../features/booking";
import { AdminRoutes } from "../features/admin/routes";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/gallery", element: <GalleryPage /> },
  { path: "/booking", element: <BookingPage /> },
  { path: "/admin", children: AdminRoutes },
  { path: "*", element: <Navigate to="/" replace /> },
]);

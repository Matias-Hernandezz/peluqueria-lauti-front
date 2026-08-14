/** Tipos de dominio compartidos entre features (espejan la API del backend). */

export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export interface Service {
  id: number;
  name: string;
  duration_minutes: number;
  price: string; // Decimal serializado como string
  active: boolean;
}

export interface Barber {
  id: number;
  name: string;
  bio: string | null;
  photo_url: string | null;
  location: string | null;
  social_instagram: string | null;
  social_facebook: string | null;
  social_tiktok: string | null;
}

export interface WorkingHours {
  id: number;
  weekday: number; // 0 = lunes ... 6 = domingo
  start_time: string;
  end_time: string;
  is_open: boolean;
}

export interface Appointment {
  id: number;
  client_name: string;
  client_phone: string;
  client_email: string | null;
  service_id: number;
  start_at: string;
  end_at: string;
  status: AppointmentStatus;
  service_name?: string | null;
}

export interface AppointmentCreate {
  service_id: number;
  start_at: string;
  client_name: string;
  client_phone: string;
  client_email?: string | null;
}

export interface GalleryImage {
  id: number;
  url: string;
  public_id: string | null;
  category: string | null;
  sort_order: number;
}

export interface AvailabilityResponse {
  service_id: number;
  date: string; // YYYY-MM-DD
  slots: string[]; // ISO datetimes
}

export interface BlockedSlot {
  id: number;
  start_at: string;
  end_at: string;
  reason: string | null;
}

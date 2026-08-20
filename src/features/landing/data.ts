/**
 * Contenido de la landing, centralizado para reemplazar por los datos reales
 * del negocio (o por un fetch al backend) sin tocar los componentes.
 * TODO: reemplazar por contenido real de Lauti o consumir GET /api/v1/public/landing.
 */

export interface Feature {
  icon: "scissors" | "clock" | "location" | "team";
  title: string;
}

export interface Stat {
  value: string;
  label: string;
}

export const landing = {
  eyebrow: "Barbero Premium",
  heroImages: [
    "https://res.cloudinary.com/dsfrkmewm/image/upload/v1786746205/imagen-referencia-4_cpppet.jpg",
    "https://res.cloudinary.com/dsfrkmewm/image/upload/v1786746206/imagen-referencia-2_qbdkp3.jpg",
    "https://res.cloudinary.com/dsfrkmewm/image/upload/v1786746707/MAQUINAS_rk5d1m.jpg",
    "https://res.cloudinary.com/dsfrkmewm/image/upload/v1786746206/imagen-referencia_yvgnjj.jpg",
    "https://res.cloudinary.com/dsfrkmewm/image/upload/v1786746205/imagen-referencia-3_nvx3ls.jpg",
  ],
  heroImage:
    "https://res.cloudinary.com/dsfrkmewm/image/upload/v1787014077/copy_of_maquinas_rk5d1m.jpg",
  marqueeImages: [
    "https://res.cloudinary.com/dsfrkmewm/image/upload/v1787013738/WhatsApp_Image_2026-08-16_at_19.05.39_2_tuojog.jpg",
    "https://res.cloudinary.com/dsfrkmewm/image/upload/v1787013738/WhatsApp_Image_2026-08-16_at_19.05.38_xcuz7c.jpg",
    "https://res.cloudinary.com/dsfrkmewm/image/upload/v1787013738/WhatsApp_Image_2026-08-16_at_19.05.38_1_sadgw1.jpg",
    "https://res.cloudinary.com/dsfrkmewm/image/upload/v1787013738/WhatsApp_Image_2026-08-16_at_19.05.39_mfycum.jpg",
    "https://res.cloudinary.com/dsfrkmewm/image/upload/v1787013738/WhatsApp_Image_2026-08-16_at_19.05.41_j6sxjx.jpg",
  ],
  heroHeadline:
    "Cortes prolijos. Líneas limpias. Entrás y salís luciendo lo mejor de vos — siempre.",
  experienceText:
    "Entrás a la barbería y pisás un lugar que se toma su oficio en serio. Sin apuro, sin atajos — solo servicio atento y experto que te manda afuera luciendo prolijo.",
};

export const features: Feature[] = [
  { icon: "scissors", title: "Cortes de precisión adaptados a la forma de tu rostro" },
  { icon: "clock", title: "Elegí tu horario en segundos" },
  { icon: "team", title: "Un corte prolijo que se mantiene" },
];

export const stats: Stat[] = [
  { value: "RESERVA ONLINE", label: "Elegí y confirmá en minutos" },
  { value: "CORTE A MEDIDA", label: "Adaptado a tu estilo" },
];

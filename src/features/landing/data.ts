/**
 * Contenido de la landing, centralizado para reemplazar por los datos reales
 * del negocio (o por un fetch al backend) sin tocar los componentes.
 * TODO: reemplazar por contenido real de Lauti o consumir GET /api/v1/public/landing.
 */

export interface ServiceCard {
  number: string;
  title: string;
  description: string;
}

export interface Feature {
  icon: "scissors" | "walkin" | "location" | "team";
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
  hours: "Lun–Vie 10–18 · Sáb 10–16 · Dom Cerrado",
  experienceText:
    "Entrás a la barbería y pisás un lugar que se toma su oficio en serio. Sin apuro, sin atajos — solo servicio atento y experto que te manda afuera luciendo prolijo.",
};

export const services: ServiceCard[] = [
  {
    number: "01",
    title: "Cortes de pelo",
    description:
      "De cortes clásicos a estilos contemporáneos, incluidos los degradados (skin, mid y high fade). Prolijos, limpios y a tu medida.",
  },
  {
    number: "02",
    title: "Corte de pelo + Barba",
    description:
      "Corte y arreglo de barba en un solo servicio — delineado, perfilado y cuidado para un acabado definido.",
  },
  {
    number: "03",
    title: "Tintura",
    description:
      "Color y tonos a tu medida, aplicados de forma pareja para un acabado natural.",
  },
];

export const features: Feature[] = [
  { icon: "scissors", title: "Cortes de precisión adaptados a la forma de tu rostro" },
  { icon: "walkin", title: "Sin cita previa — no hace falta reservar" },
  { icon: "location", title: "En pleno corazón de la ciudad" },
  { icon: "team", title: "Barbero experimentado, resultado consistente" },
];

export const stats: Stat[] = [
  { value: "SIN CITA", label: "Siempre bienvenido" },
  { value: "CORTE A MEDIDA", label: "Adaptado a tu estilo" },
];

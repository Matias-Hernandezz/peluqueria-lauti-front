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

export interface Testimonial {
  name: string;
  source: string;
  text: string;
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
  heroHeadline:
    "Cortes prolijos. Líneas limpias. Entrás y salís luciendo lo mejor de vos — siempre.",
  rating: "4.5",
  reviews: "245+",
  hours: "Lun–Vie 10–18 · Sáb 10–16 · Dom Cerrado",
  experienceText:
    "Entrás a la barbería y pisás un lugar que se toma su oficio en serio. Sin apuro, sin atajos — solo servicio atento y experto que te manda afuera luciendo prolijo.",
};

export const services: ServiceCard[] = [
  {
    number: "01",
    title: "Cortes de pelo",
    description:
      "De cortes clásicos a estilos contemporáneos — prolijos, limpios y a tu medida.",
  },
  {
    number: "02",
    title: "Degradados",
    description:
      "Skin, mid y high fade ejecutados con precisión y consistencia.",
  },
  {
    number: "03",
    title: "Arreglo de barba",
    description: "Delineado, perfilado y cuidado para un acabado definido.",
  },
  {
    number: "04",
    title: "Peinado",
    description:
      "Cera, clay, pomada — asesoría de producto y peinado final incluidos.",
  },
];

export const features: Feature[] = [
  { icon: "scissors", title: "Cortes de precisión adaptados a la forma de tu rostro" },
  { icon: "walkin", title: "Sin cita previa — no hace falta reservar" },
  { icon: "location", title: "En pleno corazón de la ciudad" },
  { icon: "team", title: "Barbero experimentado, resultado consistente" },
];

export const testimonials: Testimonial[] = [
  {
    name: "James R.",
    source: "Reseña de Google",
    text: "La mejor barbería de la zona. Un barbero habilidoso con gran atención al detalle y un servicio de primera. Los precios son justos para la calidad que te llevás — no iría a otro lado.",
  },
  {
    name: "Marcus T.",
    source: "Reseña de Google",
    text: "Caí un sábado sin reserva y me atendió al instante. El mejor fade que me hice en años — líneas limpias, gran atención al detalle. Vuelvo seguro cada dos semanas.",
  },
  {
    name: "Daniel P.",
    source: "Reseña de Google",
    text: "Sin dudas la mejor barbería de Melbourne. Llegué sin idea de lo que quería y salí luciendo mejor que nunca. De verdad ama su oficio.",
  },
];

export const stats: Stat[] = [
  { value: "4.5 ★", label: "Calificación en Google" },
  { value: "245+", label: "Reseñas verificadas" },
  { value: "SIN CITA", label: "Siempre bienvenido" },
  { value: "EXPERTO", label: "Resultado consistente" },
];

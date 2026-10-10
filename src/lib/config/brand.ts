export const BRAND = {
  name: "FERROX",
  descriptor: "FERRETERÍA & SUMINISTROS",
  tagline: "EQUIPAMIENTO & SUMINISTROS",
  legalNote:
    "FERROX es una marca conceptual creada con fines de demostración de portfolio. Productos, precios y datos comerciales son ilustrativos.",
} as const;

/**
 * Contacto de demostración. El número de WhatsApp y los enlaces sociales son
 * placeholders claramente identificados — reemplazar por canales reales antes
 * de cualquier uso comercial efectivo.
 */
export const CONTACT = {
  whatsapp: {
    number: "5491100000000",
    isDemo: true,
  },
  email: {
    address: "contacto@ferrox-demo.com",
    isDemo: true,
  },
  social: [
    { label: "Instagram", href: "#", isDemo: true },
    { label: "Facebook", href: "#", isDemo: true },
  ],
} as const;

export function getWhatsAppUrl(message: string): string {
  const base = `https://wa.me/${CONTACT.whatsapp.number}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { label: "Productos", href: "/productos" },
  { label: "Categorías", href: "/categorias" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "#contacto" },
] as const;

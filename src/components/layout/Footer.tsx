import { connection } from "next/server";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { BackToTop } from "@/components/ui/BackToTop";
import { CATEGORIES } from "@/lib/data/categories";
import { BRAND, CONTACT, NAV_LINKS, getWhatsAppUrl } from "@/lib/config/brand";

export async function Footer() {
  await connection();
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="border-t border-graphite-soft bg-carbon">
      <div className="container-edit grid gap-14 py-20 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-warm-white" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">
            {BRAND.tagline}. Herramientas y suministros para quienes construyen,
            reparan y crean todos los días.
          </p>
        </div>

        <div>
          <h3 className="label-industrial text-steel-dim">Navegación</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-steel transition-colors hover:text-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label-industrial text-steel-dim">Categorías</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {CATEGORIES.slice(0, 5).map((category) => (
              <li key={category.id}>
                <Link
                  href={`/productos?categoria=${category.id}`}
                  className="text-sm text-steel transition-colors hover:text-orange"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label-industrial text-steel-dim">Contacto</h3>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-steel">
            <li>
              <a
                href={getWhatsAppUrl("Hola FERROX, quiero más información.")}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-orange"
              >
                WhatsApp (demo)
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email.address}`}
                className="transition-colors hover:text-orange"
              >
                {CONTACT.email.address}
              </a>
            </li>
            <li className="flex gap-4 pt-1">
              {CONTACT.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="label-industrial text-steel-dim transition-colors hover:text-orange"
                >
                  {social.label}
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>

      <div className="container-edit flex flex-col gap-4 border-t border-graphite-soft py-8 text-xs text-steel-dim md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl leading-relaxed">
          {BRAND.legalNote} Número de WhatsApp y enlaces sociales ilustrativos.
        </p>
        <div className="flex items-center justify-between gap-6 md:justify-end">
          <p>© {year} FERROX — Proyecto de portfolio</p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

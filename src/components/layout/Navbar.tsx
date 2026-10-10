"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NAV_LINKS, getWhatsAppUrl } from "@/lib/config/brand";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-steel-dim/20 bg-carbon/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-edit flex h-20 items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo className="text-warm-white" />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label-industrial text-steel transition-colors hover:text-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            as="a"
            href={getWhatsAppUrl("Hola FERROX, quiero consultar por una herramienta.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
          className="p-2 text-warm-white lg:hidden"
        >
          <Menu size={26} aria-hidden="true" />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

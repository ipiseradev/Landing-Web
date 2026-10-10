"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { NAV_LINKS, getWhatsAppUrl } from "@/lib/config/brand";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
      className="fixed inset-0 z-50 flex flex-col bg-carbon md:hidden"
    >
      <div className="container-edit flex h-20 items-center justify-between">
        <Link href="/" onClick={onClose}>
          <Logo className="text-warm-white" />
        </Link>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          className="p-2 text-warm-white hover:text-orange"
        >
          <X size={26} aria-hidden="true" />
        </button>
      </div>

      <nav className="container-edit mt-8 flex flex-1 flex-col gap-2" aria-label="Principal">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="label-industrial flex items-center gap-4 border-b border-graphite-soft py-5 text-2xl! font-display font-semibold tracking-normal! normal-case! text-warm-white transition-colors hover:text-orange"
          >
            <span className="text-sm text-steel-dim">0{i + 1}</span>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="container-edit mb-10">
        <Button
          as="a"
          href={getWhatsAppUrl("Hola FERROX, quiero consultar por una herramienta.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full justify-center"
        >
          Consultar por WhatsApp
        </Button>
      </div>
    </div>
  );
}

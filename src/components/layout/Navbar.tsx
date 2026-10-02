"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { placeholders } from "@/content/placeholder";
import { TodoBadge } from "@/components/ui/TodoBadge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { OverlayMenu } from "./OverlayMenu";
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<"Services" | "Sectors" | null>(null);
  const header = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (header.current && !header.current.contains(event.target as Node))
        setMenu(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  const closeDialog = () => dialog.current?.close();
  return (
    <header
      ref={header}
      className={cn(
        "fixed start-0 end-0 top-0 z-50 text-on-dark transition-colors duration-200",
        scrolled || pathname !== "/" || menu
          ? "border-b border-dark-line bg-navy"
          : "bg-transparent",
      )}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menu) {
          header.current
            ?.querySelector<HTMLButtonElement>(`[data-menu="${menu}"]`)
            ?.focus();
          setMenu(null);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenu(null);
      }}
    >
      <Container className="flex h-24 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-gutter">
        <Link
          href="/"
          aria-label="Dodzel Engineering home"
          className="flex items-center gap-2 sm:gap-3"
        >
          <span className="hidden h-11 w-11 place-items-center border border-amber sm:grid font-display text-lg text-amber">
            {placeholders.brand.text}
          </span>
          <span className="text-sm font-semibold tracking-[0.12em]">
            DODZEL
            <span className="mt-1 hidden text-[9px] sm:block tracking-[0.22em] text-muted-dark">
              ENGINEERING
            </span>
          </span>
          <TodoBadge />
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 xl:flex"
        >
          {navLinks.map((link) => (
            <div key={link.href} className="flex items-center gap-1">
              <Link
                href={link.href}
                onClick={() => setMenu(null)}
                aria-current={pathname === link.href ? "page" : undefined}
                className="py-3 text-sm hover:text-amber"
              >
                {link.label}
              </Link>
              {(link.label === "Services" || link.label === "Sectors") && (
                <button
                  data-menu={link.label}
                  aria-label={`Open ${link.label} menu`}
                  aria-expanded={menu === link.label}
                  aria-controls="mega-menu"
                  onClick={() =>
                    setMenu(
                      menu === link.label
                        ? null
                        : (link.label as "Services" | "Sectors"),
                    )
                  }
                  className="p-2"
                >
                  <ChevronDown size={14} />
                </button>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            href="/request-a-quote"
            className="min-h-10 gap-2 px-3 text-xs sm:gap-4 sm:px-5 sm:text-sm [&>svg]:hidden sm:[&>svg]:block"
          >
            Request a Quote
          </Button>
          <button
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-controls="navigation-dialog"
            onClick={() => {
              setMenu(null);
              dialog.current?.showModal();
            }}
            className="grid h-11 w-11 place-items-center border border-dark-line"
          >
            <Menu size={22} />
          </button>
        </div>
      </Container>
      {menu && (
        <div id="mega-menu">
          <MegaMenu kind={menu} onNavigate={() => setMenu(null)} />
        </div>
      )}
      <dialog
        ref={dialog}
        id="navigation-dialog"
        aria-labelledby="navigation-title"
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto overscroll-contain bg-navy text-on-dark backdrop:bg-navy/80"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              'a[href], button, input, select, textarea, summary, [tabindex="0"]',
            ),
          ).filter(
            (element) =>
              element.getClientRects().length > 0 &&
              !element.hasAttribute("disabled"),
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <Container className="py-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 id="navigation-title" className="text-xl">
              Dodzel / Explore
            </h2>
            <button
              autoFocus
              onClick={closeDialog}
              aria-label="Close navigation menu"
              className="grid h-12 w-12 place-items-center border border-dark-line"
            >
              <X />
            </button>
          </div>
          <div className="xl:hidden">
            <MobileMenu onNavigate={closeDialog} />
          </div>
          <div className="hidden xl:block">
            <OverlayMenu onNavigate={closeDialog} />
          </div>
        </Container>
      </dialog>
    </header>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";

import { TodoBadge } from "@/components/ui/TodoBadge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { OverlayMenu } from "./OverlayMenu";
import Image from "next/image";
export function Navbar() {
  const pathname = usePathname();

  const [menu, setMenu] = useState<"Services" | "Sectors" | null>(null);
  const header = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const pendingFocus = useRef<"first" | "last" | null>(null);
  useEffect(() => {
    if (!menu || !pendingFocus.current) return;
    const links = document.querySelectorAll<HTMLAnchorElement>(
      "#mega-menu [data-menu-link]",
    );
    (pendingFocus.current === "last"
      ? links[links.length - 1]
      : links[0]
    )?.focus();
    pendingFocus.current = null;
  }, [menu]);
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
      ref={header}className="fixed start-3 end-3 top-3 z-50 rounded-[2.5rem] border-2 border-[#A3201A] bg-paper/95 text-ink shadow-[0_0_0_4px_rgba(163,32,26,0.12),0_0_28px_rgba(163,32,26,0.28),0_16px_40px_-8px_rgba(163,32,26,0.55)] backdrop-blur-md sm:start-5 sm:end-5"
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
      <div className="flex min-h-20 w-full items-center justify-between gap-2 px-5 sm:gap-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/media/images/dodzel-logo.jpeg"
            alt="Dodzel"
            width={160}
            height={160}
            priority
            className="h-14 w-auto sm:h-16"
          />
          <span className="sr-only">Dodzel home</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center xl:flex"
          onKeyDown={(event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
              return;
            event.preventDefault();
            const controls = Array.from(
              event.currentTarget.querySelectorAll<HTMLElement>("a,button"),
            );
            const index = controls.indexOf(
              document.activeElement as HTMLElement,
            );
            const rtl =
              getComputedStyle(event.currentTarget).direction === "rtl";
            const forward = event.key === (rtl ? "ArrowLeft" : "ArrowRight");
            const next =
              event.key === "Home"
                ? 0
                : event.key === "End"
                  ? controls.length - 1
                  : (index + (forward ? 1 : -1) + controls.length) %
                    controls.length;
            controls[next]?.focus();
          }}
        >
          {navLinks.map((link) => (
            <div key={link.href} className="flex items-center gap-1">
              <Link
                href={link.href}
                onClick={() => setMenu(null)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-3 text-sm transition-colors hover:bg-surface hover:text-accent-on-light",
                  (
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href)
                  )
                    ? "bg-surface-dark text-on-dark shadow-md"
                    : "text-ink",
                )}
              >
                {link.label}
              </Link>
              {(link.label === "Services" || link.label === "Sectors") && (
                <button
                  data-menu={link.label}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown" && event.key !== "ArrowUp")
                      return;
                    event.preventDefault();
                    pendingFocus.current =
                      event.key === "ArrowUp" ? "last" : "first";
                    setMenu(link.label as "Services" | "Sectors");
                  }}
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
                  className="grid min-h-11 min-w-11 place-items-center"
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
            className="min-h-11 gap-2 px-3 text-xs sm:gap-4 sm:px-5 sm:text-sm [&>svg]:hidden sm:[&>svg]:block"
          >
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Request a Quote</span>
          </Button>
          <button
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-controls="navigation-dialog"
            onClick={() => {
              setMenu(null);
              dialog.current?.showModal();
            }}
            className="grid h-11 w-11 place-items-center rounded-full border border-line"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
      {menu && (
        <div id="mega-menu" className="overflow-hidden rounded-b-[2.5rem]">
          <MegaMenu kind={menu} onNavigate={() => setMenu(null)} />
        </div>
      )}
      <dialog
        data-tone="dark"
        ref={dialog}
        id="navigation-dialog"
        aria-labelledby="navigation-title"
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto overscroll-contain bg-surface-dark text-on-dark backdrop:bg-surface-dark/80"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeDialog();
            return;
          }
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
              className="grid h-12 w-12 place-items-center rounded-full border border-line"
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

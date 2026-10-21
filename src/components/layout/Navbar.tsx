"use client";

import Link from "next/link";
import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { navLinks } from "@/lib/nav";
import { observeLoaderScroll } from "@/lib/loader-scroll";
import { observeNavigationLenis, setNavigationScrollLocked } from "@/lib/navigation-scroll";
import { BrandLogo } from "./BrandLogo";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

gsap.registerPlugin(useGSAP);
type Dropdown = "Services" | "Sectors";

function ToggleIcon({ open }: { open: boolean }) {
  return <span aria-hidden="true" data-open={open} className="header-toggle relative block size-6"><span /><span /></span>;
}
function QuoteLink({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  return <Link href="/request-a-quote" onClick={onNavigate} data-header-quote className={`group inline-flex h-11 shrink-0 whitespace-nowrap items-center justify-center gap-3 rounded-[0.25rem] bg-brand px-5 min-[1100px]:max-xl:px-3 font-heading text-sm font-semibold leading-none text-white transition-colors duration-150 hover:bg-brand-hover hover:text-white focus-visible:outline-brand-glow ${mobile ? "w-full" : ""}`}>
    Request a Quote <span className="grid size-6 place-items-center bg-white/15"><ArrowUpRight size={17} aria-hidden="true" className="transition-transform duration-150 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none" /></span>
  </Link>;
}

export function Navbar() {
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<"first" | "last" | null>(null);
  const ignoreFocus = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const open = useRef(false);
  const motion = useRef<{ update: (y: number) => void; show: () => void } | null>(null);
  const [menuState, setMenuState] = useState<{ kind: Dropdown; path: string } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menu = menuState?.path === pathname ? menuState.kind : null;
  const cancelClose = () => clearTimeout(closeTimer.current);
  const openMenu = (kind: Dropdown) => { cancelClose(); setMenuState({ kind, path: pathname }); motion.current?.show(); };
  const closeDialog = () => dialog.current?.close();
  const closeMenu = () => { cancelClose(); setMenuState(null); };

  useGSAP(() => {
    const element = header.current!;
    let lastY = window.scrollY;
    let readScroll: (y: number) => void = () => {};
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width:1100px)", mobile: "(max-width:1099px)", reduced: "(prefers-reduced-motion:reduce)" }, (context) => {
      const desktop = !!context.conditions?.desktop, reduced = !!context.conditions?.reduced;
      let compact = window.scrollY > 40;
      const shrink = gsap.timeline({ paused: true })
        .to(document.documentElement, { "--site-header-height": "68px", duration: 0.3, ease: "power2.out" }, 0)
        .to(element, { "--header-icon-size": "36px", boxShadow: "0 8px 30px rgb(0 0 0 / 0.18)", duration: 0.3, ease: "power2.out" }, 0)
        .to("[data-header-glass]", { opacity: 1, duration: 0.3 }, 0);
      // Mobile already starts at 68px/36px; desktop starts at 80px/44px.
      if (!desktop) gsap.set(element, { "--header-icon-size": "36px" });
      const hide = gsap.to(element, { yPercent: -100, duration: 0.3, ease: "power3.inOut", paused: true });
      shrink.progress(compact ? 1 : 0);
      const show = () => { if (reduced) hide.progress(0).pause(); else hide.reverse(); };
      readScroll = (y) => {
        const nextCompact = y > 40;
        if (compact !== nextCompact) {
          compact = nextCompact;
          if (reduced) shrink.progress(compact ? 1 : 0).pause();
          else if (compact) shrink.play(); else shrink.reverse();
        }
        if (reduced || open.current || element.contains(document.activeElement) || y <= 120) show();
        else if (y > lastY + 1) hide.play();
        else if (y < lastY - 1) show();
        if (Math.abs(y - lastY) >= 1) lastY = y;
      };
      motion.current = { update: readScroll, show };
      readScroll(window.scrollY);
      return () => { motion.current = null; };
    }, header);
    let lenis: Lenis | null = null;
    const onLenis = (event: { scroll: number }) => readScroll(event.scroll);
    const stopLenis = observeNavigationLenis((value) => {
      lenis?.off("scroll", onLenis);
      lenis = value;
      lenis?.on("scroll", onLenis);
    });
    const onWindow = () => { if (!lenis) readScroll(window.scrollY); };
    window.addEventListener("scroll", onWindow, { passive: true });
    const stopLoader = observeLoaderScroll((locked) => { element.inert = locked; });
    return () => {
      window.removeEventListener("scroll", onWindow);
      lenis?.off("scroll", onLenis);
      stopLenis(); stopLoader(); cancelClose(); media.revert();
    };
  }, { scope: header });

  useGSAP(() => {
    open.current = !!menu || mobileOpen;
    if (open.current) motion.current?.show();
    if (menu) {
      gsap.from("[data-header-dropdown]", { opacity: 0, y: matchMedia("(prefers-reduced-motion:reduce)").matches ? 0 : 8, duration: matchMedia("(prefers-reduced-motion:reduce)").matches ? 0 : 0.18 });
      if (pendingFocus.current) {
        const links = header.current!.querySelectorAll<HTMLAnchorElement>("[data-header-dropdown] [data-menu-link]");
        (pendingFocus.current === "last" ? links[links.length - 1] : links[0])?.focus();
        pendingFocus.current = null;
      }
    }
  }, { scope: header, dependencies: [menu, mobileOpen], revertOnUpdate: true });

  useGSAP(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setNavigationScrollLocked(true);
    if (!matchMedia("(prefers-reduced-motion:reduce)").matches) gsap.from("[data-mobile-row]", { y: 24, opacity: 0, duration: 0.45, stagger: 0.06, ease: "power3.out" });
    return () => { document.body.style.overflow = previous; setNavigationScrollLocked(false); };
  }, { scope: header, dependencies: [mobileOpen], revertOnUpdate: true });

  useEffect(() => {
    dialog.current?.close();
    motion.current?.show();
  }, [pathname]);
  useEffect(() => {
    const desktop = matchMedia("(min-width:1100px)");
    const resize = () => { if (desktop.matches) dialog.current?.close(); else setMenuState(null); };
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setMenuState(null); };
    desktop.addEventListener("change", resize);
    document.addEventListener("pointerdown", outside);
    return () => { desktop.removeEventListener("change", resize); document.removeEventListener("pointerdown", outside); };
  }, []);

  return (
    <header ref={header} data-site-header className="site-header on-light fixed inset-x-0 top-0 z-[1000] isolate border-b border-line text-ink"
      onFocusCapture={() => motion.current?.show()}
      onPointerEnter={cancelClose}
      onPointerLeave={() => { cancelClose(); closeTimer.current = setTimeout(() => { if (!header.current?.contains(document.activeElement)) setMenuState(null); }, 120); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenu(); }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !menu) return;
        event.preventDefault();
        ignoreFocus.current = true;
        header.current?.querySelector<HTMLButtonElement>(`[data-menu="${menu}"]`)?.focus();
        ignoreFocus.current = false;
        closeMenu();
      }}>
      <div data-header-glass aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-paper opacity-100" />
        <div className="mx-auto w-full relative grid h-full max-w-site grid-cols-[1fr_auto] items-center gap-2 px-[var(--gutter)] lg:px-[var(--gutter)] min-[1100px]:grid-cols-[auto_1fr_auto] min-[1100px]:gap-0">
        <BrandLogo onNavigate={closeMenu} />
        <nav aria-label="Primary" onKeyDown={(event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const controls = [...event.currentTarget.querySelectorAll<HTMLElement>("a,button")];
          const index = controls.indexOf(document.activeElement as HTMLElement);
          const forward = event.key === "ArrowRight";
          controls[event.key === "Home" ? 0 : event.key === "End" ? controls.length - 1 : (index + (forward ? 1 : -1) + controls.length) % controls.length]?.focus();
        }} className="hidden h-full items-center justify-self-center gap-4 whitespace-nowrap font-body min-[1100px]:flex xl:gap-6">
          {navLinks.map((link) => {
            const dropdown = link.label === "Services" || link.label === "Sectors" ? link.label : null;
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return <div key={link.href} className="relative flex h-full shrink-0 items-center gap-1 min-[1100px]:max-xl:gap-0"
              onPointerEnter={(event) => { if (dropdown && event.pointerType !== "touch") openMenu(dropdown); }}
              onFocus={() => { if (dropdown && !ignoreFocus.current) openMenu(dropdown); }}>
              <Link href={link.href} onClick={closeMenu} aria-current={active ? "page" : undefined} className="flex h-full items-center whitespace-nowrap text-sm font-medium leading-none text-ink transition-colors duration-150 hover:text-brand">{link.label}</Link>
              {dropdown && <button type="button" data-menu={dropdown} aria-label={`Open ${dropdown} menu`} aria-expanded={menu === dropdown} aria-controls="header-dropdown"
                onClick={() => openMenu(dropdown)} onKeyDown={(event) => { if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); pendingFocus.current = event.key === "ArrowUp" ? "last" : "first"; if (menu === dropdown) { const links = header.current!.querySelectorAll<HTMLAnchorElement>("[data-header-dropdown] [data-menu-link]"); (pendingFocus.current === "last" ? links[links.length - 1] : links[0])?.focus(); pendingFocus.current = null; } else openMenu(dropdown); } }}
                className="grid min-h-11 w-3.5 place-items-center text-ink hover:text-brand"><ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-150 motion-reduce:transition-none ${menu === dropdown ? "rotate-180" : ""}`} /></button>}
              {active && <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />}
            </div>;
          })}
        </nav>
        <div className="hidden justify-self-end min-[1100px]:block"><QuoteLink /></div>
        <button ref={trigger} type="button" aria-label="Open navigation menu" aria-expanded={mobileOpen} aria-controls="navigation-dialog" aria-haspopup="dialog"
          onClick={() => { closeMenu(); motion.current?.show(); dialog.current?.showModal(); setMobileOpen(true); }} className="grid size-11 place-items-center justify-self-end text-ink min-[1100px]:hidden"><ToggleIcon open={mobileOpen} /></button>
        {menu && <div id="header-dropdown" data-header-dropdown onPointerEnter={cancelClose} className="absolute inset-x-[var(--gutter)] top-full hidden pt-2 min-[1100px]:block"><MegaMenu kind={menu} onNavigate={closeMenu} /></div>}
      </div>
      <dialog ref={dialog} id="navigation-dialog" aria-label="Primary navigation menu" data-tone="dark" className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 on-navy bg-surface-dark text-white backdrop:bg-surface-dark"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button, summary, input, select, textarea, [tabindex="0"]')].filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && !element.hasAttribute("disabled");
          });
          const first = controls[0], last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}
        onCancel={(event) => { event.preventDefault(); closeDialog(); }}
        onClose={() => { setMobileOpen(false); trigger.current?.focus(); }}>
          <div className="mx-auto w-full flex h-full max-w-site flex-col px-[var(--gutter)] lg:px-[var(--gutter)]">
          <div className="flex h-[68px] shrink-0 items-center justify-between"><BrandLogo onNavigate={closeDialog} /><button type="button" aria-label="Close navigation menu" aria-expanded={mobileOpen} onClick={closeDialog} className="grid size-11 place-items-center"><ToggleIcon open={mobileOpen} /></button></div>
          <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-6"><MobileMenu onNavigate={closeDialog} /></div>
          <div className="shrink-0 py-6"><QuoteLink mobile onNavigate={closeDialog} /></div>
        </div>
      </dialog>
    </header>
  );
}

"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { BRAND_TAGLINE } from "@/lib/constants";
import { setLoaderScrollLocked } from "@/lib/loader-scroll";

gsap.registerPlugin(useGSAP);

const MIN_DURATION_MS = 3000;
const INTRO_SECONDS = 1.8;
const HOLD_SECONDS = 0.5;
const SESSION_KEY = "dodzel_loader_seen";
const DEFAULT_TAGLINE = BRAND_TAGLINE;

export function Loader({ tagline = DEFAULT_TAGLINE }: { tagline?: string }) {
  const overlay = useRef<HTMLDivElement>(null);
  const [finished, setFinished] = useState(false);
  const isStudio = usePathname().startsWith("/studio");

  useGSAP((_context, contextSafe) => {
    const element = overlay.current;
    if (isStudio || !element || !contextSafe) return;

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "true") {
        element.style.display = "none";
        return;
      }
    } catch { /* Storage is optional when browser privacy settings block it. */ }

    const started = performance.now();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setLoaderScrollLocked(true);
    let disposed = false;
    let released = false;
    let introComplete = false;
    let loaded = document.readyState === "complete";
    let exitStarted = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const release = () => {
      if (released) return;
      released = true;
      document.body.style.overflow = previousOverflow;
      setLoaderScrollLocked(false);
    };
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const letters = element.querySelectorAll("[data-loader-letter]");
    const title = element.querySelector("[data-loader-title]");
    const taglineElement = element.querySelector("[data-loader-tagline]");
    const spinner = element.querySelector("[data-loader-spinner]");
    const content = element.querySelector("[data-loader-content]");
    const timeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        try { sessionStorage.setItem(SESSION_KEY, "true"); } catch { /* Optional storage. */ }
        release();
        setFinished(true);
      },
    });
    const resumeWhenReady = contextSafe(() => {
      if (disposed || exitStarted || !introComplete || !loaded) return;
      clearTimeout(timer);
      timer = setTimeout(contextSafe(() => {
        if (disposed) return;
        exitStarted = true;
        timeline.play();
      }), Math.max(0, MIN_DURATION_MS - (performance.now() - started)));
    });

    if (reduced.matches) {
      timeline.from(content, { opacity: 0, duration: 0.2 });
    } else {
      timeline.to(letters, {
        opacity: 1, color: "#ffffff", filter: "blur(0px)", x: 0,
        duration: 0.5, stagger: { each: 0.12, from: "edges" }, ease: "power2.out",
      }, 0.7);
    }
    timeline.addPause(INTRO_SECONDS + HOLD_SECONDS, () => {
      introComplete = true;
      resumeWhenReady();
    });
    timeline.addLabel("exit");
    if (reduced.matches) {
      timeline.to(element, { opacity: 0, duration: 0.15 }, "exit");
    } else {
      timeline
        .to(taglineElement, { opacity: 0, y: 8, duration: 0.3, ease: "power2.in" }, "exit")
        .to(title, { y: 20, letterSpacing: "0.7em", duration: 0.4, ease: "power2.inOut" }, "exit+=0.1")
        .to(letters, { opacity: 0.3, filter: "blur(3px)", duration: 0.2, stagger: 0.05 }, "exit+=0.1")
        .to(spinner, { opacity: 0, duration: 0.2 }, "exit+=0.25")
        .to(element, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "exit+=0.4");
    }

    const onLoad = () => { loaded = true; resumeWhenReady(); };
    if (!loaded) window.addEventListener("load", onLoad, { once: true });

    // Keep the overlay painted while waiting for the heading and body fonts.
    const begin = contextSafe(() => { if (!disposed) timeline.play(0); });
    const titleFont = getComputedStyle(element.querySelector("[data-loader-title]")!).fontFamily;
    const bodyFont = getComputedStyle(taglineElement!).fontFamily;
    void Promise.all([
      document.fonts.load(`700 2rem ${titleFont}`, "DODZEL"),
      document.fonts.load(`600 1rem ${bodyFont}`, tagline),
    ]).then(begin, begin);

    return () => {
      disposed = true;
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      release();
    };
  }, { scope: overlay, dependencies: [isStudio], revertOnUpdate: true });

  if (isStudio || finished) return null;

  return (
    <div ref={overlay} role="status" aria-live="polite" aria-atomic="true"
      className="on-dark fixed inset-0 z-[2147483647] flex touch-none items-center justify-center overscroll-none bg-[var(--loader-bg)] px-6 text-white font-body">
      <span className="sr-only">Loading</span>
      <div data-loader-content aria-hidden="true" className="flex flex-col items-center gap-8 text-center">
        <div data-loader-spinner className="size-[clamp(36px,5vw,54px)] animate-spin rounded-full border-4 border-surface border-t-brand [animation-duration:1s] motion-reduce:animate-none" />
        <div data-loader-title className="whitespace-nowrap text-[clamp(1.5rem,5vw,4rem)] font-heading font-bold leading-tight tracking-[0.5em]">
          {Array.from("DODZEL").map((letter, index) => (
            <span key={index} data-loader-letter
              className="inline-block text-[#a3b0ce] opacity-25 blur-[2px] [transform:translateX(2px)] motion-reduce:[transform:none] motion-reduce:text-white motion-reduce:opacity-100 motion-reduce:blur-none">{letter}</span>
          ))}
        </div>
        <p data-loader-tagline className="text-[clamp(0.875rem,1.6vw,1.125rem)] font-body font-semibold">{tagline}</p>
      </div>
    </div>
  );
}

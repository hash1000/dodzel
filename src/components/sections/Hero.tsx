"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { getHeadingWords } from "@/lib/heading-words";
import { HERO_TRANSITION, SLIDE_HOLD_MS } from "@/lib/hero-slider";
import { observeLoaderScroll } from "@/lib/loader-scroll";

import slider1 from "../../../public/assets/images/slider-1.jpeg";
import slider2 from "../../../public/assets/images/slider-2.jpeg";
import slider3 from "../../../public/assets/images/slider-3.jpeg";
import slider4 from "../../../public/assets/images/slider-4.jpeg";
import slider5 from "../../../public/assets/images/slider-5.jpeg";
import slider6 from "../../../public/assets/images/slider-6.jpeg";
import slider7 from "../../../public/assets/images/slider-7.jpeg";

gsap.registerPlugin(useGSAP);

const slides = [
  { image: slider1, label: "Industrial infrastructure", position: "60% center" },
  { image: slider2, label: "Structural engineering", position: "60% center" },
  { image: slider3, label: "Fabrication capabilities", position: "65% center" },
  { image: slider4, label: "People behind the progress", position: "60% center" },
  { image: slider5, label: "Construction in focus", position: "65% center" },
  { image: slider6, label: "Working together on site", position: "65% center" },
  { image: slider7, label: "night shift", position: "65% center" },
];
const heroHeading = "Build a better tomorrow";

type SliderActions = {
  select: (index: number) => void;
  step: (direction: 1 | -1) => void;
  togglePause: () => void;
  hover: (value: boolean) => void;
  focus: (value: boolean) => void;
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const actions = useRef<SliderActions | null>(null);
  const swipe = useRef<{ x: number; y: number; id: number } | null>(null);
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [manualNavigation, setManualNavigation] = useState(false);

  useGSAP((_context, contextSafe) => {
    if (!contextSafe) return;
    const section = ref.current!;
    const panels = [...section.querySelectorAll<HTMLElement>("[data-slide-panel]")];
    const images = [...section.querySelectorAll<HTMLElement>("[data-slide-image]")];
    const shades = [...section.querySelectorAll<HTMLElement>("[data-slide-shade]")];
    const progress = [...section.querySelectorAll<HTMLElement>("[data-hero-progress]")];
    const heading = section.querySelector("h1")!;
    const subtext = section.querySelector("[data-hero-subtext]")!;
    const policy = matchMedia("(prefers-reduced-motion: reduce)");
    let current = 0, animating = false, hover = false, focus = false;
    let userPaused = policy.matches, loaderReady = false, introDone = false;
    let started = false, disposed = false, frame = 0;
    const bounds = section.getBoundingClientRect();
    let visible = bounds.bottom > 0 && bounds.top < innerHeight;
    let hold: gsap.core.Tween | undefined;
    let transition: gsap.core.Timeline | undefined;
    let kenBurns: gsap.core.Tween | undefined;
    setPaused(userPaused);

    const canPlayHold = () => loaderReady && introDone && !animating && !userPaused && !hover && !focus && visible && !document.hidden;
    const syncPlayback = () => {
      hold?.paused(!canPlayHold());
      const offscreen = !visible || document.hidden || !loaderReady;
      transition?.paused(offscreen);
      if (started && !introDone) intro.paused(offscreen);
      kenBurns?.paused(offscreen);
    };
    const resetProgress = () => { hold?.kill(); gsap.set(progress, { scaleX: 0 }); };

    const startHold = contextSafe(() => {
      resetProgress();
      hold = gsap.to(progress[current], {
        scaleX: 1, duration: SLIDE_HOLD_MS / 1000, ease: "none", paused: true,
        onComplete: () => navigate((current + 1) % slides.length, 1, false),
      });
      syncPlayback();
    });

    const navigate = contextSafe((index: number, direction: 1 | -1, manual: boolean) => {
      const next = (index + slides.length) % slides.length;
      if (disposed || animating || !introDone || !loaderReady || next === current) return;
      animating = true;
      setIsAnimating(true);
      setManualNavigation(manual);
      setDisplayed(next);
      resetProgress();
      kenBurns?.kill();
      const previous = current;
      const timing = HERO_TRANSITION;
      gsap.set(panels[previous], { zIndex: 1 });
      gsap.set(panels[next], { autoAlpha: 1, zIndex: 2, xPercent: 0 });
      gsap.set(images[next], { xPercent: 0, scale: 1 });
      transition = gsap.timeline({
        onComplete: () => {
          gsap.set(panels[previous], { autoAlpha: 0, xPercent: 0, zIndex: 0 });
          gsap.set(images[previous], { xPercent: 0, scale: 1 });
          gsap.set(shades[previous], { opacity: 0 });
          gsap.set(panels[next], { autoAlpha: 1, xPercent: 0, zIndex: 1 });
          current = next;
          setActive(next);
          setDisplayed(next);
          animating = false;
          setIsAnimating(false);
          startHold();
        },
      });
      if (policy.matches) {
        transition.fromTo(panels[next], { opacity: 0 }, { opacity: 1, duration: timing.reducedFade, ease: "none" });
      } else {
        transition
          .to([heading, subtext], { opacity: 0, x: -direction * timing.textOutOffset, duration: timing.textOut, ease: "power2.in" }, 0)
          .fromTo(panels[next], { xPercent: direction * 100 }, { xPercent: 0, duration: timing.slideDuration, ease: "power3.out" }, timing.panelStart)
          .fromTo(images[next], { scale: timing.incomingScale }, { scale: 1, duration: timing.slideDuration, ease: "power3.out" }, timing.panelStart)
          .to(images[previous], { xPercent: -direction * timing.parallaxPercent, duration: timing.slideDuration, ease: "power3.out" }, timing.panelStart)
          .to(shades[previous], { opacity: timing.outgoingDimOpacity, duration: timing.slideDuration, ease: "power3.out" }, timing.panelStart)
          .set([heading, subtext], { x: 0, y: timing.textInOffset, opacity: 0 }, timing.textInStart)
          .to(heading, { opacity: 1, y: 0, duration: timing.textInDuration, ease: "power3.out" }, timing.textInStart)
          .to(subtext, { opacity: 1, y: 0, duration: timing.textInDuration, ease: "power3.out" }, timing.textInStart + timing.subtextDelay);
      }
      syncPlayback();
    });

    const intro = gsap.timeline({ paused: true, onComplete: () => { introDone = true; setReady(true); startHold(); } });
    if (policy.matches) {
      intro.from("[data-hero-copy]", { opacity: 0, duration: 0.25 });
    } else {
      kenBurns = gsap.fromTo(images[0], { scale: 1.08 }, { scale: 1, duration: 8, ease: "power1.out", paused: true });
      intro
        .from("[data-hero-word]", { y: 30, opacity: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.15)
        .from("[data-hero-detail]", { y: 20, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, 0.65)
        .from("[data-hero-stripe]", { scaleY: 0, transformOrigin: "top", duration: 1, ease: "power2.inOut" }, 0.1);
    }
    const begin = contextSafe(() => {
      if (disposed) return;
      loaderReady = true;
      if (!started) { started = true; intro.play(); kenBurns?.play(); }
      syncPlayback();
    });
    const unsubscribe = observeLoaderScroll((locked) => {
      cancelAnimationFrame(frame);
      if (locked) { loaderReady = false; syncPlayback(); }
      else frame = requestAnimationFrame(begin);
    });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncPlayback(); }, { threshold: 0.1 });
    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);
    const onMotionChange = () => {
      if (policy.matches) {
        userPaused = true;
        setPaused(true);
        transition?.progress(1);
        kenBurns?.progress(1).pause();
        if (started) intro.progress(1);
      }
      syncPlayback();
    };
    policy.addEventListener("change", onMotionChange);
    actions.current = {
      select: (index) => navigate(index, index > current ? 1 : -1, true),
      step: (direction) => navigate(current + direction, direction, true),
      togglePause: () => { userPaused = !userPaused; setPaused(userPaused); syncPlayback(); },
      hover: (value) => { hover = value; syncPlayback(); },
      focus: (value) => { focus = value; syncPlayback(); },
    };
    return () => {
      disposed = true;
      actions.current = null;
      cancelAnimationFrame(frame);
      unsubscribe();
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      policy.removeEventListener("change", onMotionChange);
      hold?.kill(); transition?.kill(); intro.kill(); kenBurns?.kill();
    };
  }, { scope: ref });

  return (
    <section
      ref={ref}
      data-tone="dark"
      data-hero-carousel data-active-slide={active} data-transitioning={isAnimating}
      role="region" aria-roledescription="carousel" aria-live={manualNavigation ? "polite" : "off"}
      aria-label="Dodzel Engineering introduction"
      className="relative isolate flex min-h-dvh flex-col overflow-hidden pt-[var(--site-header-height)] on-dark bg-ink text-white [--color-focus:var(--color-brand)] md:block"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") actions.current?.hover(true); }}
      onPointerLeave={() => actions.current?.hover(false)}
      onFocusCapture={() => actions.current?.focus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) actions.current?.focus(false);
      }}
    >
      {/* Both layers share the same diagonal; the 5px offset exposes the stripe. */}
      <div data-hero-stripe aria-hidden="true" className="absolute right-0 bottom-0 top-[var(--site-header-height)] hidden w-[55%] bg-brand [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)] md:block" />
      <div
        onPointerDown={(event) => {
          if (!event.isPrimary || event.pointerType === "mouse") return;
          swipe.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          const start = swipe.current;
          swipe.current = null;
          if (!start || start.id !== event.pointerId) return;
          const dx = event.clientX - start.x, dy = event.clientY - start.y;
          if (Math.abs(dx) >= HERO_TRANSITION.swipeThreshold && Math.abs(dx) > Math.abs(dy) * 1.3) actions.current?.step(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => { swipe.current = null; }}
        className="relative touch-pan-y h-[50svh] shrink-0 overflow-hidden [clip-path:polygon(0_0,100%_0,100%_90%,0_100%)] md:absolute md:bottom-0 md:top-[var(--site-header-height)] md:right-[-5px] md:h-auto md:w-[55%] md:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
        <div data-hero-image className="absolute inset-0 isolate overflow-hidden">
          {slides.map((slide, index) => (
            <div key={slide.label} data-slide-panel role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slide.label}`} aria-hidden={displayed !== index}
              className="absolute inset-0 overflow-hidden bg-ink will-change-transform"
              style={{ opacity: index === 0 ? 1 : 0, visibility: index === 0 ? "visible" : "hidden", zIndex: index === 0 ? 1 : 0 }}>
              <div data-slide-image className="absolute inset-0 will-change-transform">
              <Image
                src={slide.image}
                alt=""
                fill
                preload={index === 0}
                loading={index === 0 ? undefined : "eager"}
                fetchPriority={index === 0 ? undefined : "low"}
                sizes="(min-width: 768px) 55vw, 100vw"
                placeholder="blur"
                className="object-cover"
                style={{ objectPosition: slide.position }}
              />
              </div>
              <div data-slide-shade aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black opacity-0" />
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-r from-ink/15 to-transparent" />
      </div>
      <div data-hero-copy className="relative flex flex-col justify-center pl-[max(var(--gutter),calc((100vw-var(--page-max-width))/2+var(--gutter)))] pr-[var(--gutter)] pb-12 pt-8 md:min-h-[calc(100dvh-var(--site-header-height))] md:w-[45%] md:pb-12 md:pt-36">
        <div data-hero-detail aria-hidden="true" className="mb-7 h-1 w-12 bg-brand" />
        <h1 aria-label={heroHeading} className="font-heading font-bold uppercase tracking-[-0.02em]">
          {getHeadingWords(heroHeading).map(({ text, highlighted }, index) => (
            <span key={index} className="inline-block overflow-hidden align-top"><span data-hero-word aria-hidden="true" className={highlighted ? "inline-block text-brand" : "inline-block"}>{text}</span><span aria-hidden="true">&nbsp;</span></span>
          ))}
        </h1>
        <p data-hero-detail data-hero-subtext className="mt-8 max-w-[44ch] text-lead uppercase text-[var(--fg-body)]">
          Dodzel delivers engineering, procurement and construction for the infrastructure that moves industries forward.
        </p>
        <div data-hero-detail className="mt-8 flex flex-wrap gap-3">
          <Button href="/request-a-quote" className="border-brand bg-brand text-white hover:border-brand hover:bg-brand/85">Request a Quote</Button>
          <Button href="/services" variant="outline" className="border-white/20 text-white hover:border-white/60">Explore our services</Button>
        </div>
        <div data-hero-detail className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Background slideshow controls">
          <span className="me-2 text-xs tabular-nums"><span className="text-white">{String(displayed + 1).padStart(2, "0")}</span><span className="px-2 text-[var(--fg-muted)]">/</span>{String(slides.length).padStart(2, "0")}</span>
          <div className="flex gap-1">
            {slides.map((slide, index) => (
              <button key={slide.label} type="button" disabled={!ready} aria-disabled={isAnimating} onClick={() => actions.current?.select(index)} aria-label={`Show image ${index + 1}: ${slide.label}`} aria-pressed={displayed === index} className="group flex min-h-11 w-4 items-center lg:w-5">
                <span className={`relative h-0.5 w-full overflow-hidden ${displayed === index ? "bg-brand" : "bg-white/35 group-hover:bg-white"}`}><span data-hero-progress className="absolute inset-0 origin-left [transform:scaleX(0)] bg-white" /></span>
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            <button type="button" disabled={!ready} aria-disabled={isAnimating} onClick={() => actions.current?.step(-1)} aria-label="Previous background image" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-brand"><ArrowLeft size={16} aria-hidden="true" /></button>
            <button type="button" onClick={() => actions.current?.togglePause()} aria-label={paused ? "Play slideshow" : "Pause slideshow"} aria-pressed={paused} className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-brand">{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>
            <button type="button" disabled={!ready} aria-disabled={isAnimating} onClick={() => actions.current?.step(1)} aria-label="Next background image" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-brand"><ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useMediaPolicy } from "@/lib/use-media-policy";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import slider1 from "../../../public/assets/images/slider-1.jpeg";
import slider2 from "../../../public/assets/images/slider-2.jpeg";
import slider3 from "../../../public/assets/images/slider-3.jpeg";
import slider4 from "../../../public/assets/images/slider-4.jpeg";
import slider5 from "../../../public/assets/images/slider-5.jpeg";
import slider6 from "../../../public/assets/images/slider-6.jpeg";

const slides = [
  { image: slider1, label: "Industrial infrastructure", position: "60% center" },
  { image: slider2, label: "Structural engineering", position: "60% center" },
  { image: slider3, label: "Fabrication capabilities", position: "65% center" },
  { image: slider4, label: "People behind the progress", position: "60% center" },
  { image: slider5, label: "Construction in focus", position: "65% center" },
  { image: slider6, label: "Working together on site", position: "65% center" },
];
const duration = 7000;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const { reduced } = useMediaPolicy();
  const autoplay = !reduced && !paused && !focused && visible;

  function select(index: number) {
    setActive((index + slides.length) % slides.length);
  }

  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => {
      setActive((index) => (index + 1) % slides.length);
    }, duration);
    return () => clearTimeout(timer);
  }, [autoplay, active]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && document.visibilityState === "visible");
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    const sync = () => setVisible(document.visibilityState === "visible" && (ref.current?.getBoundingClientRect().bottom ?? 0) > 0);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <section
      ref={ref}
      data-tone="dark"
      aria-label="Dodzel Engineering introduction"
      className="relative isolate min-h-dvh overflow-hidden bg-surface-dark text-on-dark"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        {slides.map((slide, index) => (
          <div key={slide.label} className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${active === index ? "opacity-100" : "opacity-0"}`}>
            <Image
              src={slide.image}
              alt=""
              fill
              preload={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              sizes="100vw"
              placeholder="blur"
              className="object-cover"
              style={{ objectPosition: slide.position }}
            />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,24,44,0.94)_0%,rgba(7,24,44,0.76)_42%,rgba(7,24,44,0.22)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(7,24,44,0.92)_0%,transparent_45%)]" />
      <Container className="flex min-h-dvh flex-col pb-24 pt-32 sm:pt-36">
        <div className="flex flex-1 items-center py-6 lg:py-8">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-on-dark-muted sm:text-xs">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Engineering. Construction. Commitment.
            </p>
            <h1 className="text-[clamp(3rem,6.5vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
              Engineering<br />
              progress.<br />
              <span className="text-accent">Building trust.</span>
            </h1>
            <p className="mt-7 max-w-[43ch] text-base leading-relaxed text-on-dark-muted sm:text-lg">
              Engineering, procurement and construction for the infrastructure that moves industries forward.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Button href="/services" className="min-h-14 px-6">Explore our services</Button>
              <Button href="/projects" variant="outline" className="min-h-14 border-white/40 px-6 hover:bg-white/10">View our projects</Button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-6 border-t border-white/20 pt-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-[0.65rem] uppercase tracking-[0.2em] text-accent">Our presence</p>
            <p className="text-xs leading-relaxed text-on-dark-muted sm:text-sm">Pakistan <span className="px-1 text-white/40">/</span> Qatar <span className="px-1 text-white/40">/</span> Saudi Arabia <span className="px-1 text-white/40">/</span> Iraq</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1" role="group" aria-label="Background slideshow controls">
            <span className="text-xs tabular-nums"><span className="text-accent">0{active + 1}</span><span className="px-2 text-white/40">/</span>06</span>
            <div className="flex gap-1">
              {slides.map((slide, index) => (
                <button key={slide.label} type="button" onClick={() => select(index)} aria-label={`Show image ${index + 1}: ${slide.label}`} aria-pressed={active === index} className="group flex min-h-11 w-5 items-center sm:w-7">
                  <span className={`h-0.5 w-full transition-colors ${active === index ? "bg-accent" : "bg-white/35 group-hover:bg-white"}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <button type="button" onClick={() => select(active - 1)} aria-label="Previous background image" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-colors hover:border-accent hover:text-accent"><ArrowLeft size={16} aria-hidden="true" /></button>
              <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} aria-pressed={paused} className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-colors hover:border-accent hover:text-accent">{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>
              <button type="button" onClick={() => select(active + 1)} aria-label="Next background image" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 transition-colors hover:border-accent hover:text-accent"><ArrowRight size={16} aria-hidden="true" /></button>
            </div>
          </div>
          <a href="#intent" className="hidden min-h-11 items-center gap-3 text-xs text-on-dark-muted transition-colors hover:text-accent xl:inline-flex">Explore Dodzel <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </Container>
    </section>
  );
}

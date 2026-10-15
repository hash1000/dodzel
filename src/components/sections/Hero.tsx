"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useMediaPolicy } from "@/lib/use-media-policy";
import { Container } from "@/components/ui/Container";
import slider1 from "../../../public/assets/images/slider-1.jpeg";
import slider2 from "../../../public/assets/images/slider-2.jpeg";
import slider3 from "../../../public/assets/images/slider-3.jpeg";
import slider4 from "../../../public/assets/images/slider-4.jpeg";
import slider5 from "../../../public/assets/images/slider-5.jpeg";
import slider6 from "../../../public/assets/images/slider-6.jpeg";
import slider7 from "../../../public/assets/images/slider-7.jpeg";

const slides = [
  { image: slider1, label: "Industrial infrastructure", position: "60% center" },
  { image: slider2, label: "Structural engineering", position: "60% center" },
  { image: slider3, label: "Fabrication capabilities", position: "65% center" },
  { image: slider4, label: "People behind the progress", position: "60% center" },
  { image: slider5, label: "Construction in focus", position: "65% center" },
  { image: slider6, label: "Working together on site", position: "65% center" },
  { image: slider7, label: "night shift", position: "65% center" },
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
      <Container className="flex min-h-dvh flex-col justify-center gap-8 pb-24 pt-32 sm:gap-10 sm:pt-40 lg:pt-48">
        <div className="w-full max-w-[760px] bg-[#123477]/90 px-7 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <h1 className="text-[clamp(2.5rem,4.5vw,5rem)] font-bold uppercase leading-[1.02] tracking-[-0.035em] text-white">
            Build a better<br />
            tomorrow
          </h1>
          <p className="mt-8 max-w-[44ch] text-base uppercase leading-[1.8] text-white sm:mt-10 sm:text-lg lg:text-xl">
            Dodzel delivers engineering, procurement and construction for the infrastructure that moves industries forward.
          </p>
        </div>
        <div className="flex w-full shrink-0 justify-center text-white">
          <div className="flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-white/15 bg-black/45 px-4 py-2 backdrop-blur-sm sm:rounded-full" role="group" aria-label="Background slideshow controls">
            <span className="text-xs tabular-nums"><span className="text-accent">0{active + 1}</span><span className="px-2 text-white/40">/</span>07</span>
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
        </div>
      </Container>
    </section>
  );
}

"use client";
import Image from "next/image";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown, Pause, Play } from "lucide-react";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TodoBadge } from "@/components/ui/TodoBadge";
export function Hero({ videoSrc }: { videoSrc?: string }) {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  const remaining = useRef(7000);
  useEffect(() => {
    remaining.current = 7000;
  }, [active]);
  const autoplay = !reduced && !hovered && !focused && !paused && visible;
  useEffect(() => {
    if (!autoplay) return;
    const started = performance.now();
    const timer = setTimeout(
      () => setActive((index) => (index + 1) % placeholders.hero.length),
      remaining.current,
    );
    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(
        0,
        remaining.current - (performance.now() - started),
      );
    };
  }, [autoplay, active]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    const page = () =>
      setVisible(
        document.visibilityState === "visible" &&
          (ref.current?.getBoundingClientRect().bottom ?? 0) > 0,
      );
    document.addEventListener("visibilitychange", page);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", page);
    };
  }, []);
  useEffect(() => {
    if (!video.current) return;
    if (!visible || paused) video.current.pause();
    else void video.current.play().catch(() => {});
  }, [visible, paused, reduced]);
  const firstMoment = useRef(true);
  useGSAP(
    () => {
      const first = firstMoment.current;
      firstMoment.current = false;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (first)
          gsap.fromTo(
            "[data-hero-media]",
            { scale: 1.06 },
            { scale: 1, duration: 1, ease: "power3.out" },
          );
        else
          gsap.fromTo(
            "[data-hero-text]",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [active], revertOnUpdate: true },
  );
  const slide = placeholders.hero[active];
  return (
    <section
      ref={ref}
      aria-label="Introduction"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-navy text-on-dark"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={placeholders.media.src}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover opacity-20"
        />
        {videoSrc && !reduced && (
          <video
            ref={video}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="metadata"
            poster={placeholders.media.src}
            className="h-full w-full object-cover"
          />
        )}
        <div className="hero-shade absolute inset-0" />
      </div>
      <Container className="relative pb-24 pt-40 sm:pt-48">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <p className="text-xs uppercase tracking-[0.18em] text-amber">
            Pakistan / Qatar / Saudi Arabia / Iraq
          </p>
          <TodoBadge />
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div data-hero-text className="min-h-[32rem]">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-dark">
              {slide.category}
            </p>
            <h1 className="whitespace-pre-line text-hero font-semibold leading-[1.06] tracking-tight">
              {slide.headline}
            </h1>
            <p className="mb-8 mt-6 max-w-lg text-base leading-relaxed text-muted-dark">
              {slide.description}
            </p>
            <Button href={slide.href}>{slide.cta}</Button>
          </div>
          <div data-hero-media className="flex items-center lg:ps-8">
            <MediaFrame priority blueprint className="w-full aspect-[4/3]" />
          </div>
        </div>
        <div className="mt-12 flex items-end justify-between gap-3 sm:gap-5 border-t border-dark-line pt-7">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex gap-4">
              {placeholders.hero.map((item, index) => (
                <button
                  key={item.headline}
                  onClick={() => setActive(index)}
                  aria-label={`0${index + 1} — Show slide ${index + 1}: ${item.category}`}
                  aria-pressed={active === index}
                  className="w-10 py-3 text-start sm:w-20"
                >
                  <span
                    className={
                      active === index ? "text-amber" : "text-muted-dark"
                    }
                  >
                    0{index + 1}
                  </span>
                  <span className="mt-3 block h-0.5 overflow-hidden bg-dark-line">
                    <span
                      key={`${active}-${index}`}
                      className={`block h-full bg-amber ${active === index ? "hero-progress" : "w-0"}`}
                      style={{
                        animationPlayState: autoplay ? "running" : "paused",
                        width: reduced && active === index ? "100%" : undefined,
                      }}
                    />
                  </span>
                </button>
              ))}
            </div>
            <button
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
              className="p-3"
            >
              {paused ? <Play size={18} /> : <Pause size={18} />}
            </button>
          </div>
          <a
            href="#intent"
            aria-label="Explore the homepage"
            className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-dark"
          >
            <span className="hidden sm:inline">Explore</span>{" "}
            <ArrowDown size={16} />
          </a>
        </div>
      </Container>
    </section>
  );
}

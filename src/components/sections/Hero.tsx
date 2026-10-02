"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Pause, Play } from "lucide-react";
import { real } from "@/content/real";
import { heroMedia } from "@/content/media";
import { loadBannerAnimations } from "@/lib/animations";
import { useMediaPolicy } from "@/lib/use-media-policy";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { StockBadge } from "@/components/ui/StockBadge";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ActiveVideo } from "@/components/ui/ActiveVideo";
export function Hero() {
  const ref = useRef<HTMLElement>(null),
    headline = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState(0),
    [previous, setPrevious] = useState<number | null>(null),
    [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false),
    [paused, setPaused] = useState(false),
    [visible, setVisible] = useState(true);
  const { reduced, videoAllowed, mobile } = useMediaPolicy();
  const [mediaReady, setMediaReady] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const ready = () => {
      timer = setTimeout(() => setMediaReady(true), 350);
    };
    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", ready);
    };
  }, []);
  const remaining = useRef(8000);
  const select = (index: number) => {
    if (index === active) return;
    setPrevious(active);
    setActive(index);
    remaining.current = 8000;
  };
  const autoplay = !reduced && !hovered && !focused && !paused && visible;
  useEffect(() => {
    if (!autoplay) return;
    const started = performance.now();
    const timer = setTimeout(() => {
      setPrevious(active);
      setActive((index) => (index + 1) % real.hero.length);
      remaining.current = 8000;
    }, remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(
        0,
        remaining.current - (performance.now() - started),
      );
    };
  }, [autoplay, active]);
  useEffect(() => {
    if (previous === null) return;
    const timer = setTimeout(() => setPrevious(null), 750);
    return () => clearTimeout(timer);
  }, [previous, active]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    const onPage = () =>
      setVisible(
        document.visibilityState === "visible" &&
          (ref.current?.getBoundingClientRect().bottom ?? 0) > 0,
      );
    document.addEventListener("visibilitychange", onPage);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onPage);
    };
  }, []);
  useEffect(() => {
    if (reduced || !mediaReady || !headline.current) return;
    let alive = true;
    let cleanup = () => {};
    const animate = async () => {
      const { gsap, SplitText } = await loadBannerAnimations();
      if (!alive || !headline.current) return;
      const split = SplitText.create(headline.current, { type: "words", wordsClass: "hero-word", aria: "auto" });
      const tween = gsap.fromTo(split.words, { y: 10 }, { y: 0, duration: .5, stagger: .025, ease: "power3.out" });
      cleanup = () => { tween.kill(); split.revert(); };
    };
    void animate();
    return () => { alive = false; cleanup(); };
  }, [active, reduced, mediaReady]);
  const asset = heroMedia[active],
    slide = real.hero[active],
    next = heroMedia[(active + 1) % heroMedia.length];
  const nextSource = next.sources.find((s) => s.mobile === mobile);
  return (
    <section
      ref={ref}
      data-tone="dark"
      aria-label="Introduction"
      aria-roledescription="carousel"
      className="relative isolate min-h-[48rem] overflow-hidden bg-surface-dark text-on-dark lg:min-h-[52rem]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div className="absolute inset-0 -z-20">
        {previous !== null && (
          <Image
            src={heroMedia[previous].srcset.at(-1)!.avif}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            aria-hidden="true"
          />
        )}
        <Image
          key={active}
          data-hero-poster
          src={asset.srcset.at(-1)!.avif}
          alt={asset.alt}
          fill
          preload={active === 0}
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={asset.blurDataURL}
          style={{
            objectPosition: `${asset.focal.x * 100}% ${asset.focal.y * 100}%`,
          }}
          className={`object-cover ${previous !== null ? "hero-poster-enter" : ""}`}
        />
        {videoAllowed && mediaReady && (
          <ActiveVideo
            key={`${active}-${mobile}`}
            asset={asset}
            mobile={mobile}
            paused={paused}
            visible={visible}
          />
        )}
        {videoAllowed && mediaReady && visible && !paused && nextSource && (
          <video
            key={`next-${nextSource.src}`}
            data-next-video
            className="hidden"
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={nextSource.src} type={nextSource.type} />
          </video>
        )}
      </div>
      <div
        aria-hidden="true"
        className="hero-shade pointer-events-none absolute inset-0 -z-10"
        style={{ opacity: asset.scrimStrength ?? .64 }}
      />
      <Container className="flex min-h-[48rem] flex-col justify-end pb-28 pt-36 lg:min-h-[52rem]">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <p className="text-xs uppercase tracking-[0.15em] text-accent">
            Pakistan / Qatar / Saudi Arabia / Iraq
          </p>
          <ReviewBadge confirm />
        </div>
        <div className="min-w-0 lg:max-w-[49%]">
          <p className="mb-4 text-xs uppercase tracking-widest text-on-dark-muted">
            {slide.category}
          </p>
          <h1
            key={active}
            ref={headline}
            className="text-hero font-semibold leading-[1.05] tracking-tight"
          >
            {slide.headline}
          </h1>
          <p className="mb-6 mt-6 max-w-[43ch] text-base leading-relaxed text-on-dark-muted">
            {slide.description}
          </p>
          <Button href={slide.href}>{slide.cta}</Button>
        </div>
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-dark-line/50 pt-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {real.hero.map((item, index) => (
                <button
                  key={item.category}
                  onClick={() => select(index)}
                  aria-label={`0${index + 1} — Show slide ${index + 1}: ${item.category}`}
                  aria-pressed={active === index}
                  className="min-h-11 w-11 py-2 text-start sm:w-20"
                >
                  <span
                    className={`tabular-nums text-xs ${active === index ? "text-accent" : "text-on-dark-muted"}`}
                  >
                    0{index + 1}
                  </span>
                  <span className="mt-3 block h-0.5 overflow-hidden bg-dark-line">
                    <span
                      key={`${active}-${index}`}
                      className={`block h-full bg-accent ${active === index ? "hero-progress" : "w-0"}`}
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
              className="grid h-11 w-11 place-items-center rounded-full border border-dark-line"
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          </div>
          <a
            href="#intent"
            aria-label="Explore the homepage"
            className="inline-flex min-h-11 items-center gap-3 text-xs text-on-dark-muted"
          >
            <span className="hidden sm:inline">Scroll to explore</span>
            <ArrowDown size={18} />
          </a>
        </div>
      </Container>
      <div className="absolute end-6 bottom-20">
        <StockBadge credit={asset.credit} />
      </div>
    </section>
  );
}

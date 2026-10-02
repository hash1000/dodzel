"use client";
import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { loadBannerAnimations } from "./animations";
export function useBannerMotion(ref: RefObject<HTMLElement | null>) {
  useGSAP((context) => {
    let alive = true;
    let dispose = () => {};
    const init = async () => {
      await document.fonts.ready;
      const { gsap, SplitText } = await loadBannerAnimations();
      if (!alive || !ref.current) return;
      context.add(() => {
        const section = ref.current!;
        const match = gsap.matchMedia();
        match.add("(prefers-reduced-motion: no-preference)", () => {
          const image = section.querySelector("[data-banner-image]");
          const title = section.querySelector("h1");
          const split = title ? SplitText.create(title, { type: "words", mask: "words", wordsClass: "banner-word", aria: "auto" }) : null;
          const timeline = gsap.timeline();
          if (image) {
            timeline.fromTo(image, { clipPath: "inset(0 0 100% 0)", scale: 1.12 }, { clipPath: "inset(0)", scale: 1, duration: 1, ease: "power3.inOut" }, 0);
            timeline.to(image, { scale: 1.06, duration: 22, ease: "none", repeat: -1, yoyo: true }, 1);
          }
          if (split) timeline.fromTo(split.words, { yPercent: 105 }, { yPercent: 0, duration: .65, stagger: .055, ease: "power3.out" }, .25);
          timeline.fromTo(section.querySelectorAll("[data-banner-follow]"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .45, stagger: .12 }, .55);
          timeline.fromTo(section.querySelector("[data-banner-rule]"), { scaleX: 0 }, { scaleX: 1, duration: .6, ease: "power3.out" }, .65);
          let visible = true;
          const sync = () => timeline.paused(!visible || document.visibilityState !== "visible");
          const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
          observer.observe(section);
          document.addEventListener("visibilitychange", sync);
          section.dataset.motion = "active";
          return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); timeline.kill(); split?.revert(); delete section.dataset.motion; };
        });
        dispose = () => match.revert();
      });
    };
    void init();
    return () => { alive = false; dispose(); };
  }, { scope: ref });
}

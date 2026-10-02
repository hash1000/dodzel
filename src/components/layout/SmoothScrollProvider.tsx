"use client";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (media.matches) return;
      const lenis = new Lenis({
        anchors: true,
        prevent: (node) =>
          node.tagName === "DIALOG" || !!node.closest("dialog"),
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      dispose = () => {
        gsap.ticker.remove(tick);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      dispose();
      media.removeEventListener("change", setup);
    };
  }, []);
  return children;
}

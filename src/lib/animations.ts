"use client";
import { useGSAP } from "@gsap/react";
let core: Promise<typeof import("gsap")> | undefined;
let plugins: Promise<{ gsap: typeof import("gsap").gsap; SplitText: typeof import("gsap/SplitText").SplitText; ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger }> | undefined;
export function loadGsap() { return core ??= import("gsap"); }
export function loadBannerAnimations() {
  return plugins ??= Promise.all([loadGsap(), import("gsap/SplitText"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { SplitText }, { ScrollTrigger }]) => {
    gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
    return { gsap, SplitText, ScrollTrigger };
  });
}
export const loadScrollAnimations = loadBannerAnimations;

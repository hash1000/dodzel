"use client";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { observeLoaderScroll } from "@/lib/loader-scroll";
import { observeNavigationScrollLock, registerNavigationLenis } from "@/lib/navigation-scroll";
import { loadScrollAnimations } from "@/lib/animations";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    let disposed = false, generation = 0;
    let cleanup = () => {};
    const policy = matchMedia("(min-width:1024px) and (prefers-reduced-motion:no-preference)");
    const start = async () => {
      if (!policy.matches || disposed) return;
      const request = generation;
      window.removeEventListener("wheel", intent);
      const [{ gsap, ScrollTrigger }, { default: Lenis }] = await Promise.all([loadScrollAnimations(), import("lenis")]);
      if (disposed || !policy.matches || request !== generation) return;
      const lenis = new Lenis({ anchors: true, prevent: (node) => node.tagName === "DIALOG" || !!node.closest("dialog") });
      let loaderLocked = false, navigationLocked = false;
      const syncLock = () => { if (loaderLocked || navigationLocked) lenis.stop(); else lenis.start(); };
      const stopLoader = observeLoaderScroll((value) => { loaderLocked = value; syncLock(); });
      const stopNavigation = observeNavigationScrollLock((value) => { navigationLocked = value; syncLock(); });
      const unregister = registerNavigationLenis(lenis);
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      ScrollTrigger.refresh();
      cleanup = () => {
        unregister(); stopLoader(); stopNavigation();
        gsap.ticker.remove(tick);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
      };
    };
    const intent = () => { void start(); };
    const sync = () => {
      generation++;
      cleanup(); cleanup = () => {};
      window.removeEventListener("wheel", intent);
      if (policy.matches) window.addEventListener("wheel", intent, { once: true, passive: true });
    };
    sync();
    policy.addEventListener("change", sync);
    return () => { disposed = true; generation++; cleanup(); policy.removeEventListener("change", sync); window.removeEventListener("wheel", intent); };
  }, [pathname]);
  return children;
}

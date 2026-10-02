"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function MediaReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const policy = matchMedia("(prefers-reduced-motion: reduce)");
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !policy.matches) { node.classList.add("media-enter"); observer.disconnect(); } }, { threshold: .12 });
    if (!policy.matches) observer.observe(node);
    const stop = () => { if (policy.matches) { observer.disconnect(); node.classList.remove("media-enter"); } };
    policy.addEventListener("change", stop);
    return () => { observer.disconnect(); policy.removeEventListener("change", stop); };
  }, []);
  return <div ref={ref} className="relative h-full w-full">{children}</div>;
}

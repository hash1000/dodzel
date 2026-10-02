"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
export function ProjectReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-project-card]", ref.current!)
          .forEach((card) =>
            gsap.from(card, {
              y: 18,
              opacity: 0,
              duration: 0.5,
              scrollTrigger: { trigger: card, start: "top 92%", once: true },
            }),
          );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <section ref={ref} className="py-section">
      {children}
    </section>
  );
}

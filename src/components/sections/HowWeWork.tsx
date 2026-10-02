"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoBadge } from "@/components/ui/TodoBadge";
export function HowWeWork() {
  const band = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      let alive = true;
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-step]",
            ref.current!,
          );
          const update = (index: number) =>
            cards.forEach((card, i) => {
              card.dataset.active = String(i === index);
              card.dataset.completed = String(i < index);
              if (i === index) card.setAttribute("aria-current", "step");
              else card.removeAttribute("aria-current");
            });
          update(0);
          const trigger = ScrollTrigger.create({
            trigger: ref.current,
            pin: ref.current,
            pinSpacing: true,
            start: "top 96px",
            end: () => `+=${Math.max(640, window.innerHeight * 0.9)}`,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              update(Math.min(4, Math.floor(self.progress * 5))),
          });
          return () => {
            trigger.kill(true);
            cards.forEach((card) => {
              delete card.dataset.active;
              delete card.dataset.completed;
              card.removeAttribute("aria-current");
            });
          };
        },
      );
      // Font metrics can change the pin height. Refresh only while this section is mounted.
      void document.fonts.ready.then(() => {
        if (alive) ScrollTrigger.refresh();
      });
      return () => {
        alive = false;
        mm.revert();
      };
    },
    { scope: band },
  );
  // The wrapper owns the entire pin spacer: scroll travel stays surface-dark, never exposed paper.
  return (
    <div ref={band} className="process-band bg-surface-dark">
      <section
        ref={ref}
        id="how-we-work"
        className="bg-surface-dark py-section text-on-dark lg:min-h-[calc(100svh-6rem)]"
      >
        <Container>
          <SectionHeading {...placeholders.headings.process} />
          <ol className="grid gap-4 lg:grid-cols-5">
            {placeholders.steps.map((step, index) => (
              <li key={step.title} data-step className="rounded-card p-5">
                <span className="text-sm text-accent">0{index + 1}</span>
                <h3 className="mb-4 mt-8 text-xl">{step.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-on-dark-muted">
                  {step.description}
                </p>
                <TodoBadge />
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </div>
  );
}

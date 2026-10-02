"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoBadge } from "@/components/ui/TodoBadge";
export function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-step]",
            ref.current!,
          );
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top 96px",
              end: "+=1200",
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });
          cards.forEach((card, index) => {
            timeline.fromTo(
              card,
              {
                borderColor: "var(--color-dark-line)",
                backgroundColor: "var(--color-navy)",
              },
              {
                borderColor: "var(--color-amber)",
                backgroundColor: "var(--color-navy-light)",
                duration: 1,
              },
              index,
            );
          });
        },
      );
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <section
      ref={ref}
      id="how-we-work"
      className="bg-navy py-section text-on-dark"
    >
      <Container>
        <SectionHeading {...placeholders.headings.process} />
        <ol className="grid gap-4 lg:grid-cols-5">
          {placeholders.steps.map((step, index) => (
            <li
              key={step.title}
              data-step
              className="border-t border-dark-line py-7"
            >
              <span className="text-sm text-amber">0{index + 1}</span>
              <h3 className="mb-4 mt-8 text-2xl">{step.title}</h3>
              <p className="mb-5 max-w-xs text-sm leading-relaxed text-muted-dark">
                {step.description}
              </p>
              <TodoBadge />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

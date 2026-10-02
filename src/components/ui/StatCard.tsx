"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReviewBadge } from "./ReviewBadge";

export function StatCard({
  stat,
}: {
  stat: {
    value: string;
    label: string;
    numericValue: number | null;
    todo?: boolean;
    confirm?: boolean;
  };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(stat.value);
  useGSAP(
    () => {
      if (stat.numericValue === null) return;
      const target = stat.numericValue;
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduced) {
            setValue(target.toLocaleString());
            return;
          }
          setValue("0");
          const count = { value: 0 };
          let tween: gsap.core.Tween | undefined;
          const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            tween = gsap.to(count, {
              value: target,
              duration: 1.2,
              onUpdate: () =>
                setValue(Math.round(count.value).toLocaleString()),
            });
            observer.disconnect();
          });
          if (ref.current) observer.observe(ref.current);
          return () => {
            observer.disconnect();
            tween?.kill();
          };
        },
      );
      return () => mm.revert();
    },
    { scope: ref, dependencies: [stat.numericValue], revertOnUpdate: true },
  );
  return (
    <div ref={ref} className="border-s border-dark-line ps-6">
      <p className="mb-3 font-display text-3xl sm:text-4xl text-amber">
        {value}
      </p>
      <p className="mb-4 text-sm text-muted-dark">{stat.label}</p>
      <ReviewBadge {...stat} />
    </div>
  );
}

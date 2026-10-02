"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { serviceHref } from "@/lib/nav";
type Service = {
  name: string;
  description: string;
  todo?: boolean;
  confirm?: boolean;
};
export function ServiceGroup({
  title,
  index,
  services,
}: {
  title: string;
  index: number;
  services: Service[];
}) {
  const [selected, setSelected] = useState(title);
  const [previous, setPrevious] = useState<string | null>(null);
  const select = (slot: string) => {
    if (slot === selected) return;
    setPrevious(selected);
    setSelected(slot);
  };
  useEffect(() => {
    if (previous === null) return;
    const timer = setTimeout(() => setPrevious(null), 500);
    return () => clearTimeout(timer);
  }, [previous, selected]);
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-card border border-line border-t-2 border-t-accent-2 bg-surface">
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-raised">
        {[
          ...new Set(
            [previous, selected].filter((slot): slot is string => !!slot),
          ),
        ].map((slot) => (
          <div
            key={slot}
            aria-hidden={slot !== selected}
            className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${selected === slot ? "opacity-100" : "opacity-0"}`}
          >
            <MediaFrame
              slot={slot}
              className="h-full w-full rounded-none"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="eyebrow mb-3 text-xs uppercase tracking-widest">
          0{index + 1} / Capabilities
        </p>
        <h3 className="mb-6 text-3xl font-semibold">{title}</h3>
        <ul className="divide-y divide-line">
          {services.map((service) => (
            <li
              key={service.name}
              className="py-4"
              onMouseEnter={() =>
                title === "Build & Maintain" && select(service.name)
              }
              onFocus={() =>
                title === "Build & Maintain" && select(service.name)
              }
            >
              <Link
                href={serviceHref(service.name)}
                className="link-slide flex min-h-11 items-center justify-between gap-3 text-sm font-semibold text-link"
              >
                <span>
                  {service.name} <ReviewBadge {...service} />
                </span>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 rtl:-scale-x-100"
                />
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

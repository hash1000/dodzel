"use client";
import { useState } from "react";
import { real } from "@/content/real";
import { countryPaths } from "@/lib/country-paths";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { placeholders } from "@/content/placeholder";
const labels: Record<string, { x: number; y: number }> = {
  Pakistan: { x: 745, y: 180 },
  Qatar: { x: 427, y: 326 },
  "Saudi Arabia": { x: 235, y: 350 },
  Iraq: { x: 240, y: 100 },
};
// Only Lahore has confirmed city coordinates. Qatar is a country-level location, not an invented office city.
const pins = [
  { label: "Lahore", x: (74.3587 - 32) * 20, y: (39 - 31.5204) * 20 },
  { label: "Qatar", x: (51.18 - 32) * 20, y: (39 - 25.35) * 20 },
];
export function PresenceMap() {
  const [active, setActive] = useState("Pakistan");
  return (
    <section className="border-y border-line bg-surface py-section">
      <Container>
        <SectionHeading {...placeholders.headings.presence} />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-card border border-line bg-paper p-3">
            <svg
              viewBox="0 0 980 520"
              role="group"
              aria-labelledby="presence-title presence-description"
              className="aspect-[49/26] w-full"
            >
              <title id="presence-title">
                Dodzel presence in four countries
              </title>
              <desc id="presence-description">
                Natural Earth country outlines. Use Tab and Enter to highlight a
                country. Only Lahore and Qatar have location markers.
              </desc>
              {countryPaths.map((country) => (
                <g key={country.name}>
                  <path
                    d={country.path}
                    role="button"
                    tabIndex={0}
                    aria-label={`Highlight ${country.name}`}
                    aria-pressed={active === country.name}
                    onMouseEnter={() => setActive(country.name)}
                    onFocus={() => setActive(country.name)}
                    onClick={() => setActive(country.name)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActive(country.name);
                      }
                    }}
                    fill={
                      active === country.name
                        ? "var(--color-accent)"
                        : "var(--color-map)"
                    }
                    stroke="var(--color-muted)"
                    strokeWidth="1.3"
                    className="cursor-pointer"
                  />
                  <rect
                    x={labels[country.name].x - 56}
                    y={labels[country.name].y - 18}
                    width="112"
                    height="26"
                    rx="5"
                    fill="var(--color-paper)"
                    className="pointer-events-none"
                  />
                  <text
                    x={labels[country.name].x}
                    y={labels[country.name].y}
                    textAnchor="middle"
                    fontSize="14"
                    fill="var(--color-ink)"
                    className="pointer-events-none"
                  >
                    {country.name}
                  </text>
                </g>
              ))}
              {pins.map((pin) => (
                <g
                  key={pin.label}
                  aria-label={`Confirmed location: ${pin.label}`}
                >
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="5"
                    fill="var(--color-surface-dark)"
                  />
                  <text
                    x={pin.x + 10}
                    y={pin.y + 5}
                    fontSize="13"
                    fill="var(--color-ink)"
                  >
                    {pin.label}
                  </text>
                </g>
              ))}
              <path
                d="M384,273L428,310L470,310"
                fill="none"
                stroke="var(--color-accent-2)"
                strokeWidth="2"
                aria-hidden="true"
              />
            </svg>
            <p className="mt-3 text-xs text-muted">
              Natural Earth · public-domain boundaries · simplified{" "}
              <ReviewBadge confirm />
            </p>
          </div>
          <div>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              {placeholders.presence.description} <ReviewBadge todo />
            </p>
            <ul className="divide-y divide-line">
              {real.countries.map((country) => (
                <li key={country.name} className="py-5">
                  <button
                    onMouseEnter={() => setActive(country.name)}
                    onFocus={() => setActive(country.name)}
                    onClick={() => setActive(country.name)}
                    aria-pressed={active === country.name}
                    className="min-h-11 w-full text-start font-display text-xl font-semibold hover:underline"
                  >
                    {country.name} <ReviewBadge {...country} />
                  </button>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {real.entities
                      .filter((entity) => entity.country === country.name)
                      .map((entity) => (
                        <li key={entity.name}>
                          {entity.name} <ReviewBadge {...entity} />
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";
import { useState } from "react";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoBadge } from "@/components/ui/TodoBadge";
const countries = [
  {
    name: "Pakistan",
    x: 480,
    y: 145,
    entities: ["Dodzel Engineering Ltd", "Novex"],
  },
  {
    name: "Qatar",
    x: 345,
    y: 225,
    entities: ["Dodzel Engineering Qatar WLL", "Belgrass", "Bimex"],
  },
  { name: "Saudi Arabia", x: 240, y: 235, entities: [] },
  { name: "Iraq", x: 270, y: 105, entities: [] },
];
export function PresenceMap() {
  const [active, setActive] = useState("Pakistan");
  return (
    <section className="border-y border-line bg-surface py-section">
      <Container>
        <SectionHeading {...placeholders.headings.presence} />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-[3/2] rounded-card bg-paper">
            <svg
              viewBox="0 0 600 400"
              role="img"
              aria-labelledby="map-title"
              className="h-full w-full"
            >
              <title id="map-title">
                Stylized indicative map of Pakistan, Qatar, Saudi Arabia and
                Iraq
              </title>
              <path
                d="M60 80L165 50L255 65L295 30L365 70L390 100L510 65L555 110L535 190L455 215L400 285L335 290L280 350L180 310L140 240L70 210Z"
                fill="var(--color-line)"
              />
              <path
                d="M190 90L265 75L310 110L280 170L200 140Z M160 170L275 150L350 250L300 320L195 275Z M440 95L500 100L515 160L465 200L420 175Z"
                stroke="var(--color-muted)"
                fill="none"
                strokeWidth="1"
                strokeDasharray="4 5"
              />
              {countries.map((country) => (
                <g key={country.name}>
                  <circle
                    cx={country.x}
                    cy={country.y}
                    r={active === country.name ? 10 : 6}
                    fill={
                      active === country.name
                        ? "var(--color-amber-dark)"
                        : "var(--color-navy)"
                    }
                  />
                  <text
                    x={country.x}
                    y={country.y + 30}
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--color-ink)"
                  >
                    {country.name}
                  </text>
                </g>
              ))}
            </svg>
            <span className="absolute start-4 bottom-4 text-xs text-muted">
              {placeholders.presence.mapLabel} <TodoBadge />
            </span>
          </div>
          <div>
            <p className="mb-6 text-sm leading-relaxed text-muted">
              {placeholders.presence.description} <TodoBadge />
            </p>
            <ul className="divide-y divide-line">
              {countries.map((country) => (
                <li key={country.name} className="py-5">
                  <button
                    onMouseEnter={() => setActive(country.name)}
                    onFocus={() => setActive(country.name)}
                    onClick={() => setActive(country.name)}
                    aria-pressed={active === country.name}
                    className="w-full text-start font-display text-xl underline-offset-4 hover:underline"
                  >
                    {country.name}
                    <span
                      className="ms-3 text-xs text-amber-dark"
                      aria-hidden="true"
                    >
                      {active === country.name ? "●" : "○"}
                    </span>
                  </button>
                  {country.entities.length > 0 && (
                    <ul className="mt-3 space-y-2 text-sm text-muted">
                      {country.entities.map((entity) => (
                        <li key={entity}>{entity}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

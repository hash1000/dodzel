"use client";

import { useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { real } from "@/content/real";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { connectionPath, countryView, LAHORE, mapCountries, PRESENCE_MAP_LAYOUT, REGION_VIEW } from "@/lib/presence-map";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

export function PresenceMap() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const labelLayer = useRef<HTMLDivElement>(null);
  const camera = useRef({ ...REGION_VIEW });
  const syncLabels = useRef<() => void>(() => {});
  const pulses = useRef<{ country: string; tween: gsap.core.Tween }[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const highlighted = hovered ?? focused ?? selected;
  const id = useId().replace(/:/g, "");
  const countries = real.countries.filter((country) => mapCountries.some((mapped) => mapped.name === country.name));
  const selectedEntities = real.entities.filter((entity) => entity.country === selected);

  useGSAP(() => {
    const canvas = svg.current!;
    const frame = panel.current!;
    const layer = labelLayer.current!;
    let refreshFrame = 0;
    let alive = true;
    const positionLabels = () => {
      const matrix = canvas.getScreenCTM();
      if (!matrix) return;
      const rect = frame.getBoundingClientRect();
      const mobile = rect.width < 520;
      layer.querySelectorAll<HTMLElement>("[data-map-label]").forEach((label) => {
        const country = mapCountries.find((item) => item.name === label.dataset.mapLabel)!;
        const layout = PRESENCE_MAP_LAYOUT[country.name];
        const offset = (mobile ? layout?.mobileLabel : layout?.label) ?? { x: 16, y: -45 };
        const point = new DOMPoint(country.marker.x, country.marker.y).matrixTransform(matrix);
        const x = point.x - rect.left;
        const y = point.y - rect.top;
        const left = Math.max(10, Math.min(rect.width - label.offsetWidth - 10, x + offset.x));
        let top = Math.max(52, Math.min(rect.height - 78, y + offset.y));
        const info = frame.querySelector<HTMLElement>("[data-map-info]");
        if (info) {
          const box = info.getBoundingClientRect();
          const infoTop = box.top - rect.top;
          if (left < box.right - rect.left && left + label.offsetWidth > box.left - rect.left && top + label.offsetHeight > infoTop) {
            top = Math.max(52, Math.min(y - label.offsetHeight - 18, infoTop - label.offsetHeight - 12));
          }
        }
        label.style.left = `${left}px`;
        label.style.top = `${top}px`;
        const otherSelected = frame.dataset.mapSelected && frame.dataset.mapSelected !== country.name;
        label.style.visibility = otherSelected || x < -5 || x > rect.width + 5 || y < 30 || y > rect.height - 45 ? "hidden" : "visible";
      });
      // Qatar's label lives in open water; the line ends just before the pill.
      const qatar = mapCountries.find((country) => country.name === "Qatar");
      const label = layer.querySelector<HTMLElement>('[data-map-label="Qatar"]');
      const leader = frame.querySelector<SVGPathElement>("[data-qatar-leader]");
      if (qatar && label && leader) {
        const point = new DOMPoint(qatar.marker.x, qatar.marker.y).matrixTransform(matrix);
        const x = point.x - rect.left, y = point.y - rect.top;
        const lx = parseFloat(label.style.left), ly = parseFloat(label.style.top);
        leader.setAttribute("d", `M${x},${y + 7} L${x},${ly + 15} L${lx - 5},${ly + 15}`);
        leader.style.visibility = label.style.visibility;
      }
    };
    syncLabels.current = positionLabels;
    positionLabels();
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => { positionLabels(); ScrollTrigger.refresh(); });
    });
    resize.observe(frame);
    const refresh = () => { if (alive) { positionLabels(); ScrollTrigger.refresh(); } };
    void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });

    const media = gsap.matchMedia();
    media.add({ reduced: "(prefers-reduced-motion: reduce)", full: "(prefers-reduced-motion: no-preference)" }, (context) => {
      const reduced = !!context.conditions?.reduced;
      pulses.current = [];
      const loops: gsap.core.Tween[] = [];
      const arcs = [...canvas.querySelectorAll<SVGPathElement>("[data-map-arc]")];
      if (reduced) {
        gsap.set(arcs, { strokeDashoffset: 0 });
        return;
      }
      canvas.querySelectorAll<SVGCircleElement>("[data-map-pulse]").forEach((ring) => {
        const tween = gsap.fromTo(ring, { scale: 0.6, opacity: 0.7 }, {
          scale: ring.dataset.hq ? 3.5 : 2.6, opacity: 0, duration: ring.dataset.hq ? 2.8 : 3.4,
          delay: Number(ring.dataset.delay ?? 0), repeat: -1, ease: "power1.out", paused: true,
          svgOrigin: `${ring.getAttribute("cx")} ${ring.getAttribute("cy")}`,
        });
        loops.push(tween);
        pulses.current.push({ country: ring.dataset.country!, tween });
      });
      arcs.forEach((arc, index) => {
        const dot = canvas.querySelector<SVGCircleElement>(`[data-map-traveller="${arc.dataset.country}"]`)!;
        loops.push(gsap.to(dot, {
          motionPath: { path: arc, align: arc, alignOrigin: [0.5, 0.5] },
          duration: 5.5 + index * 0.7, repeat: -1, ease: "none", paused: true,
        }));
        const length = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: length, strokeDashoffset: length });
      });
      let visible = false, entered = false;
      const syncLoops = () => loops.forEach((loop) => loop.paused(!visible || !entered || document.hidden));
      const entrance = gsap.timeline({ paused: true, onComplete: () => { entered = true; syncLoops(); } })
        .from(frame, { y: 24, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from("[data-map-dots]", { opacity: 0, duration: 0.6 }, 0.25)
        .from("[data-map-marker]", { scale: 0, transformOrigin: "center", duration: 0.55, stagger: 0.1, ease: "back.out(1.7)" }, 0.55)
        .to(arcs, { strokeDashoffset: 0, duration: 1.1, stagger: 0.2, ease: "power2.inOut" }, 0.75)
        .from("[data-map-labels], [data-qatar-leader]", { opacity: 0, duration: 0.4, stagger: 0.08 }, 1.9)
        .from("[data-map-traveller]", { opacity: 0, duration: 0.3 }, 2.25);
      ScrollTrigger.create({
        trigger: frame, start: "top 92%", end: "bottom top",
        onEnter: () => entrance.play(),
        onToggle: (trigger) => { visible = trigger.isActive; syncLoops(); },
      });
      document.addEventListener("visibilitychange", syncLoops);
      return () => { document.removeEventListener("visibilitychange", syncLoops); pulses.current = []; };
    }, root);
    return () => {
      alive = false;
      resize.disconnect();
      cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refresh);
      media.revert();
      syncLabels.current = () => {};
    };
  }, { scope: root });

  useGSAP(() => {
    root.current?.querySelectorAll<HTMLElement | SVGElement>("[data-map-country]").forEach((element) => {
      const active = !highlighted || element.dataset.mapCountry === highlighted;
      gsap.to(element, { opacity: active ? 1 : 0.4, duration: 0.2, overwrite: "auto" });
    });
    pulses.current.forEach(({ country, tween }) => tween.timeScale(country === highlighted ? 1.8 : 1));
  }, { scope: root, dependencies: [highlighted], revertOnUpdate: true });

  useGSAP(() => {
    const target = selected ? mapCountries.find((country) => country.name === selected) : null;
    const frame = panel.current!;
    const view = target ? countryView(target.bounds, frame.clientWidth / frame.clientHeight) : REGION_VIEW;
    gsap.to(camera.current, {
      ...view, duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.9,
      ease: "power3.inOut", overwrite: "auto",
      onUpdate: () => {
        const { x, y, width, height } = camera.current;
        svg.current?.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
        syncLabels.current();
      },
    });
  }, { scope: root, dependencies: [selected] });

  const selectCountry = (country: string) => {
    setSelected(country);
    if (matchMedia("(max-width: 1023px)").matches) {
      panel.current?.scrollIntoView({
        block: "center",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  };

  return (
    <section ref={root} data-presence-map data-highlighted={highlighted ?? ""} className="border-y border-line on-dark bg-surface py-section">
      <Container>
        <SectionHeading eyebrow="07 / Regional growth" title={real.expansion.title} />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div ref={panel} data-map-panel data-map-selected={selected ?? ""} className="presence-map-panel relative isolate aspect-square overflow-hidden rounded-2xl border border-white/10 bg-ink md:aspect-[4/3]">
            <div aria-hidden="true" className="presence-map-grid pointer-events-none absolute inset-0 -z-10" />
            <div aria-hidden="true" className="presence-map-glow pointer-events-none absolute inset-0 -z-10" />
            <svg ref={svg} viewBox={`${REGION_VIEW.x} ${REGION_VIEW.y} ${REGION_VIEW.width} ${REGION_VIEW.height}`} role="img"
              aria-label={`Dodzel regional strategy: home market in Pakistan, group expansion in Qatar, and expansion opportunities in Oman, Iraq and Saudi Arabia. Country markers do not indicate office locations.`}
              className="absolute inset-0 h-full w-full">
              <defs>
                <pattern id={`${id}-quiet`} width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.4" fill="white" fillOpacity="0.1" /></pattern>
                <pattern id={`${id}-presence`} width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.4" fill="white" fillOpacity="0.35" /></pattern>
                <pattern id={`${id}-hq`} width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.4" fill="var(--color-brand)" /></pattern>
                <linearGradient id={`${id}-arc`} x1={LAHORE.x} y1={LAHORE.y} x2="250" y2="250" gradientUnits="userSpaceOnUse"><stop stopColor="var(--color-brand)" /><stop offset="1" stopColor="white" stopOpacity="0.6" /></linearGradient>
              </defs>
              <g data-map-dots>
                {mapCountries.map((country) => {
                  const hq = country.name === "Pakistan";
                  const present = countries.some((item) => item.name === country.name);
                  return <g key={country.name} data-map-country={country.name} data-map-emphasis={highlighted === country.name} className="presence-country">
                    <path d={country.path} fill={hq ? "var(--color-brand)" : "white"} fillOpacity={hq ? 0.09 : present ? 0.025 : 0} />
                    <path d={country.path} fill={`url(#${id}-${hq ? "hq" : present ? "presence" : "quiet"})`} stroke="white" strokeOpacity={present ? 0.14 : 0.06} strokeWidth="0.75" vectorEffect="non-scaling-stroke" />
                  </g>;
                })}
              </g>
              {mapCountries.filter((country) => country.name !== "Pakistan" && countries.some((item) => item.name === country.name)).map((country) => (
                <g key={country.name} data-map-country={country.name} data-map-emphasis={highlighted === country.name} className="presence-connection">
                  <path data-map-arc data-country={country.name} d={connectionPath(country)} fill="none" stroke={`url(#${id}-arc)`} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                  <circle data-map-traveller={country.name} cx={LAHORE.x} cy={LAHORE.y} r="3" fill="white" className="presence-traveller motion-reduce:hidden" />
                </g>
              ))}
              {mapCountries.filter((country) => countries.some((item) => item.name === country.name)).map((country) => {
                const hq = country.name === "Pakistan";
                return <g key={country.name} data-map-country={country.name} data-map-emphasis={highlighted === country.name}>
                  {[0, ...(hq ? [1] : [])].map((ring) => <circle key={ring} data-map-pulse data-country={country.name} data-hq={hq ? "true" : undefined} data-delay={ring * 1.4}
                    cx={country.marker.x} cy={country.marker.y} r={hq ? 10 : 8} fill="none" stroke={hq ? "var(--color-brand)" : "white"} strokeWidth="1" opacity="0" className="motion-reduce:hidden" vectorEffect="non-scaling-stroke" />)}
                  <circle data-map-marker cx={country.marker.x} cy={country.marker.y} r={hq ? 8 : 6} fill={hq ? "var(--color-brand)" : "white"} stroke="var(--color-ink)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </g>;
              })}
            </svg>
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"><path data-qatar-leader fill="none" stroke="white" strokeOpacity="0.4" strokeWidth="1" /></svg>
            <div ref={labelLayer} data-map-labels aria-hidden="true" className="pointer-events-none absolute inset-0">
              {mapCountries.filter((country) => countries.some((item) => item.name === country.name)).map((country) => <div key={country.name} data-map-label={country.name} data-map-country={country.name} data-map-emphasis={highlighted === country.name} className="presence-map-label absolute flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 font-body text-label text-[var(--fg-heading)] backdrop-blur-md">
                <span className={`size-1.5 rounded-full ${country.name === "Pakistan" ? "bg-brand" : "bg-white"}`} />
                {country.name}{country.name === "Pakistan" && <span className="text-xs text-[var(--fg-muted)]">· Lahore HQ</span>}
              </div>)}
            </div>
            <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-ink/70 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--fg-body)] backdrop-blur-md">Home market · Regional growth</div>
            {selected && <div data-map-info role="region" aria-label={`${selected} regional strategy`} className="absolute bottom-14 left-4 right-4 max-h-[45%] overflow-y-auto rounded-xl border border-white/15 bg-surface/90 p-4 text-[var(--fg-body)] shadow-xl backdrop-blur-xl sm:right-auto sm:w-[min(19rem,calc(100%-2rem))]">
              <div className="mb-2 flex items-start justify-between gap-3"><span className="font-heading text-lg font-semibold text-[var(--fg-heading)]">{selected}</span><button type="button" onClick={() => setSelected(null)} className="min-h-8 shrink-0 text-xs underline underline-offset-4 hover:text-[var(--fg-link-hover)]">Reset view</button></div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-2 py-1 text-xs"><span className={`size-1.5 rounded-full ${selectedEntities.length ? "bg-brand" : "bg-white/40"}`} />{countries.find((country) => country.name === selected)?.status}</span>
              <ul className="mt-3 space-y-2 text-xs">{selectedEntities.map((entity) => <li key={entity.name}>{entity.name}</li>)}</ul>
            </div>}
            <div className="pointer-events-none absolute bottom-10 right-4 flex gap-4 font-body text-xs text-white/60"><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-brand" />HQ</span><span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-white" />Regional focus</span></div>
            <p className="pointer-events-none absolute bottom-3 left-4 right-4 text-xs text-white/40">Natural Earth · public-domain boundaries · simplified</p>
          </div>
          <div>
            <p className="mb-4 text-description text-[var(--fg-body)]">{real.expansion.description}</p>
            <ul className="divide-y divide-white/10" onMouseLeave={() => setHovered(null)}>
              {countries.map((country, index) => {
                const entities = real.entities.filter((entity) => entity.country === country.name);
                return <li key={country.name}>
                  <button type="button" data-presence-row={country.name} aria-pressed={selected === country.name}
                    onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(country.name); }}
                    onPointerLeave={() => setHovered(null)} onFocus={() => setFocused(country.name)} onBlur={() => setFocused(null)} onClick={() => selectCountry(country.name)}
                    className="group grid w-full grid-cols-[2rem_1fr] gap-x-3 py-5 text-start focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                    <span className="pt-1 font-mono text-xs text-[var(--fg-muted)]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-heading text-card font-semibold text-[var(--fg-heading)] group-hover:text-[var(--fg-eyebrow)]">{country.name} <ReviewBadge {...country} /></span>
                    <span className="col-start-2 mt-3 space-y-2 text-description text-[var(--fg-body)]">
                      <span className="block text-[var(--fg-muted)]">{country.status}</span>
                      {entities.length ? entities.map((entity) => <span key={entity.name} className="flex items-start gap-2"><span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-brand" /><span>{entity.name} <ReviewBadge {...entity} /></span></span>) : null}
                    </span>
                  </button>
                </li>;
              })}
            </ul>
            <p className="mt-6 border-t border-line pt-6 text-description text-[var(--fg-body)]">Oman is also part of Dodzel’s expansion strategy, with opportunities being pursued alongside Qatar, Iraq and Saudi Arabia.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

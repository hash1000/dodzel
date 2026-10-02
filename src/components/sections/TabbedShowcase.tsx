"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import type { MediaAsset } from "@/content/media";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { StockBadge } from "@/components/ui/StockBadge";
export type ShowcaseChip = { label: string; href?: string; confirm?: boolean; todo?: boolean; reviewOnly?: boolean };
export type ShowcaseItem = { id: string; title: string; image: MediaAsset; description: string; chips: ShowcaseChip[]; href: string; todo?: boolean; confirm?: boolean };
const desktopQuery = "(min-width: 1024px)";
function subscribeViewport(change: () => void) {
  const query = matchMedia(desktopQuery);
  query.addEventListener("change", change);
  return () => query.removeEventListener("change", change);
}
function subscribeHash(change: () => void) {
  window.addEventListener("hashchange", change);
  window.addEventListener("popstate", change);
  return () => { window.removeEventListener("hashchange", change); window.removeEventListener("popstate", change); };
}
const viewportSnapshot = () => matchMedia(desktopQuery).matches;
const hashSnapshot = () => window.location.hash.slice(1);
function ShowcaseContent({ item }: { item: ShowcaseItem }) {
  return <div className="showcase-copy pt-6">
    <p className="max-w-[65ch] text-body leading-relaxed text-ink">{item.description} <ReviewBadge todo={item.todo} /></p>
    <div className="my-5 flex flex-wrap gap-2" aria-label="Related services awaiting confirmation">
      {item.chips.map(chip => {
        const content = <>{chip.label} <ReviewBadge todo={chip.todo} confirm={chip.confirm} /></>;
        const className = `inline-flex min-h-11 items-center gap-2 rounded-sm border border-line bg-surface px-3 py-2 text-sm text-link ${chip.reviewOnly ? "review-badge" : ""}`;
        return chip.href ? <Link key={chip.label} href={chip.href} className={className}>{content}</Link> : <span key={chip.label} data-review-badge={chip.reviewOnly || undefined} className={className}>{content}</span>;
      })}
    </div>
    <Button href={item.href}>Explore {item.title}</Button>
  </div>;
}
function ShowcaseImage({ item, index, active }: { item: ShowcaseItem; index: number; active: boolean }) {
  const asset = item.image;
  return <div className="relative aspect-video overflow-hidden rounded-sm bg-surface-raised">
    {asset.kind === "placeholder" ? <div className="absolute inset-0 grid place-items-center text-xs text-on-dark">Image needed <ReviewBadge todo /></div> : <>
      <Image data-showcase-image={item.id} src={asset.srcset.at(-1)?.avif ?? asset.src} alt={active ? asset.alt : ""} fill sizes="(max-width: 1023px) 100vw, 66vw" loading={index === 0 ? "eager" : "lazy"} unoptimized={asset.srcset.length === 1} placeholder={asset.blurDataURL ? "blur" : "empty"} blurDataURL={asset.blurDataURL || undefined} className="showcase-image object-cover" style={{ objectPosition: `${asset.focal.x * 100}% ${asset.focal.y * 100}%` }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-scrim" style={{ opacity: Math.min(.15, asset.scrimStrength ?? .06) }} />
      {asset.stock && <div className="absolute start-4 top-4"><StockBadge credit={asset.credit} /></div>}
    </>}
  </div>;
}
export function TabbedShowcase({ eyebrow, title, intro, items }: { eyebrow: string; title: string; intro: ReactNode; items: ShowcaseItem[] }) {
  const uid = useId();
  const desktop = useSyncExternalStore(subscribeViewport, viewportSnapshot, () => true);
  const hash = useSyncExternalStore(subscribeHash, hashSnapshot, () => "");
  const [selected, setSelected] = useState(0);
  const hashIndex = items.findIndex(item => item.id === hash);
  const active = hashIndex >= 0 ? hashIndex : Math.min(selected, items.length - 1);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelIntent = () => { if (intent.current) clearTimeout(intent.current); intent.current = null; };
  useEffect(() => () => { if (intent.current) clearTimeout(intent.current); }, []);
  const select = (index: number, focus = false) => {
    cancelIntent();
    setSelected(index);
    if (window.location.hash !== `#${items[index].id}`) {
      const oldURL = window.location.href;
      window.history.replaceState(window.history.state, "", `#${items[index].id}`);
      window.dispatchEvent(new HashChangeEvent("hashchange", { oldURL, newURL: window.location.href }));
    }
    if (focus) buttons.current[index]?.focus();
  };
  const key = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowDown" ? (index + 1) % items.length : event.key === "ArrowUp" ? (index - 1 + items.length) % items.length : event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : null;
    if (next !== null) { event.preventDefault(); select(next, true); }
  };
  const row = (item: ShowcaseItem, index: number) => <button
    key={item.id} ref={node => { buttons.current[index] = node; }} id={`${uid}-tab-${item.id}`} type="button"
    role={desktop ? "tab" : undefined} aria-selected={desktop ? active === index : undefined} aria-expanded={!desktop ? active === index : undefined} aria-controls={`${uid}-panel-${item.id}`}
    tabIndex={desktop && active !== index ? -1 : 0} onClick={() => select(index)} onKeyDown={desktop ? event => key(event, index) : undefined}
    onPointerEnter={() => { if (desktop && matchMedia("(hover: hover) and (pointer: fine)").matches) { cancelIntent(); intent.current = setTimeout(() => select(index), 120); } }} onPointerLeave={cancelIntent}
    data-active={active === index} className="showcase-row flex min-h-[72px] w-full items-center justify-between gap-4 border-b border-line border-s-[3px] px-5 text-start font-display text-xl font-semibold"
  ><span>{item.title} <ReviewBadge confirm={item.confirm} /></span><span aria-hidden="true" className="shrink-0 text-xs tabular-nums">{String(index + 1).padStart(2, "0")}</span></button>;
  if (!items.length) return null;
  return <section data-showcase className="bg-paper py-section">
    <Container>
      <header className="mb-10">
        <p className="eyebrow mb-4 text-xs uppercase tracking-widest">{eyebrow}</p>
        <h2 className="mb-5 text-heading font-semibold text-ink">{title}</h2>
        <div className="max-w-[60ch] text-body leading-relaxed text-ink">{intro}</div>
      </header>
      {desktop ? <div className="grid grid-cols-12 items-start gap-x-6" data-showcase-mode="tabs">
        <div role="tablist" aria-label={title} aria-orientation="vertical" className="col-span-12 lg:col-span-4 self-stretch border-t border-line bg-surface">{items.map(row)}</div>
        <div className="showcase-preview col-span-12 lg:col-span-8 grid min-w-0">
          {items.map((item, index) => <div key={item.id} id={`${uid}-panel-${item.id}`} role="tabpanel" aria-labelledby={`${uid}-tab-${item.id}`} aria-hidden={active !== index} inert={active !== index} tabIndex={active === index ? 0 : -1} data-active={active === index} className="showcase-panel min-w-0 rounded-sm" style={{ gridArea: "1 / 1" }}>
            <ShowcaseImage item={item} index={index} active={active === index} /><ShowcaseContent item={item} />
          </div>)}
        </div>
      </div> : <div data-showcase-mode="accordion" className="border-t border-line">
        {items.map((item, index) => <div key={item.id}>
          <h3>{row(item, index)}</h3>
          <div id={`${uid}-panel-${item.id}`} role="region" aria-labelledby={`${uid}-tab-${item.id}`} aria-hidden={active !== index} inert={active !== index} data-active={active === index} className="showcase-accordion">
            <div className="min-h-0 overflow-hidden"><div className="pb-8 pt-6"><ShowcaseImage item={item} index={index} active={active === index} /><ShowcaseContent item={item} /></div></div>
          </div>
        </div>)}
      </div>}
    </Container>
  </section>;
}

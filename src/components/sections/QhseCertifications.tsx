import { MediaFrame } from "@/components/ui/MediaFrame";
import { ShieldCheck } from "lucide-react";
import { placeholders } from "@/content/placeholder";
import { real } from "@/content/real";
import { Container } from "@/components/ui/Container";
import { TodoBadge } from "@/components/ui/TodoBadge";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { Button } from "@/components/ui/Button";
export function QhseCertifications() {
  return (
    <section
      data-tone="dark"
      className="relative isolate overflow-hidden on-navy bg-surface-raised py-section text-[var(--fg-heading)]"
    >
      <MediaFrame
        slot="qhse-background"
        className="absolute inset-0 -z-20 h-full w-full rounded-none"
        sizes="100vw"
        scrim
      />
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="mb-5 type-label text-[var(--fg-eyebrow)]">
            05 / Quality, health, safety & environment
          </p>
          <h2 className="mb-6">
            {real.qhse.title} <ReviewBadge {...real.qhse} />
          </h2>
          <p className="mb-8 max-w-md leading-relaxed text-[var(--fg-body)]">
            {real.qhse.description}
          </p>
          <Button href="/qhse" variant="outline">
            Our QHSE approach
          </Button>
        </div>
        <div className="rounded-card border border-dark-line on-navy bg-surface-elevated p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="font-display text-6xl text-[var(--fg-eyebrow)]">
                {placeholders.qhse.hours}
              </p>
              <p className="mt-4 text-description text-[var(--fg-body)]">
                {placeholders.qhse.hoursLabel} <TodoBadge />
              </p>
            </div>
            <div
              className="on-navy bg-surface-raised flex aspect-[2/1] items-center justify-center border border-dark-line p-4 text-center text-xs text-[var(--fg-body)]"
              aria-label={placeholders.safetyChart.label}
            >
              <span>
                {placeholders.safetyChart.label} <TodoBadge />
              </span>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-dark-line pt-6 sm:grid-cols-3">
            {placeholders.certifications.map((cert) => (
              <div key={cert.title} className="border border-dark-line p-4">
                <ShieldCheck
                  className="mb-4 text-[var(--fg-body)]"
                  size={24}
                  aria-hidden="true"
                />
                <h3 className="">{cert.title}</h3>
                <p className="mb-3 mt-2 text-description text-[var(--fg-body)]">
                  {cert.detail}
                </p>
                <TodoBadge />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

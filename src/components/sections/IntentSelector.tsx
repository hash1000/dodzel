import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
export function IntentSelector() {
  return (
    <section id="intent" className="relative z-10 bg-surface-dark pb-8 pt-6 md:-mt-10 md:bg-transparent md:pb-0 md:pt-0">
      <Container>
        <h2 className="sr-only">What are you looking for?</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Our Services", href: "/services" },
            { label: "A Career", href: "/careers" },
            { label: "Become a Partner", href: "/partners" },
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-32 flex-col justify-between gap-6 rounded-card border border-white/15 border-t border-t-brand on-navy bg-surface-raised p-6 text-[var(--fg-heading)] shadow-sm hover:border-accent-on-light"
            >
              <span className="type-label text-[var(--fg-muted)]">
                0{index + 1} / Explore
              </span>
              <span className="flex items-center justify-between gap-4 font-heading text-card font-bold">
                {item.label}
                <ArrowUpRight className="text-brand" size={24} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

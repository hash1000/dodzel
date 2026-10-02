import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
export function IntentSelector() {
  return (
    <section id="intent" className="relative z-10 -mt-14 pb-12">
      <Container>
        <h2 className="sr-only">What are you looking for?</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Our Services", href: "/services" },
            { label: "A Career", href: "/careers" },
            { label: "Become a Vendor", href: "/vendors" },
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-36 flex-col justify-between gap-6 rounded-card border border-line bg-surface p-6 text-ink shadow-sm hover:border-amber-dark"
            >
              <span className="text-xs uppercase tracking-widest text-muted">
                0{index + 1} / Explore
              </span>
              <span className="flex items-center justify-between gap-4 font-display text-xl font-semibold">
                {item.label}
                <ArrowUpRight size={24} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

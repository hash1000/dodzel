import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
export function IntentSelector() {
  return (
    <section id="intent" className="border-b border-line bg-surface py-10">
      <Container className="grid items-center gap-6 lg:grid-cols-[1fr_2fr]">
        <h2 className="text-2xl">What are you looking for?</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Our Services", href: "/services" },
            { label: "A Career", href: "/careers" },
            { label: "Become a Vendor", href: "/vendors" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-16 items-center justify-between gap-4 border border-line px-5 py-4 text-sm font-medium hover:bg-paper"
            >
              {item.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

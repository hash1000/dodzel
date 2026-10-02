import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import { placeholders } from "@/content/placeholder";
export function TrustStats() {
  return (
    <section
      aria-label="Company statistics awaiting verification"
      className="bg-navy py-14 text-on-dark"
    >
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {placeholders.stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </Container>
    </section>
  );
}

import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InsightCard } from "@/components/ui/InsightCard";
import { Button } from "@/components/ui/Button";
import { TodoBadge } from "@/components/ui/TodoBadge";
export function InsightsGrid() {
  return (
    <section className="bg-paper py-section">
      <Container>
        <SectionHeading {...placeholders.headings.insights}>
          <Button href="/insights" variant="outline">
            View all insights
          </Button>
        </SectionHeading>
        <div
          aria-label="Insight category filter preview"
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          {placeholders.insightFilters.map((filter, index) => (
            <span
              key={filter.label}
              className={`rounded-card border px-4 py-2 text-xs ${index === 0 ? "border-surface-dark bg-surface-dark text-on-dark" : "border-line bg-surface text-muted"}`}
            >
              {filter.label}
            </span>
          ))}
          <TodoBadge />
        </div>
        <div className="grid gap-7 lg:grid-cols-[1.4fr_1fr]">
          {placeholders.insights.map((insight, index) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              featured={index === 0}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

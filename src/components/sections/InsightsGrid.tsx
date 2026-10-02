import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InsightCard } from "@/components/ui/InsightCard";
import { Button } from "@/components/ui/Button";
export function InsightsGrid() {
  return (
    <section className="py-section">
      <Container>
        <SectionHeading {...placeholders.headings.insights}>
          <Button href="/insights" variant="outline">
            View all insights
          </Button>
        </SectionHeading>
        <div className="grid gap-8 md:grid-cols-3">
          {placeholders.insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </Container>
    </section>
  );
}

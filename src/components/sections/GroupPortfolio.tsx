import Image from "next/image";
import { real } from "@/content/real";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function GroupPortfolio() {
  return (
    <section aria-labelledby="group-portfolio-heading" className="on-light bg-paper py-section">
      <Container>
        <SectionHeading id="group-portfolio-heading" eyebrow="06 / Our group in Qatar" title="Local capability. Shared ambition.">
          <Button href="/about" variant="outline">Explore our company</Button>
        </SectionHeading>
        <p className="mb-10 max-w-3xl text-lead text-[var(--fg-body)]">
          Dodzel has acquired and integrated Belgrass Construction Company and Bimex Trading Company into its portfolio, strengthening local capabilities for clients across Qatar’s oil and gas, construction, industrial and infrastructure sectors.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {real.qatarPortfolio.map((company, index) => (
            <article key={company.name} className="flex flex-col rounded-card border border-line border-t-4 border-t-accent-2 bg-white p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between gap-6">
                <Image src={company.logo} alt={`${company.name} logo`} width={180} height={96} sizes="180px" className="h-24 w-44 object-contain" />
                <span className="font-mono text-sm text-[var(--fg-muted)]">0{index + 1} / Qatar</span>
              </div>
              <p className="eyebrow mb-3 type-label">{company.role}</p>
              <h3 className="mb-4">{company.fullName}</h3>
              <p className="mb-8 flex-1 leading-relaxed text-[var(--fg-body)]">{company.description}</p>
              <Button href={company.href} variant="outline" className="self-start">About {company.name}</Button>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl leading-relaxed text-[var(--fg-body)]">{real.expansion.commitment}</p>
      </Container>
    </section>
  );
}

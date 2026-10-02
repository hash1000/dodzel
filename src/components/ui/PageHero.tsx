import { Container } from "./Container";
export function PageHero({ title }: { title: string }) {
  return (
    <section className="bg-navy pb-16 pt-44 text-on-dark">
      <Container>
        <p className="mb-5 text-xs uppercase tracking-widest text-amber">
          Dodzel Engineering
        </p>
        <h1 className="text-page font-semibold">{title}</h1>
      </Container>
    </section>
  );
}

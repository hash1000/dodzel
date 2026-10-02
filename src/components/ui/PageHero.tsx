import { Container } from "./Container";
import { MediaFrame } from "./MediaFrame";
export function PageHero({ title }: { title: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-surface-dark pb-16 pt-44 text-on-dark">
      <MediaFrame
        slot={title}
        className="absolute inset-0 -z-10 h-full w-full [&>div:last-child]:top-28"
      />
      <div className="hero-shade absolute inset-0 -z-10" />
      <Container>
        <p className="mb-5 text-xs uppercase tracking-widest text-accent">
          Dodzel Engineering
        </p>
        <h1 className="text-page font-semibold">{title}</h1>
      </Container>
    </section>
  );
}

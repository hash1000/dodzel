import { Hero } from "@/components/sections/Hero";
import { IntentSelector } from "@/components/sections/IntentSelector";
import { TrustStats } from "@/components/sections/TrustStats";
import { ServicesGroups } from "@/components/sections/ServicesGroups";
import { SectorsGrid } from "@/components/sections/SectorsGrid";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { QhseCertifications } from "@/components/sections/QhseCertifications";
import { InsightsGrid } from "@/components/sections/InsightsGrid";
import { PresenceMap } from "@/components/sections/PresenceMap";
import { CareersTeaser } from "@/components/sections/CareersTeaser";
import { ClosingCta } from "@/components/sections/ClosingCta";
export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <IntentSelector />
      <TrustStats />
      <ServicesGroups />
      <SectorsGrid />
      <HowWeWork />
      <FeaturedProjects />
      <QhseCertifications />
      <InsightsGrid />
      <PresenceMap />
      <CareersTeaser />
      <ClosingCta />
    </main>
  );
}

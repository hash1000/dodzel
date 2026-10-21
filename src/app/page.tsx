import { pageMetadata } from "@/lib/metadata";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { CompanyIntro } from "@/components/sections/CompanyIntro";
import { Hero } from "@/components/sections/Hero";
import { IntentSelector } from "@/components/sections/IntentSelector";
import { TrustStats } from "@/components/sections/TrustStats";
import { ServicesGroups } from "@/components/sections/ServicesGroups";
import { SectorsGrid } from "@/components/sections/SectorsGrid";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { QhseCertifications } from "@/components/sections/QhseCertifications";
import { GroupPortfolio } from "@/components/sections/GroupPortfolio";
import { PresenceMap } from "@/components/sections/PresenceMap";
import { CareersTeaser } from "@/components/sections/CareersTeaser";
import { ClosingCta } from "@/components/sections/ClosingCta";
export function generateMetadata() {
  return pageMetadata("Engineering & Industrial Construction", "/");
}
export default function Home() {
  return (
    <main id="main-content">
      <OrganizationJsonLd />
      <Hero />
      <IntentSelector />
      <CompanyIntro />
      <TrustStats />
      <ServicesGroups />
      <SectorsGrid />
      <QhseCertifications />
      <GroupPortfolio />
      <HowWeWork />
      <PresenceMap />
      <CareersTeaser />
      <ClosingCta />
    </main>
  );
}

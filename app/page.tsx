import { getHomepageContent, getPageContent } from "@/lib/api";
import { generatePageMetadata, buildCanonicalUrl } from "@/utils/metadata";
import {
  generateOrganizationJsonLd,
  generateWebsiteJsonLd,
  generateWebPageJsonLd,
  combineJsonLdSchemas,
  JsonLdScript
} from "@/utils/json-ld";
import { HeroSection } from "@/app/components/home/HeroSection";
import { FiveStarSection } from "@/app/components/home/FiveStarSection";
import { QuickLinksSection } from "@/app/components/home/QuickLinksSection";
import { TestimonialsSection } from "@/app/components/home/TestimonialsSection";
import { StatsSection } from "@/app/components/home/StatsSection";
import { CTASection } from "@/app/components/home/CTASection";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://atlantis-plongee.gp";

export async function generateMetadata() {
  const content = await getPageContent("Accueil");

  return generatePageMetadata(
    content.seo?.title || "Atlantis Plongée Guadeloupe",
    content.seo?.description || "Club de plongée PADI 5 Star",
    {
      canonicalUrl: buildCanonicalUrl(baseUrl, "/"),
      images: content.seo?.image ? [{
        url: content.seo.image,
        width: 1200,
        height: 630,
        alt: content.seo?.imageAlt || "Atlantis Plongée"
      }] : undefined,
      robots: {
        index: true,
        follow: true,
      }
    }
  );
}

export default async function Page() {
  const content = await getPageContent("Accueil");

  // JSON-LD schemas
  const schemas = [];

  schemas.push(generateOrganizationJsonLd({
    name: "Atlantis Plongée Guadeloupe",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: "Club de plongée certifié PADI 5 Star en Guadeloupe",
  }));

  schemas.push(generateWebsiteJsonLd({
    name: "Atlantis Plongée",
    url: baseUrl,
    description: content.seo?.description || "Club de plongée PADI 5 Star",
  }));

  schemas.push(generateWebPageJsonLd({
    name: content.seo?.title || "Atlantis Plongée",
    url: buildCanonicalUrl(baseUrl, "/"),
    description: content.seo?.description || "",
    isPartOf: baseUrl,
  }));

  const combinedJsonLd = combineJsonLdSchemas(schemas);

  return (
    <>
      <JsonLdScript data={combinedJsonLd} />
      <div className="min-h-screen bg-white">
        <HeroSection content={content.home.hero} />
        <FiveStarSection content={content.home.fiveStar} />
        <QuickLinksSection content={content.home.quickLinks} />
        <TestimonialsSection content={content.home.testimonials} />
        <StatsSection content={content.home.stats} />
        <CTASection content={content.home.cta} />
      </div>
    </>
  );
}

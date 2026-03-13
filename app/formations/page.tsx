import { getFormations, getImagesByIds, getPageContent } from "@/lib/api";
import { generatePageMetadata, buildCanonicalUrl } from "@/utils/metadata";
import { FormationsContent } from "../components/formations/FormationsContent";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.atlantisplongee.com";

export async function generateMetadata() {
  const content = await getPageContent("Formations");

  return generatePageMetadata(
    content.seo?.title || "Formations Plongée PADI & FFESSM | Atlantis Plongée Guadeloupe",
    content.seo?.description || "Formations de plongée certifiées PADI et École Française en Guadeloupe. Du débutant au professionnel avec nos moniteurs diplômés.",
    {
      canonicalUrl: buildCanonicalUrl(baseUrl, "/formations"),
      images: content.seo?.image ? [{
        url: content.seo.image,
        width: 1200,
        height: 630,
        alt: content.seo?.imageAlt || "Formation plongée en Guadeloupe"
      }] : undefined,
      robots: {
        index: true,
        follow: true,
      }
    }
  );
}

export default async function FormationsPage() {
  const content = await getPageContent("Formations");
  const articles = await getFormations();
  const imageHero = await getImagesByIds(["2KkWng4Qd5pErm1uvSTxSX"]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.seo?.title || "Formations Plongée PADI & FFESSM | Atlantis Plongée Guadeloupe",
    description: content.seo?.description || "Formations de plongée certifiées PADI et École Française en Guadeloupe.",
    url: `${baseUrl}/formations`,
    serviceType: "Formation plongée sous-marine",
    provider: {
      "@type": "Organization",
      name: "Atlantis Plongée Guadeloupe",
      url: baseUrl,
    },
    areaServed: {
      "@type": "Place",
      name: "Guadeloupe",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <FormationsContent content={content} articles={articles} imageHero={imageHero} />
    </>
  );
}

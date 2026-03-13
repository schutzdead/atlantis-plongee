import { getImagesByIds, getPageContent } from "@/lib/api";
import { generatePageMetadata, buildCanonicalUrl } from "@/utils/metadata";
import { PrixContent } from "../components/prix/PrixContent";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.atlantisplongee.com";

export async function generateMetadata() {
  const content = await getPageContent("Prix");

  return generatePageMetadata(
    content.seo?.title || "Tarifs Plongée | Atlantis Plongée Guadeloupe",
    content.seo?.description || "Consultez nos tarifs pour les baptêmes, formations et plongées exploration en Guadeloupe. Forfaits avantageux disponibles.",
    {
      canonicalUrl: buildCanonicalUrl(baseUrl, "/prix"),
      images: content.seo?.image ? [{
        url: content.seo.image,
        width: 1200,
        height: 630,
        alt: content.seo?.imageAlt || "Tarifs plongée Guadeloupe"
      }] : undefined,
      robots: {
        index: true,
        follow: true,
      }
    }
  );
}

export default async function PrixPage() {
  const content = await getPageContent("Prix");
  const imageHero = await getImagesByIds(["5ACUDjoXknTQ18NPnGs7XW"]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.seo?.title || "Tarifs Plongée | Atlantis Plongée Guadeloupe",
    description: content.seo?.description || "Consultez nos tarifs pour les baptêmes, formations et plongées exploration en Guadeloupe.",
    url: `${baseUrl}/prix`,
    mainEntity: {
      "@type": "Service",
      name: "Plongée sous-marine en Guadeloupe",
      provider: {
        "@type": "Organization",
        name: "Atlantis Plongée Guadeloupe",
        url: baseUrl,
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        offerCount: "3",
        lowPrice: "45",
        highPrice: "500",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PrixContent content={content} imageHero={imageHero} />
    </>
  );
}

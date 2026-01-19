import { getImagesByIds, getPageContent, getSites } from "@/lib/api";
import { generatePageMetadata, buildCanonicalUrl } from "@/utils/metadata";
import { SitesContent } from "../components/sites/SitesContent";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://atlantis-plongee.gp";

export async function generateMetadata() {
  const content = await getPageContent("Sites");

  return generatePageMetadata(
    content.seo?.title || "Sites de Plongée | Atlantis Plongée Guadeloupe",
    content.seo?.description || "Découvrez les plus beaux sites de plongée de la Réserve Cousteau en Guadeloupe. Épaves, récifs coralliens et faune marine exceptionnelle.",
    {
      canonicalUrl: buildCanonicalUrl(baseUrl, "/sites"),
      images: content.seo?.image ? [{
        url: content.seo.image,
        width: 1200,
        height: 630,
        alt: content.seo?.imageAlt || "Sites de plongée Guadeloupe"
      }] : undefined,
      robots: {
        index: true,
        follow: true,
      }
    }
  );
}

export default async function SitesPage() {
  const content = await getPageContent("Sites");
  const articles = await getSites();
  const imageHero = await getImagesByIds(["zW9SBpBSOK7pP9WLI1ZTJ"]);

  return <SitesContent content={content} articles={articles} imageHero={imageHero} />;
}

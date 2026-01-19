import { getExploration, getImagesByIds, getPageContent } from "@/lib/api";
import { generatePageMetadata, buildCanonicalUrl } from "@/utils/metadata";
import { ExplorationContent } from "../components/exploration/ExplorationContent";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://atlantis-plongee.gp";

export async function generateMetadata() {
  const content = await getPageContent("Exploration");

  return generatePageMetadata(
    content.seo?.title || "Plongées Exploration | Atlantis Plongée Guadeloupe",
    content.seo?.description || "Explorez les fonds marins de la Réserve Cousteau en Guadeloupe. Plongées encadrées ou en autonomie pour plongeurs certifiés.",
    {
      canonicalUrl: buildCanonicalUrl(baseUrl, "/exploration"),
      images: content.seo?.image ? [{
        url: content.seo.image,
        width: 1200,
        height: 630,
        alt: content.seo?.imageAlt || "Plongée exploration en Guadeloupe"
      }] : undefined,
      robots: {
        index: true,
        follow: true,
      }
    }
  );
}

export default async function ExplorationPage() {
  const content = await getPageContent("Exploration");
  const articles = await getExploration();
  const imageHero = await getImagesByIds(["4EDDHrhn9bHVZugHkVArBH"]);

  return <ExplorationContent content={content} articles={articles} imageHero={imageHero} />;
}

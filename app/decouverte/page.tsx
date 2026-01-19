import { getDecouvertes, getImagesByIds, getPageContent } from "@/lib/api";
import { generatePageMetadata, buildCanonicalUrl } from "@/utils/metadata";
import { DecouverteContent } from "../components/decouverte/DecouverteContent";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://atlantis-plongee.gp";

export async function generateMetadata() {
  const content = await getPageContent("Découverte");

  return generatePageMetadata(
    content.seo?.title || "Baptêmes & Initiations | Atlantis Plongée Guadeloupe",
    content.seo?.description || "Découvrez la plongée sous-marine en Guadeloupe avec nos baptêmes et initiations encadrés par des moniteurs diplômés.",
    {
      canonicalUrl: buildCanonicalUrl(baseUrl, "/decouverte"),
      images: content.seo?.image ? [{
        url: content.seo.image,
        width: 1200,
        height: 630,
        alt: content.seo?.imageAlt || "Baptême de plongée en Guadeloupe"
      }] : undefined,
      robots: {
        index: true,
        follow: true,
      }
    }
  );
}

export default async function DecouvPage() {
  const content = await getPageContent("Découverte");
  const articles = await getDecouvertes();
  const imageHero = await getImagesByIds(["1ezazr4Xn27Rx6YEbDYkG9"]);
  return <DecouverteContent content={content} articles={articles} imageHero={imageHero} />;
}

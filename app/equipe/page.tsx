import { getImagesByIds, getPageContent, getTeam } from "@/lib/api";
import { generatePageMetadata, buildCanonicalUrl } from "@/utils/metadata";
import { EquipeContent } from "../components/equipe/EquipeContent";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://atlantis-plongee.gp";

export async function generateMetadata() {
  const content = await getPageContent("Equipe");

  return generatePageMetadata(
    content.seo?.title || "Notre Équipe | Atlantis Plongée Guadeloupe",
    content.seo?.description || "Découvrez l'équipe passionnée d'Atlantis Plongée. Moniteurs diplômés et professionnels dévoués à votre sécurité en Guadeloupe.",
    {
      canonicalUrl: buildCanonicalUrl(baseUrl, "/equipe"),
      images: content.seo?.image ? [{
        url: content.seo.image,
        width: 1200,
        height: 630,
        alt: content.seo?.imageAlt || "Équipe Atlantis Plongée Guadeloupe"
      }] : undefined,
      robots: {
        index: true,
        follow: true,
      }
    }
  );
}

export default async function EquipePage() {
  const content = await getPageContent("Equipe");
  const articles = await getTeam();
  const imageHero = await getImagesByIds(["3rpR6tIVnWLFw4127BhXwx"]);

  return <EquipeContent content={content} articles={articles} imageHero={imageHero} />;
}

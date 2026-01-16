import { getImagesByIds, getPageContent, getTeam } from "@/lib/api";
import { EquipeContent } from "../components/equipe/EquipeContent";

export default async function EquipePage() {
  const content = await getPageContent("Equipe");
  const articles = await getTeam();
  const imageHero = await getImagesByIds(["3rpR6tIVnWLFw4127BhXwx"]);

  return <EquipeContent content={content} articles={articles} imageHero={imageHero} />;
}

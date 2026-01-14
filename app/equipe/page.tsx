import { getPageContent, getTeam } from "@/lib/api";
import { EquipeContent } from "../components/equipe/EquipeContent";

export default async function EquipePage() {
  const content = await getPageContent("Equipe");
  const articles = await getTeam();

  return <EquipeContent content={content} articles={articles} />;
}

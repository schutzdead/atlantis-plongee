import { getPageContent } from "@/lib/api";
import { EquipeContent } from "../components/equipe/EquipeContent";

export default async function EquipePage() {
  const content = await getPageContent("Equipe");

  return <EquipeContent content={content} />;
}

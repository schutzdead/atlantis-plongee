import { getExploration, getPageContent } from "@/lib/api";
import { ExplorationContent } from "../components/exploration/ExplorationContent";

export default async function ExplorationPage() {
  const content = await getPageContent("Exploration");
  const articles = await getExploration();

  return <ExplorationContent content={content} articles={articles} />;
}

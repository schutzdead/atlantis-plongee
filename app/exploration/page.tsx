import { getExploration, getImagesByIds, getPageContent } from "@/lib/api";
import { ExplorationContent } from "../components/exploration/ExplorationContent";

export default async function ExplorationPage() {
  const content = await getPageContent("Exploration");
  const articles = await getExploration();
  const imageHero = await getImagesByIds(["4EDDHrhn9bHVZugHkVArBH"]);

  return <ExplorationContent content={content} articles={articles} imageHero={imageHero} />;
}

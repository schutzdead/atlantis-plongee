import { getFormations, getImagesByIds, getPageContent } from "@/lib/api";
import { FormationsContent } from "../components/formations/FormationsContent";

export default async function FormationsPage() {
  const content = await getPageContent("Formations");
  const articles = await getFormations();
  const imageHero = await getImagesByIds(["2KkWng4Qd5pErm1uvSTxSX"]);

  return <FormationsContent content={content} articles={articles} imageHero={imageHero} />;
}

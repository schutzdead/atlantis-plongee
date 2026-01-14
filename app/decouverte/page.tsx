import { getDecouvertes, getImagesByIds, getPageContent } from "@/lib/api";
import { DecouverteContent } from "../components/decouverte/DecouverteContent";

export default async function DecouvPage() {
  const content = await getPageContent("Découverte");
  const articles = await getDecouvertes();
  const imageHero = await getImagesByIds(["1ezazr4Xn27Rx6YEbDYkG9"]); 
  return <DecouverteContent content={content} articles={articles} imageHero={imageHero} />;
}

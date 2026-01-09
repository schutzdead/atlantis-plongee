import { getDecouvertes, getPageContent } from "@/lib/api";
import { DecouverteContent } from "../components/decouverte/DecouverteContent";

export default async function DecouvPage() {
  const content = await getPageContent("Découverte");
  const articles = await getDecouvertes();

  return <DecouverteContent content={content} articles={articles} />;
}

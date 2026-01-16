import { getImagesByIds, getPageContent, getSites } from "@/lib/api";
import { SitesContent } from "../components/sites/SitesContent";

export default async function SitesPage() {
  const content = await getPageContent("Sites");
  const articles = await getSites();
  const imageHero = await getImagesByIds(["zW9SBpBSOK7pP9WLI1ZTJ"]);

  return <SitesContent content={content} articles={articles} imageHero={imageHero} />;
}

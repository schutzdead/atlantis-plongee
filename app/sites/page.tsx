import { getPageContent, getSites } from "@/lib/api";
import { SitesContent } from "../components/sites/SitesContent";

export default async function SitesPage() {
  const content = await getPageContent("Sites");
  const articles = await getSites();

  return <SitesContent content={content} articles={articles} />;
}

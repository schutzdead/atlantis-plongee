import { getPageContent } from "@/lib/api";
import { SitesContent } from "../components/sites/SitesContent";

export default async function SitesPage() {
  const content = await getPageContent("Sites");

  return <SitesContent content={content} />;
}

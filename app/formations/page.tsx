import { getFormations, getPageContent } from "@/lib/api";
import { FormationsContent } from "../components/formations/FormationsContent";

export default async function FormationsPage() {
  const content = await getPageContent("Formations");
  const articles = await getFormations();

  return <FormationsContent content={content} articles={articles} />;
}

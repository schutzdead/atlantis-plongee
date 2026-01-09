import { getPageContent } from "@/lib/api";
import { FormationsContent } from "../components/formations/FormationsContent";

export default async function FormationsPage() {
  const content = await getPageContent("Formations");

  return <FormationsContent content={content} />;
}

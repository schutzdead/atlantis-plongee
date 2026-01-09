import { getPageContent } from "@/lib/api";
import { PrixContent } from "../components/prix/PrixContent";

export default async function PrixPage() {
  const content = await getPageContent("Prix");

  return <PrixContent content={content} />;
}

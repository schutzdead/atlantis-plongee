import { getImagesByIds, getPageContent } from "@/lib/api";
import { PrixContent } from "../components/prix/PrixContent";

export default async function PrixPage() {
  const content = await getPageContent("Prix");
  const imageHero = await getImagesByIds(["5ACUDjoXknTQ18NPnGs7XW"]);

  return <PrixContent content={content} imageHero={imageHero} />;
}

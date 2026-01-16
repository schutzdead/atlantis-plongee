import { getImagesByIds, getPageContent } from "@/lib/api";
import { ContactContent } from "../components/contact/ContactContent";

export default async function ContactPage() {
  const content = await getPageContent("Contact");
  const imageHero = await getImagesByIds(["4W5mcrAe9lLqKyk3awcA1r"]);

  return <ContactContent content={content} imageHero={imageHero} />;
}

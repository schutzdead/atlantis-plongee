import { getPageContent } from "@/lib/api";
import { ContactContent } from "../components/contact/ContactContent";

export default async function ContactPage() {
  const content = await getPageContent("Contact");

  return <ContactContent content={content} />;
}

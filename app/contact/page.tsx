import { getImagesByIds, getPageContent } from "@/lib/api";
import { generatePageMetadata, buildCanonicalUrl } from "@/utils/metadata";
import { ContactContent } from "../components/contact/ContactContent";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.atlantisplongee.com";

export async function generateMetadata() {
  const content = await getPageContent("Contact");

  return generatePageMetadata(
    content.seo?.title || "Contact | Atlantis Plongée Guadeloupe",
    content.seo?.description || "Contactez Atlantis Plongée pour réserver votre plongée en Guadeloupe. Plage de Malendure, Bouillante.",
    {
      canonicalUrl: buildCanonicalUrl(baseUrl, "/contact"),
      images: content.seo?.image ? [{
        url: content.seo.image,
        width: 1200,
        height: 630,
        alt: content.seo?.imageAlt || "Contact Atlantis Plongée"
      }] : undefined,
      robots: {
        index: true,
        follow: true,
      }
    }
  );
}

export default async function ContactPage() {
  const content = await getPageContent("Contact");
  const imageHero = await getImagesByIds(["4W5mcrAe9lLqKyk3awcA1r"]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: content.seo?.title || "Contact | Atlantis Plongée Guadeloupe",
    description: content.seo?.description || "Contactez Atlantis Plongée pour réserver votre plongée en Guadeloupe.",
    url: `${baseUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "Atlantis Plongée Guadeloupe",
      url: baseUrl,
      telephone: "+590 590 98 82 43",
      email: "atlantisplongee971@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plage de Malendure",
        addressLocality: "Bouillante",
        postalCode: "97125",
        addressCountry: "GP",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ContactContent content={content} imageHero={imageHero} />
    </>
  );
}

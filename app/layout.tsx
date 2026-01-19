import { Header } from "./components/shared/Header";
import { Footer } from "./components/shared/Footer";
import { getPageContent } from "@/lib/api";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getPageContent("Accueil");

  const headerContent = content?.header;
  const footerContent = content?.footer;

  return (
    <html lang="fr">
      <body style={{ fontFamily: 'var(--font-sans)' }}>
        <Header
          navLinks={headerContent?.navLinks}
          ctaLabel={headerContent?.ctaLabel}
        />
        <main>
          {children}
        </main>
        <Footer
          navLinks={footerContent?.navLinks}
          content={footerContent}
        />
      </body>
    </html>
  );
}

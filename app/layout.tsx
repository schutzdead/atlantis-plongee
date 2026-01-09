import { Header } from "./components/shared/Header";
import { Footer } from "./components/shared/Footer";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'var(--font-sans)' }}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

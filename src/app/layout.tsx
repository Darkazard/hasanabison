import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import ClientLayout from "@/components/ClientLayout";
import { TripTypeProvider } from '@/contexts/TripTypeContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Star Holiday Transfer",
  description: "Star Holiday Transfer - Airport Transfer Service",
  alternates: {
    canonical: "https://holidaytransfer.com",
    languages: {
      'en': '/en',
      'de': '/de',
      'ru': '/ru',
      'tr': '/'
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="overflow-x-hidden">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="alternate" href="https://holidaytransfer.com" hrefLang="tr" />
        <link rel="alternate" href="https://holidaytransfer.com/en" hrefLang="en" />
        <link rel="alternate" href="https://holidaytransfer.com/de" hrefLang="de" />
        <link rel="alternate" href="https://holidaytransfer.com/ru" hrefLang="ru" />
        <link rel="alternate" href="https://holidaytransfer.com" hrefLang="x-default" />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <TripTypeProvider>
          <LanguageProvider>
            <main className="min-h-screen bg-black">
              <ClientLayout>{children}</ClientLayout>
            </main>
          </LanguageProvider>
        </TripTypeProvider>
      </body>
    </html>
  );
}

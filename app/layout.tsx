import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { getLocale } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vr-education-hub.com"),
  title: "VR Education Hub",
  description:
    "Learn VR in Education — Get Help When You Need It. Master virtual reality integration with our guided Bootcamp and documentation.",
  openGraph: {
    type: "website",
    siteName: "VR Education Hub",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VR Education Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={GeistSans.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}

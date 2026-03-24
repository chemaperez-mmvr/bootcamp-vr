import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { getLocale } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "VR Education Hub",
  description:
    "Learn VR in Education — Get Help When You Need It. Master virtual reality integration with our guided Bootcamp and documentation.",
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

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.heymiax.com"),
  title: {
    default: "hey.mia",
    template: "%s | hey.mia",
  },
  description:
    "Mia Xia's personal website for writing, photos, product notes, and selected work.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Mia Xia",
    "Product Operations",
    "Developer Ecosystem",
    "AI Agent",
    "Portfolio",
  ],
  openGraph: {
    title: "hey.mia",
    description:
      "Writing, photos, product notes, and selected work from Mia Xia.",
    url: "https://www.heymiax.com",
    siteName: "hey.mia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "hey.mia",
    description:
      "Writing, photos, product notes, and selected work from Mia Xia.",
    site: "@Mia_Bohrium",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}

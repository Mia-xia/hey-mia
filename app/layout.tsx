import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://heymiax.com"),
  title: {
    default: "hey.mia",
    template: "%s | hey.mia",
  },
  description:
    "Mia Xia's personal website featuring product operations work, selected projects, and contact links.",
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
      "Product operations portfolio with selected projects, experience, and writing snippets.",
    url: "https://heymiax.com",
    siteName: "hey.mia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "hey.mia",
    description:
      "Product operations portfolio with selected projects, experience, and writing snippets.",
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
      </body>
    </html>
  );
}

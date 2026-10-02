import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteShell, SiteOnly } from "@/components/layout/SiteShell";
import "./globals.css";
const heading = localFont({
  src: [
    { path: "./fonts/barlow-400.woff2", weight: "400" },
    { path: "./fonts/barlow-500.woff2", weight: "500" },
    { path: "./fonts/barlow-600.woff2", weight: "600" },
    { path: "./fonts/barlow-700.woff2", weight: "700" },
  ],
  variable: "--font-heading",
  display: "swap",
});
const text = localFont({
  src: "./fonts/inter-100-900.woff2",
  weight: "100 900",
  variable: "--font-text",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: "Dodzel Engineering | Engineering, Procurement & Construction",
    template: "%s | Dodzel Engineering",
  },
  description:
    "Dodzel Engineering Limited is an EPC and industrial construction contractor serving Oil & Gas, Refining, Power and Cement in Pakistan, Qatar, Saudi Arabia and Iraq.",
  openGraph: {
    title: "Dodzel Engineering",
    description:
      "Engineering, procurement and industrial construction in Pakistan and the Gulf.",
    type: "website",
    locale: "en_GB",
    siteName: "Dodzel Engineering",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${text.variable} antialiased`}
    >
      <body className="font-sans">
        <SiteShell
          chrome={
            <>
              <SkipLink />
              <Navbar />
            </>
          }
        >
          {children}
          <SiteOnly>
            <Footer />
          </SiteOnly>
        </SiteShell>
      </body>
    </html>
  );
}

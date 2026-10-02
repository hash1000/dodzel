import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { SiteShell, SiteOnly } from "@/components/layout/SiteShell";
import "./globals.css";
// Saira variable weights 500–700, bundled at semi-condensed 87.5% width.
const heading = localFont({
  src: "./fonts/saira-500-700.woff2",
  weight: "500 700",
  variable: "--font-saira",
  display: "swap",
});
const text = localFont({
  src: [
    { path: "./fonts/ibm-plex-sans-400.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-sans-500.woff2", weight: "500" },
    { path: "./fonts/ibm-plex-sans-600.woff2", weight: "600" },
  ],
  variable: "--font-plex",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://dodzel.com"),
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

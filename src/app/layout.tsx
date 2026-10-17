import { IS_PRODUCTION, SHOW_TODO_BADGES } from "@/lib/constants";
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Loader } from "@/components/layout/Loader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteShell, SiteOnly } from "@/components/layout/SiteShell";
import "./globals.css";
const heading = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
  adjustFontFallback: true,
});
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  robots: IS_PRODUCTION
    ? { index: true, follow: true }
    : { index: false, follow: false },
  metadataBase: new URL("https://dodzel.com"),
  icons: {
    icon: "/assets/images/dodzel-favicon.jpeg",
    apple: "/assets/images/dodzel-favicon.jpeg",
  },
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
      data-review={SHOW_TODO_BADGES ? "1" : "0"}
      className={`${heading.variable} ${body.variable} antialiased`}
    >
      <body className="font-body">
        <Loader />
        {/* <ReviewModeSync /> */}
        <SiteShell
          chrome={
            <>
              {/* <SkipLink /> */}
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

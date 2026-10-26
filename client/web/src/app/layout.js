import localFont from "next/font/local";

import "./globals.css";

import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";
import QueryProvider from "@/providers/query-client-provider";
import { NuqsProvider } from "@/providers/nuqs-provider";
import ProductProvider from "@/providers/product-povider";
import CartSidebar from "@/components/ui/cart-sidebar";
import { Toaster } from "sonner";
import FloatingCta from "@/components/cta";
import FooterCta from "@/components/footer-cta";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Primary OPPOSans EN files. The Regular/Medium files only contain A-Z, a-z
// and 0-9 (no space or punctuation), so no fallback is set here — missing
// glyphs fall through to `oppoSans` below instead of a system font.
const oppoSansEn = localFont({
  src: [
    {
      path: "../../public/font/OPPOSans-R-EN.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/OPPOSans-M-EN.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/OPPOSans-B-EN.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-oppo-en",
  display: "swap",
  adjustFontFallback: false,
});

// Latin-only WOFF2 subsets (~18 KB each) of the original OPPOSans TTFs
// (~10 MB each, mostly CJK glyphs the site never shows). Only the weights the
// site uses are loaded: 400, 500 and 700 (600 resolves to 700).
const oppoSans = localFont({
  src: [
    {
      path: "../../public/font/opposans-latin/OPPOSansRegular-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/opposans-latin/OPPOSansMedium-latin.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/opposans-latin/OPPOSansBold-latin.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-oppo",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Natraj Furniture",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Modern office furniture, workstations, seating, storage, and customized workspace solutions by Natraj Furniture.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oppoSansEn.variable} ${oppoSans.variable} h-full antialiased`}>
     <body
        className="min-h-full flex flex-col font-oppo"
        suppressHydrationWarning
      >
      <ProductProvider>

        <QueryProvider>
          <NuqsProvider>
            <Navbar />
            {children}
            <FooterCta />
            <SiteFooter />
            <FloatingCta />
            <CartSidebar />
            <Toaster position="top-center" />
          </NuqsProvider>
        </QueryProvider>
</ProductProvider>
      </body>
    </html>
  );
}
import localFont from "next/font/local";

import "./globals.css";

import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";
import QueryProvider from "@/providers/query-client-provider";
import { NuqsProvider } from "@/providers/nuqs-provider";

const oppoSans = localFont({
  src: [
    {
      path: "../../public/font/opposans/OPPOSansLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/opposans/OPPOSansRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/opposans/OPPOSansMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/opposans/OPPOSansBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/font/opposans/OPPOSansHeavy.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-oppo",
});

export const metadata = {
  title: "NURFIA",
  description: "NURFIA Furniture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oppoSans.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col font-oppo"
        suppressHydrationWarning
      >
        <QueryProvider>
          <NuqsProvider>
            <Navbar />
            {children}
            <SiteFooter />
          </NuqsProvider>
        </QueryProvider>

      </body>
    </html>
  );
}
import type { Metadata } from "next";
import type { Viewport } from "next";
import { PwaRegistrar } from "@/components/PwaRegistrar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kredo | Referral Partner Platform",
  description: "Track every introduction from first application to settlement — with the commission trail kept clear.",
  applicationName: "Kredo",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kredo",
  },
  icons: {
    icon: "/icons/kredo-icon.svg",
    apple: "/icons/kredo-icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a1926",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f7f9fa] text-[#0e1e25]">
        {children}
        <PwaRegistrar />
      </body>
    </html>
  );
}

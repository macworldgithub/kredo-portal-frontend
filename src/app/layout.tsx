import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kredo | Referral Partner Platform",
  description: "Track every introduction from first application to settlement — with the commission trail kept clear.",
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
      </body>
    </html>
  );
}

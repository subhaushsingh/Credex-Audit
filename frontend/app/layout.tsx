import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Credex Audit | Optimize Your AI Spend",
  description: "Identify redundant subscriptions and calculate your Credex eligibility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}

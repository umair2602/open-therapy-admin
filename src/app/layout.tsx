import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Therapy Admin Panel",
  description:
    "Comprehensive admin dashboard for Open Therapy - AI-Powered Mental Health App",
  keywords: "mental health, therapy, admin, dashboard, AI therapy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">{children}
            <Toaster/>
          </div>
        </Providers>
      </body>
    </html>
  );
}

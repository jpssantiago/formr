import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

import "./globals.css"
import { SessionWrapper } from "@/components/session-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Formr",
  description: "Welcome to Formr!",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          {children}

          <Toaster richColors closeButton />
        </body>
      </html>
    </SessionWrapper>
  );
}

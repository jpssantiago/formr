import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

import { SessionWrapper } from "@/components/session-wrapper"
import { CreateFormProvider } from "@/contexts/create-form-context"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

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
      <CreateFormProvider>
        <TooltipProvider>
          <html lang="en">
            <body className={inter.className}>
              {children}

              <Toaster richColors closeButton />
            </body>
          </html>
        </TooltipProvider>
      </CreateFormProvider>
    </SessionWrapper>
  );
}

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ClickTracker } from "./ClickTracker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Business Analysis Academy",
  description: "A platform for business analysis learning and collaboration",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <ClickTracker>
            {children}
            <Toaster />
          </ClickTracker>
        </TooltipProvider>
      </body>
    </html>
  )
}

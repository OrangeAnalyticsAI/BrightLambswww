import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import Navigation from "@/app/components/Navigation"
import Footer from "@/app/components/Footer"

const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ['400', '700', '800'],
  style: ['normal', 'italic']
})

export const metadata: Metadata = {
  title: "Bright Lambs - Business Analysis as a Service (BAaaS)",
  description: "Expert business analysis solutions to help your business thrive",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased flex flex-col min-h-screen`}>
        <TooltipProvider>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  )
}

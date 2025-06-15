import type { Metadata } from "next"
import { Inter, Baloo_2 } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import Navigation from "@/app/components/Navigation"
import Footer from "@/app/components/Footer"
import Logo from '@/app/components/Logo'

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['300', '400', '600', '700']
})

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800']
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
      <body className={`${inter.className} ${baloo2.className} antialiased flex flex-col min-h-screen`}>
        <TooltipProvider>
          <Logo />
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

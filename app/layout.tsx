import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ClickTracker } from "./ClickTracker"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import SupabaseProvider from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Business Analysis Academy",
  description: "A platform for business analysis learning and collaboration",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <SupabaseProvider session={session}>
            <ClickTracker>
              {children}
              <Toaster />
            </ClickTracker>
          </SupabaseProvider>
        </TooltipProvider>
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodePaste - Share Your Code",
  description: "A modern pastebin for sharing code snippets",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="background-pattern"></div>
        <div className="container mx-auto max-w-6xl px-4 py-8 relative z-10">
          <Header />
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  )
}

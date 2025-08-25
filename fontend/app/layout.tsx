import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ChatBot from "@/components/chat-bot"
import { AuthProvider } from "@/context/AuthContext"
import Navbar from "@/components/NavBar"
import { ChatProvider } from "@/context/ChatContext"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "OG Camping Private - Hệ thống cắm trại thông minh",
  description: "Dịch vụ cắm trại và cho thuê thiết bị với AI tư vấn chuyên dụng",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${inter.className}`} suppressHydrationWarning>
        <AuthProvider>
          <ChatProvider>
            <Navbar />
            {children}
            <ChatBot />
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

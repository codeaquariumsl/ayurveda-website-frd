import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/components/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { WhatsAppButton } from "@/components/whatsapp-button"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl = "https://www.siddhakaayurveda.com"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Siddhaka Ayurveda - Holistic Healing Center in Thissamaharama",
    template: "%s | Siddhaka Ayurveda",
  },
  description:
    "Experience authentic Ayurvedic treatments and wellness in Thissamaharama, Sri Lanka. Guided by Dr. Nimeshika Madithiyawala for mind, body, and soul rejuvenation.",
  keywords: ["Ayurveda", "Sri Lanka", "Thissamaharama", "Wellness", "Holistic Healing", "Dr. Nimeshika Madithiyawala", "Panchakarma", "Ayurvedic Massage"],
  authors: [{ name: "Dr. Nimeshika Madithiyawala" }],
  creator: "Siddhaka Ayurveda",
  publisher: "Siddhaka Ayurveda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Siddhaka Ayurveda - Holistic Healing Center",
    description: "Authentic Ayurvedic treatments and wellness in Thissamaharama, Sri Lanka.",
    url: siteUrl,
    siteName: "Siddhaka Ayurveda",
    images: [
      {
        url: "/SlideImages/001.JPG",
        width: 1200,
        height: 630,
        alt: "Siddhaka Ayurveda Wellness Center",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siddhaka Ayurveda - Holistic Healing Center",
    description: "Authentic Ayurvedic treatments and wellness in Thissamaharama, Sri Lanka.",
    images: ["/SlideImages/001.JPG"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/Siddhaka_ayurveda_Logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Siddhaka Ayurveda" />
      </head>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

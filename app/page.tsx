import type { Metadata } from "next"
import HomePageClient from "@/components/home-page-client"

export const metadata: Metadata = {
  title: "Siddhaka Ayurveda",
  description:
    "Reconnect, rejuvenate, and restore your natural balance with authentic Ayurvedic treatments. Guided by Dr. Nimeshika Madithiyawala in Thissamaharama, Sri Lanka.",
  keywords: ["Ayurveda Sri Lanka", "Thissamaharama Wellness", "Dr. Nimeshika Madithiyawala", "Panchakarma Center", "Natural Healing"],
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Siddhaka Ayurveda",
            "image": "https://www.siddhakaayurveda.com/Siddhaka_ayurveda_Logo.png",
            "@id": "https://www.siddhakaayurveda.com",
            "url": "https://www.siddhakaayurveda.com",
            "telephone": "+94773707808",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Beralihela Road, Sandungama",
              "addressLocality": "Thissamaharama",
              "addressRegion": "Southern Province",
              "postalCode": "82600",
              "addressCountry": "LK"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 6.308234,
              "longitude": 81.264985
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            },
            "sameAs": [
              "https://www.facebook.com/profile.php?id=100083591983365",
              "https://www.instagram.com/siddhakaayurveda/",
              "https://www.linkedin.com/company/siddhaka-ayurveda/"
            ]
          }),
        }}
      />

      <HomePageClient />
    </main>
  )
}

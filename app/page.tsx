import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import HeroSlider from "@/components/hero-slider"

export const metadata: Metadata = {
  title: "Siddhaka Ayurveda | Authentic Ayurvedic Healing in Thissamaharama",
  description:
    "Reconnect, rejuvenate, and restore your natural balance with authentic Ayurvedic treatments. Guided by Dr. Nimeshika Madithiyawala in Thissamaharama, Sri Lanka.",
  keywords: ["Ayurveda Sri Lanka", "Thissamaharama Wellness", "Dr. Nimeshika Madithiyawala", "Panchakarma Center", "Natural Healing"],
}

export default function Home() {
  const whyChooseReasons = [
    {
      title: "Officially Registered and Recognized",
      description:
        "Siddhaka Ayurveda is fully registered under the Department of Ayurveda, ensuring adherence to established quality, safety, and regulatory standards.",
    },
    {
      title: "Supervised by Qualified Doctors",
      description:
        "All treatments are conducted under the guidance of graduate Ayurvedic doctors registered with the Department of Ayurveda, ensuring safe and professional care.",
    },
    {
      title: "Professional and Skilled Therapists",
      description:
        "Our trained and compassionate therapists provide attentive, personalized care, maintaining authenticity and respect for traditional Ayurvedic practices.",
    },
    {
      title: "Commitment to Excellence",
      description:
        "We uphold high standards of hygiene, safety, and ethical practice at every stage of your wellness journey.",
    },
    {
      title: "Natural High-Quality Ingredients",
      description:
        "We use carefully selected natural herbs and oils, ethically sourced to support effective and gentle healing.",
    },
  ]

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

      <HeroSlider />

      {/* Welcome Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/006.JPG" //  /wellcome.JPG
            alt="Wellness Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Image
              src="/Siddhaka_ayurveda_Logo.png"
              alt="Siddhaka Ayurveda Logo"
              width={240}
              height={80}
              className="mx-auto mb-8 h-20 w-auto"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              Welcome to Siddhaka Ayurveda
            </h1>
            <p className="text-lg text-primary font-bold mb-6 italic tracking-wide">
              "Reconnect. Rejuvenate. Restore your natural balance."
            </p>
            <p className="text-lg text-muted-foreground text-balance leading-relaxed">
              Welcome to Siddhaka Ayurveda — a serene haven for holistic healing nestled in the peaceful surroundings of
              Thissamaharama. Guided by Dr. Nimeshika Madithiyawala, we provide authentic Ayurvedic treatments designed
              to help you reconnect and rejuvenate your mind, body, and soul. At Siddhaka Ayurveda, wellness is a
              journey, and we are here to guide you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Us</h2>
          <p className="text-lg text-primary font-semibold mb-6 italic">
            "Ancient wisdom, personalized for your modern life."
          </p>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Siddhaka Ayurveda is a holistic healing center dedicated to promoting natural health through the wisdom of
              classical Ayurveda. We combine personalized consultations, traditional therapies, and mindful lifestyle
              guidance to support each individual's unique constitution.
            </p>
            <p>
              Under the guidance of Dr. Nimeshika Madithiyawala, our focus is on addressing the root causes of imbalance
              rather than just treating symptoms. In our calm and nurturing environment, we help you restore harmony,
              revitalize energy, and cultivate long-term wellness in a way that fits modern life.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vision Tile */}
            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-sm text-primary font-semibold mb-3 italic">
                "Inspiring holistic living and natural wellness for everyone."
              </p>
              <p className="text-muted-foreground leading-relaxed">
                To be a trusted center of Ayurvedic healing, inspiring natural wellness and holistic living, where
                individuals can reconnect with their innate capacity for balance, vitality, and well-being.
              </p>
            </div>

            {/* Mission Tile */}
            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-sm text-primary font-semibold mb-3 italic">
                "Compassionate care rooted in authentic Ayurveda."
              </p>
              <p className="text-muted-foreground leading-relaxed">
                To provide authentic, personalized Ayurvedic care rooted in classical wisdom, delivered with compassion
                and professionalism. We aim to nurture mind, body, and soul by addressing the root causes of imbalance,
                promoting natural healing, and supporting sustainable wellness in everyday life.
              </p>
            </div>

            {/* Concept Tile */}
            <div className="bg-background rounded-lg p-6 border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-3">Our Concept</h3>
              <p className="text-sm text-primary font-semibold mb-3 italic">
                "Healing mind, body, and soul — naturally, gently, sustainably."
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At Siddhaka Ayurveda, wellness is a journey of balance and harmony. Our approach blends classical
                Ayurvedic principles with practical lifestyle guidance to help you achieve natural health and vitality.
                We tailor each treatment to individual needs, focusing on root causes, rejuvenation, and sustainable
                self-care. In a peaceful and nurturing environment, we create space for the mind to find calm, the body
                to restore balance, and the soul to rejuvenate — supporting long-term well-being that fits seamlessly
                into modern life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Why Choose Siddhaka Ayurveda?</h3>
          <div className="space-y-4">
            {whyChooseReasons.map((reason, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary mt-0.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{reason.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-balance">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Head & Hair", href: "/treatments#head-care" },
              { title: "Body & Skin", href: "/treatments#body-care" },
              { title: "Facial Care", href: "/treatments#facial-care" },
              { title: "Foot Care", href: "/treatments#foot-care" },
            ].map((service, idx) => (
              <Link
                key={idx}
                href={service.href}
                className="p-5 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">Explore our specialties</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-6 text-balance">
            Schedule a consultation with Dr. Nimeshika Madithiyawala and discover your path to natural healing
          </p>
          <Link
            href="/packages"
            className="px-8 py-3 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity font-semibold inline-block"
          >
            Book Your Appointment
          </Link>
        </div>
      </section>
    </main>
  )
}

import type { Metadata } from "next"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Siddhaka Ayurveda",
  description:
    "Learn about Siddhaka Ayurveda's vision, mission, and approach to holistic healing guided by Dr. Nimeshika Madithiyawala.",
}

export default function AboutPage() {
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
      {/* Welcome Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-6 text-balance">
            Welcome to Siddhaka Ayurveda
          </h1>
          <p className="text-lg text-primary font-semibold text-center mb-8 italic">
            "Reconnect. Rejuvenate. Restore your natural balance."
          </p>
          <p className="text-lg text-muted-foreground text-center text-balance leading-relaxed">
            Welcome to Siddhaka Ayurveda — a serene haven for holistic healing nestled in the peaceful surroundings of
            Thissamaharama. Guided by Dr. Nimeshika Madithiyawala, we provide authentic Ayurvedic treatments designed to
            help you reconnect and rejuvenate your mind, body, and soul. At Siddhaka Ayurveda, wellness is a journey,
            and we are here to guide you every step of the way.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Us</h2>
            <p className="text-lg text-primary font-semibold mb-8 italic">
              "Ancient wisdom, personalized for your modern life."
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Siddhaka Ayurveda is a holistic healing center dedicated to promoting natural health through the wisdom
                of classical Ayurveda. We combine personalized consultations, traditional therapies, and mindful
                lifestyle guidance to support each individual's unique constitution.
              </p>
              <p>
                Under the guidance of Dr. Nimeshika Madithiyawala, our focus is on addressing the root causes of
                imbalance rather than just treating symptoms. In our calm and nurturing environment, we help you restore
                harmony, revitalize energy, and cultivate long-term wellness in a way that fits modern life.
              </p>
            </div>
          </div>

          {/* Vision Section */}
          <div className="mb-16 pb-16 border-b border-border">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Vision</h3>
            <p className="text-lg text-primary font-semibold mb-4 italic">
              "Inspiring holistic living and natural wellness for everyone."
            </p>
            <p className="text-muted-foreground leading-relaxed">
              To be a trusted center of Ayurvedic healing, inspiring natural wellness and holistic living, where
              individuals can reconnect with their innate capacity for balance, vitality, and well-being.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16 pb-16 border-b border-border">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-lg text-primary font-semibold mb-4 italic">
              "Compassionate care rooted in authentic Ayurveda."
            </p>
            <p className="text-muted-foreground leading-relaxed">
              To provide authentic, personalized Ayurvedic care rooted in classical wisdom, delivered with compassion
              and professionalism. We aim to nurture mind, body, and soul by addressing the root causes of imbalance,
              promoting natural healing, and supporting sustainable wellness in everyday life.
            </p>
          </div>

          {/* Concept Section */}
          <div className="mb-16 pb-16 border-b border-border">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Concept</h3>
            <p className="text-lg text-primary font-semibold mb-4 italic">
              "Healing mind, body, and soul — naturally, gently, sustainably."
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At Siddhaka Ayurveda, wellness is a journey of balance and harmony. Our approach blends classical
                Ayurvedic principles with practical lifestyle guidance to help you achieve natural health and vitality.
              </p>
              <p>
                We tailor each treatment to individual needs, focusing on root causes, rejuvenation, and sustainable
                self-care. In a peaceful and nurturing environment, we create space for the mind to find calm, the body
                to restore balance, and the soul to rejuvenate — supporting long-term well-being that fits seamlessly
                into modern life.
              </p>
            </div>
          </div>

          {/* Why Choose Section */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-12">Why Choose Siddhaka Ayurveda?</h3>
            <div className="space-y-6">
              {whyChooseReasons.map((reason, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary mt-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{reason.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Dr. Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Meet Dr. Nimeshika Madithiyawala</h2>
          <div className="bg-background rounded-xl p-8 border border-border">
            <p className="text-muted-foreground leading-relaxed">
              Dr. Nimeshika Madithiyawala is a highly qualified and dedicated Ayurvedic practitioner with years of
              experience in traditional healing therapies. Under her expert guidance, Siddhaka Ayurveda provides
              personalized treatments rooted in classical Ayurvedic wisdom. Her compassionate approach and deep
              understanding of individual constitutions ensure that each patient receives care tailored to their unique
              needs and wellness goals.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

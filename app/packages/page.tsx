"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"
import { WellnessPackageCard } from "@/components/wellness-package-card"
import { SignatureCard } from "@/components/signature-card"
import { TreatmentTabs } from "@/components/treatment-tabs"
import { useAuth } from "@/components/auth-context"
import { motion } from "framer-motion"
import Image from "next/image"

export default function PackagesPage() {
  const { packages, subcategories } = useAuth()
  const [selectedPackageInfo, setSelectedPackageInfo] = useState<{ name: string, id: string } | null>(null)

  const sortedPackages = [...packages].sort((a, b) => (a.index || 0) - (b.index || 0))
  const wellnessPackages = sortedPackages.filter(p => p.category === "wellness")
  const specialPackages = sortedPackages.filter(p => p.category === "special")
  const signaturePackages = sortedPackages.filter(p => p.category === "signature")

  const categories = subcategories.map((sub) => ({
    label: sub.name,
    sub: sub.slug,
  }))

  return (
    <main className="min-h-screen bg-background">
      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-border/50">
        {/* Background Mandala */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <Image
            src="/mandala_bg.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles size={14} className="text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Curated for Wellness</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tighter">
              Treatment <span className="text-primary">Packages</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              Discover our comprehensive range of authentic Ayurvedic treatments designed to heal, rejuvenate, and restore balance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">Our <span className="text-primary">Menu</span></h2>
            <div className="w-20 h-1.5 bg-primary/20 rounded-full" />
          </div>

          <TreatmentTabs
            tabs={[
              ...categories.map((cat) => ({
                id: cat.sub,
                name: cat.label,
                treatments: wellnessPackages
                  .filter((p) => p.subcategory === cat.sub)
                  .map((pkg) => ({
                    title: pkg.name,
                    duration: `${pkg.duration} minutes`,
                    description: pkg.description,
                    benefits: pkg.includes,
                    image: pkg.image || "",
                    type: "wellness",
                    _original: pkg,
                  })),
              })),
              {
                id: "special",
                name: "Special Packages",
                treatments: specialPackages.map((pkg) => ({
                  title: pkg.name,
                  duration: "",
                  description: pkg.description,
                  benefits: [],
                  image: pkg.image || "",
                  type: "special",
                  _original: pkg,
                })),
              },
              {
                id: "signature",
                name: "Signature Packages",
                treatments: signaturePackages.map((pkg) => ({
                  title: pkg.name,
                  duration: "",
                  description: pkg.description,
                  benefits: [],
                  image: pkg.image || "",
                  type: "signature",
                  _original: pkg,
                })),
              },
            ]}
            renderItem={(treatment: any) => {
              if (treatment.type === "special" || treatment.type === "signature") {
                return <SignatureCard pkg={treatment._original} />
              }
              return (
                <WellnessPackageCard
                  treatment={{
                    title: treatment.title,
                    duration: treatment.duration,
                    description: treatment.description,
                    image: treatment.image,
                  }}
                  onBookClick={() =>
                    setSelectedPackageInfo({
                      name: treatment.title,
                      id: treatment._original._id || treatment._original.id,
                    })
                  }
                />
              )
            }}
          />
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-20 bg-primary/5 border-y border-border/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Sparkles size={32} className="text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
              Unsure which package <span className="text-primary">fits you?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 font-medium max-w-2xl mx-auto">
              Schedule a general consultation with our expert practitioners to receive a personalized wellness roadmap.
            </p>
            <button
              onClick={() => setSelectedPackageInfo({ name: "General Consultation", id: "consultation" })}
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all font-bold text-lg shadow-xl shadow-primary/25 active:scale-95"
            >
              Consult with Doctor
            </button>
          </motion.div>
        </div>
      </section>

      <BookingModal
        isOpen={selectedPackageInfo !== null}
        onClose={() => setSelectedPackageInfo(null)}
        packageName={selectedPackageInfo?.name || ""}
        packageId={selectedPackageInfo?.id || ""}
      />
    </main>
  )
}

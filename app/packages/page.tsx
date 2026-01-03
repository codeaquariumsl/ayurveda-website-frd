"use client"

import { useState } from "react"
import { Clock, Check } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"
import { WellnessPackageCard } from "@/components/wellness-package-card"
import { useAuth, ServicePackage } from "@/components/auth-context"

function SignatureCard({ pkg }: { pkg: any }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <div className="rounded-lg border border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md overflow-hidden">
      {pkg.image && (
        <div className="w-full h-40 overflow-hidden">
          <img src={pkg.image || "/placeholder.svg"} alt={pkg.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-1">{pkg.name}</h3>
        <div className="flex items-center gap-2 mb-3 text-primary font-medium text-sm">
          <Clock size={14} />
          <span>{pkg.duration} minutes</span>
        </div>
        {pkg.focus && <p className="text-sm font-semibold text-primary mb-3">Focus: {pkg.focus}</p>}
        <p className="text-xs font-semibold text-foreground mb-2 uppercase">Includes:</p>
        <ul className="space-y-1 mb-3">
          {pkg.includes.map((item: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
              <Check size={12} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {pkg.benefits && (
          <p className="text-xs text-muted-foreground italic border-t border-primary/20 pt-2">
            Benefits: {pkg.benefits}
          </p>
        )}
        <button
          onClick={() => setIsBookingOpen(true)}
          className="w-full mt-3 py-2 bg-primary text-primary-foreground rounded font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Book Package
        </button>
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          packageName={pkg.name}
          packageId={pkg._id || pkg.id}
        />
      </div>
    </div>
  )
}

export default function PackagesPage() {
  const { packages } = useAuth()
  const [selectedPackageInfo, setSelectedPackageInfo] = useState<{ name: string, id: string } | null>(null)

  const wellnessPackages = packages.filter(p => p.category === "wellness")
  const specialPackages = packages.filter(p => p.category === "special")
  const signaturePackages = packages.filter(p => p.category === "signature")

  const categories = [
    { label: "Head & Hair Care", sub: "head-hair" },
    { label: "Body & Skin Care", sub: "body-skin" },
    { label: "Facial Care", sub: "facial" },
    { label: "Foot Care", sub: "foot" },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Treatment Packages</h1>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of authentic Ayurvedic treatments designed to heal, rejuvenate, and restore
            balance.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Menu for Wellness</h2>

          {categories.map((cat) => {
            const catPackages = wellnessPackages.filter(p => p.subcategory === cat.sub)
            if (catPackages.length === 0) return null

            return (
              <div key={cat.label} className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">{cat.label}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catPackages.map((pkg) => (
                    <WellnessPackageCard
                      key={pkg._id || pkg.id}
                      treatment={{
                        title: pkg.name,
                        duration: `${pkg.duration} minutes`,
                        description: pkg.description,
                        image: pkg.image
                      }}
                      onBookClick={() => setSelectedPackageInfo({ name: pkg.name, id: (pkg._id || pkg.id) as string })}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Special Packages */}
      {specialPackages.length > 0 && (
        <section className="py-8 md:py-10 bg-card/50">
          <div className="max-w-6xl mx-auto px-3 sm:px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-5">Special Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialPackages.map((pkg) => (
                <SignatureCard key={pkg._id || pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Signature Packages */}
      {signaturePackages.length > 0 && (
        <section className="py-8 md:py-10 bg-background">
          <div className="max-w-6xl mx-auto px-3 sm:px-4">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-5">Signature Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {signaturePackages.map((pkg) => (
                <SignatureCard key={pkg._id || pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-8 md:py-10 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">Start Your Wellness Journey</h2>
          <p className="text-base text-primary-foreground/90 mb-5">
            Contact us today to book your customized treatment package
          </p>
          <button
            onClick={() => setSelectedPackageInfo({ name: "General Consultation", id: "consultation" })}
            className="px-8 py-3 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Schedule Consultation
          </button>
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

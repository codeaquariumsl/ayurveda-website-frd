"use client"

import Link from "next/link"
import { TreatmentTabs } from "@/components/treatment-tabs"
import { useAuth } from "@/components/auth-context"

export default function TreatmentsPage() {
  const { packages } = useAuth()

  const categories = [
    { id: "head-care", name: "Head and Hair Care Treatments", sub: "head-hair" },
    { id: "body-care", name: "Body and Skin Care Treatments", sub: "body-skin" },
    { id: "facial-care", name: "Facial Care Treatments", sub: "facial" },
  ]

  const mainTabs = categories.map(cat => {
    const catPackages = packages.filter(p => p.category === "wellness" && p.subcategory === cat.sub)
    return {
      id: cat.id,
      name: cat.name,
      treatments: catPackages.map(pkg => ({
        title: pkg.name,
        duration: `${pkg.duration} minutes`,
        description: pkg.description,
        benefits: pkg.benefits ? [pkg.benefits] : pkg.includes,
        image: pkg.image || "/ayurvedic-body-massage-therapy.jpg"
      }))
    }
  })

  return (
    <main className="min-h-screen">
      <section className="py-8 md:py-12 bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">Our Treatments</h1>
          <p className="text-base md:text-lg text-muted-foreground text-balance">
            Discover our comprehensive range of authentic Ayurvedic treatments designed to heal, rejuvenate, and restore
            balance to your mind, body, and soul.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          {mainTabs.length > 0 && <TreatmentTabs tabs={mainTabs as any} />}
        </div>
      </section>

      <section className="py-8 md:py-12 bg-card">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Ready to Experience Healing?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 text-balance">
            Schedule your consultation with Dr. Nimeshika Madithiyawala to discover which treatment is right for you.
          </p>
          <Link
            href="/packages"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold text-lg text-center"
          >
            Book Your Treatment
          </Link>
        </div>
      </section>
    </main>
  )
}

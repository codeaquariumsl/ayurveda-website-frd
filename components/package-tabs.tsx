"use client"

import { useState } from "react"
import { Clock, Check } from "lucide-react"

interface Package {
  title: string
  duration: string
  price?: string
  treatments: string[]
  featured?: boolean
}

interface TabsProps {
  packages: {
    popular: Package[]
    signature: Package[]
    individual: Package[]
  }
}

function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div
      className={`rounded-xl p-6 border transition-all ${
        pkg.featured
          ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary shadow-lg"
          : "bg-card border-border hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">{pkg.title}</h3>
          <div className="flex items-center gap-2 mt-2 text-primary font-medium text-sm">
            <Clock size={14} />
            <span>{pkg.duration}</span>
          </div>
        </div>
        {pkg.featured && (
          <span className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
            Popular
          </span>
        )}
      </div>

      <ul className="space-y-2 mb-4">
        {pkg.treatments.map((treatment, idx) => (
          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
            <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
            <span>{treatment}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-2 rounded-lg font-semibold text-sm transition-opacity ${
          pkg.featured
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "border border-primary text-primary hover:bg-primary/5"
        }`}
      >
        Book Now
      </button>
    </div>
  )
}

export function PackageTabs({ packages }: TabsProps) {
  const [activeTab, setActiveTab] = useState("popular")

  const tabs = [
    { id: "popular", label: "Popular Packages", count: packages.popular.length },
    { id: "signature", label: "Signature Programs", count: packages.signature.length },
    { id: "individual", label: "À La Carte", count: packages.individual.length },
  ]

  const tabContent = {
    popular: packages.popular,
    signature: packages.signature,
    individual: packages.individual,
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 md:gap-4 mb-8 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 md:px-4 py-3 font-semibold text-sm md:text-base transition-all border-b-2 ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            <span className="text-xs ml-1 opacity-70">({tab.count})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === "popular" && tabContent.popular.map((pkg, idx) => <PackageCard key={idx} pkg={pkg} />)}
        {activeTab === "signature" && tabContent.signature.map((pkg, idx) => <PackageCard key={idx} pkg={pkg} />)}
        {activeTab === "individual" && tabContent.individual.map((pkg, idx) => <PackageCard key={idx} pkg={pkg} />)}
      </div>
    </div>
  )
}

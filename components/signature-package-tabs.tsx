"use client"

import { useState } from "react"
import { Clock, Check } from "lucide-react"

interface Package {
  title: string
  duration: string
  focus?: string
  includes: string[]
  benefits?: string
  featured?: boolean
}

interface SignaturePackageTabsProps {
  packages: Package[]
}

function SignatureCard({ pkg }: { pkg: Package }) {
  return (
    <div className="rounded-lg p-5 border border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md">
      <h3 className="text-lg font-bold text-foreground mb-1">{pkg.title}</h3>
      <div className="flex items-center gap-2 mb-3 text-primary font-medium text-sm">
        <Clock size={14} />
        <span>{pkg.duration}</span>
      </div>
      {pkg.focus && <p className="text-sm font-semibold text-primary mb-3">Focus: {pkg.focus}</p>}
      <p className="text-xs font-semibold text-foreground mb-2 uppercase">Includes:</p>
      <ul className="space-y-1 mb-3">
        {pkg.includes.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
            <Check size={12} className="text-primary flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {pkg.benefits && (
        <p className="text-xs text-muted-foreground italic border-t border-primary/20 pt-2">Benefits: {pkg.benefits}</p>
      )}
      <button className="w-full mt-3 py-2 bg-primary text-primary-foreground rounded font-semibold text-sm hover:opacity-90 transition-opacity">
        Book Package
      </button>
    </div>
  )
}

export function SignaturePackageTabs({ packages }: SignaturePackageTabsProps) {
  const [selectedPackage, setSelectedPackage] = useState(0)

  return (
    <div>
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
        {packages.map((pkg, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPackage(idx)}
            className={`px-3 md:px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              selectedPackage === idx
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {pkg.title.split(" ").slice(0, 2).join(" ")}
          </button>
        ))}
      </div>

      <SignatureCard pkg={packages[selectedPackage]} />
    </div>
  )
}

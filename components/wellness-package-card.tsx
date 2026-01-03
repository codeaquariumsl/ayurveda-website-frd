"use client"

import { Clock } from "lucide-react"

interface Treatment {
  title: string
  duration: string
  description: string
  image?: string
}

interface WellnessPackageCardProps {
  treatment: Treatment
  onBookClick: () => void
}

export function WellnessPackageCard({ treatment, onBookClick }: WellnessPackageCardProps) {
  return (
    <div className="rounded-lg border border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
      {treatment.image && (
        <div className="w-full h-48 overflow-hidden bg-gray-200">
          <img
            src={treatment.image || "/placeholder.svg"}
            alt={treatment.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-foreground mb-2">{treatment.title}</h3>
        <div className="flex items-center gap-2 mb-3 text-primary font-medium text-sm">
          <Clock size={14} />
          <span>{treatment.duration}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 flex-1">{treatment.description}</p>
        <button
          onClick={onBookClick}
          className="w-full py-2 bg-primary text-primary-foreground rounded font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Book Package
        </button>
      </div>
    </div>
  )
}

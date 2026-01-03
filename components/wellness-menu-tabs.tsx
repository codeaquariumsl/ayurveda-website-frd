"use client"

import { useState } from "react"

interface Treatment {
  title: string
  duration: string
  description: string
}

interface WellnessMenu {
  label: string
  treatments: Treatment[]
}

interface WellnessMenuTabsProps {
  wellnessMenu: {
    headHair: WellnessMenu
    bodySkin: WellnessMenu
    facial: WellnessMenu
    foot: WellnessMenu
  }
}

function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <div className="rounded-lg p-4 border border-border bg-card hover:shadow-md transition-all">
      <h4 className="font-semibold text-foreground text-sm mb-1">{treatment.title}</h4>
      <p className="text-xs text-primary font-medium mb-2">{treatment.duration}</p>
      <p className="text-xs text-muted-foreground">{treatment.description}</p>
    </div>
  )
}

export function WellnessMenuTabs({ wellnessMenu }: WellnessMenuTabsProps) {
  const [activeTab, setActiveTab] = useState("headHair")

  const tabs = [
    { id: "headHair", label: "Head & Hair Care" },
    { id: "bodySkin", label: "Body & Skin Care" },
    { id: "facial", label: "Facial Care" },
    { id: "foot", label: "Foot Care" },
  ]

  const getActiveContent = () => {
    const menuMap: Record<string, WellnessMenu> = {
      headHair: wellnessMenu.headHair,
      bodySkin: wellnessMenu.bodySkin,
      facial: wellnessMenu.facial,
      foot: wellnessMenu.foot,
    }
    return menuMap[activeTab]?.treatments || []
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 md:px-4 py-2 font-semibold text-sm transition-all border-b-2 ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getActiveContent().map((treatment, idx) => (
          <TreatmentCard key={idx} treatment={treatment} />
        ))}
      </div>
    </div>
  )
}

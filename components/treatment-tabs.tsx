"use client"

import { useState } from "react"

interface Treatment {
  title: string
  duration?: string
  description: string
  benefits: string[]
  image: string
  [key: string]: any
}

interface TabsProps {
  tabs: {
    id: string
    name: string
    treatments: Treatment[]
  }[]
  renderItem?: (treatment: Treatment) => React.ReactNode
}

export function TreatmentTabs({ tabs, renderItem }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-semibold rounded-lg transition-colors text-sm md:text-base ${activeTab === tab.id
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/20 text-foreground hover:bg-secondary/30"
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {activeTabData && (
        <div className={`grid ${renderItem ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
          {activeTabData.treatments.map((treatment, idx) =>
            renderItem ? (
              <div key={idx}>{renderItem(treatment)}</div>
            ) : (
              <div
                key={idx}
                className="bg-card rounded-xl border border-border hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-0">
                  <div className="md:w-56 md:min-h-56 flex-shrink-0 h-64 md:h-auto bg-gray-200">
                    <img
                      src={treatment.image || "/placeholder.svg"}
                      alt={treatment.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex flex-col gap-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{treatment.title}</h3>
                        {treatment.duration && (
                          <p className="text-sm text-primary font-medium mt-1">{treatment.duration}</p>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed">{treatment.description}</p>

                      {treatment.benefits && treatment.benefits.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 text-sm">Key Benefits:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                            {treatment.benefits.map((benefit, bidx) => (
                              <li key={bidx} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-primary font-bold mt-0.5">•</span>
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

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

const TreatmentCard = ({ treatment, idx }: { treatment: Treatment; idx: number }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: idx * 0.05, duration: 0.4 }}
      className="bg-card rounded-xl border border-border hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-0">
        <div className="md:w-56 md:min-h-56 flex-shrink-0 h-64 md:h-auto bg-muted overflow-hidden relative">
          {/* Shimmer Placeholder */}
          {!isLoaded && treatment.image && (
            <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted shimmer" />
          )}

          {treatment.image ? (
            <img
              src={treatment.image || "/placeholder.svg"}
              alt={treatment.title}
              onLoad={() => setIsLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-muted-foreground/20" />
            </div>
          )}
        </div>
        <div className="p-6 flex-1">
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {treatment.title}
              </h3>
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
    </motion.div>
  )
}

export function TreatmentTabs({ tabs, renderItem }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.substring(1)
      if (hash && tabs.some((tab) => tab.id === hash)) {
        setActiveTab(hash)
      }
    }

    // Check on initial load
    checkHash()

    // Add listener for hash changes
    window.addEventListener("hashchange", checkHash)
    return () => window.removeEventListener("hashchange", checkHash)
  }, [tabs])

  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              window.history.pushState(null, "", `#${tab.id}`)
            }}
            className={`px-4 py-2 font-semibold rounded-lg transition-colors text-sm md:text-base ${activeTab === tab.id
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/20 text-foreground hover:bg-secondary/30"
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTabData && (
            <div className={`grid ${renderItem ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
              {activeTabData.treatments.map((treatment, idx) =>
                renderItem ? (
                  <div key={idx}>{renderItem(treatment)}</div>
                ) : (
                  <TreatmentCard key={`${activeTab}-${idx}`} treatment={treatment} idx={idx} />
                )
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  )
}

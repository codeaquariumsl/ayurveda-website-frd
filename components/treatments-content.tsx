"use client"

import Link from "next/link"
import { TreatmentTabs } from "@/components/treatment-tabs"
import { useAuth } from "@/components/auth-context"

interface Treatment {
    title: string
    description: string
    image: string
    benefits: string[]
}

interface Tab {
    id: string
    name: string
    treatments: Treatment[]
}

export function TreatmentsContent({ fallbackTabs }: { fallbackTabs?: Tab[] }) {
    const { treatments } = useAuth()
    
    // Construct dynamic tabs from backend if treatments exist
    const dynamicTabs: Tab[] = [
        { id: "head-care", name: "Head and Hair Care Treatments", treatments: [] },
        { id: "body-care", name: "Body and Skin Care Treatments", treatments: [] },
        { id: "facial-care", name: "Facial Care Treatments", treatments: [] },
        { id: "foot-care", name: "Foot Care Treatments", treatments: [] },
    ]

    if (treatments && treatments.length > 0) {
        treatments.forEach(t => {
            const tab = dynamicTabs.find(tab => tab.id === t.category)
            if (tab) {
                tab.treatments.push({
                    title: t.title,
                    description: t.description,
                    image: t.image || "",
                    benefits: t.benefits || []
                })
            }
        })
    }

    // Use dynamic tabs if we have any backend data, otherwise fallback to static
    const filteredDynamicTabs = dynamicTabs.filter(tab => tab.treatments.length > 0)
    const tabsData = filteredDynamicTabs.length > 0 ? filteredDynamicTabs : fallbackTabs || []

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
                    {tabsData.length > 0 && <TreatmentTabs tabs={tabsData as any} />}
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

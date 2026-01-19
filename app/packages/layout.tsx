import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Treatment Packages",
    description: "Browse our signature and special Ayurvedic treatment packages in Thissamaharama. Personalized wellness programs for detoxification and rejuvenation.",
    keywords: ["Ayurveda Packages", "Wellness Programs", "Detox Package", "Rejuvenation", "Sri Lanka Ayurveda"],
}

export default function PackagesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}

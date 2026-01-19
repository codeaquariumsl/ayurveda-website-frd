import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Natural Ayurvedic Products",
    description: "Explore our collection of premium, natural Ayurvedic products ethically sourced for beauty and wellness. Authentic herbal oils and remedies from Siddhaka Ayurveda.",
    keywords: ["Ayurvedic Products", "Herbal Oils", "Natural Beauty", "Ayurveda Medicine", "Sri Lanka"],
}

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}

import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.siddhakaayurveda.com"
    const lastModified = new Date()

    const routes = [
        "",
        "/about",
        "/ayurveda",
        "/contact",
        "/packages",
        "/products",
        "/treatments",
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified,
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : 0.8,
    }))
}

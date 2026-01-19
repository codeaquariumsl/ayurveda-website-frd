import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/patient-dashboard/"],
        },
        sitemap: "https://www.siddhakaayurveda.com/sitemap.xml",
    }
}

import type { Metadata } from "next"
import AyurvedaContent from "@/components/ayurveda-content"

export const metadata: Metadata = {
  title: "Ayurveda Medical System | Ancient Wisdom for Modern Life",
  description: "Learn about the ancient science of Ayurveda. Understand the three Doshas (Vata, Pitta, Kapha), the importance of Ahara and Vihara, and the power of Panchakarma detoxification.",
  keywords: ["What is Ayurveda", "Three Doshas", "Prakrithi", "Panchakarma Stages", "Holistic Health"],
}

export default function AyurvedaPage() {
  return <AyurvedaContent />
}

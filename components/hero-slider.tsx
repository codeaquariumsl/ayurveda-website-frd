"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SlideItem {
  type: "image" | "video"
  src: string
  title?: string
  subtitle?: string
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const slides: SlideItem[] = [
    {
      type: "image",
      src: "/peaceful-ayurveda-spa-treatment-center.jpg",
      title: "Welcome to Siddhaka Ayurveda",
      subtitle: "Reconnect. Rejuvenate. Restore your natural balance.",
    },
    {
      type: "image",
      src: "/001.JPG",
      title: "Welcome to Siddhaka Ayurveda",
      subtitle: "Reconnect. Rejuvenate. Restore your natural balance.",
    },
    // {
    //   type: "image",
    //   src: "/ayurvedic-massage-therapy-healing-hands.jpg",
    //   title: "Authentic Ayurvedic Healing",
    //   subtitle: "Traditional treatments for modern wellness",
    // },
    {
      type: "image",
      src: "/003.JPG",
      title: "Authentic Ayurvedic Healing",
      subtitle: "Traditional treatments for modern wellness",
    },
    // {
    //   type: "video",
    //   src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    //   title: "Experience Ayurveda",
    //   subtitle: "Watch how our treatments transform lives",
    // },
    {
      type: "image",
      src: "006.JPG",
      title: "Welcome to Siddhaka Ayurveda",
      subtitle: "Reconnect. Rejuvenate. Restore your natural balance.",
    },
    {
      type: "image",
      src: "/004.JPG",
      title: "Natural Healing Ingredients",
      subtitle: "Premium quality herbs and oils",
    },
    {
      type: "image",
      src: "/natural-herbal-oils-ayurvedic-products.jpg",
      title: "Natural Healing Ingredients",
      subtitle: "Premium quality herbs and oils",
    },
  ]

  useEffect(() => {
    if (!isAutoPlay || selectedVideo) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlay, slides.length, selectedVideo])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const currentSlideData = slides[currentSlide]
  const isVideo = currentSlideData.type === "video"

  return (
    <div className="relative w-full bg-background overflow-hidden">
      {/* Main Slider Container */}
      <div className="relative w-full h-screen max-h-[700px] flex items-center justify-center bg-card">
        {/* Slides */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            {slide.type === "image" ? (
              <>
                <img src={slide.src || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />
              </>
            ) : (
              <>
                <div className="w-full h-full bg-black flex items-center justify-center relative">
                  <iframe
                    src={slide.src}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </>
            )}

            {/* Content Overlay */}
            {slide.title && !isVideo && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
                  {slide.title}
                </h1>
                {slide.subtitle && (
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl italic">{slide.subtitle}</p>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-3 rounded-full transition-all ${idx === currentSlide ? "bg-white w-8" : "bg-white/50 w-3 hover:bg-white/75"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-10 text-white text-sm font-medium bg-black/40 px-4 py-2 rounded-full">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  )
}

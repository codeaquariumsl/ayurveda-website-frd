"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import HeroSlider from "@/components/hero-slider"
import { motion, AnimatePresence } from "framer-motion"

export default function HomePageClient() {
    const [isLoading, setIsLoading] = useState(true)

    const whyChooseReasons = [
        {
            title: "Officially Registered and Recognized",
            description:
                "Siddhaka Ayurveda is fully registered under the Department of Ayurveda, ensuring adherence to established quality, safety, and regulatory standards.",
        },
        {
            title: "Supervised by Qualified Ayurvedic Doctors",
            description:
                "All treatments are conducted under the guidance of graduate Ayurvedic doctors registered with the Department of Ayurveda, ensuring safe and professional care.",
        },
        {
            title: "Professional and Skilled Therapists",
            description:
                "Our trained and compassionate therapists provide attentive, personalized care, maintaining authenticity and respect for traditional Ayurvedic practices.",
        },
        {
            title: "Commitment to Comfort, Safety, and Authenticity",
            description:
                "We uphold high standards of hygiene, safety, and ethical practice at every stage of your wellness journey.",
        },
        {
            title: "Natural and High-Quality Ingredients",
            description:
                "We use carefully selected natural herbs and oils, ethically sourced to support effective and gentle healing.",
        },
    ]

    useEffect(() => {
        const imagesToPreload = [
            "/SlideImages/002.jpeg",
            "/006.JPG",
            "/Siddhaka_ayurveda_Logo.png",
            "/mandala_bg.png",
        ]

        const cacheImages = async (srcArray: string[]) => {
            const promises = srcArray.map((src) => {
                return new Promise((resolve, reject) => {
                    const img = new window.Image()
                    img.src = src
                    img.onload = resolve
                    img.onerror = resolve // Resolve even on error to prevent blocking
                })
            })

            await Promise.all(promises)
            // Slight delay for smooth UI feel
            setTimeout(() => setIsLoading(false), 500)
        }

        cacheImages(imagesToPreload)
    }, [])

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="relative"
                >
                    <Image
                        src="/Siddhaka_ayurveda_Logo.png"
                        alt="Loading..."
                        width={200}
                        height={70}
                        className="h-20 w-auto"
                        priority
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-primary font-medium text-sm tracking-widest uppercase"
                >
                    Discovering Wellness...
                </motion.div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen"
        >
            <HeroSlider />

            {/* Welcome Section */}
            <section className="relative w-full min-h-screen bg-background overflow-hidden flex flex-col lg:block">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
                    {/* Left Side: Image */}
                    <div className="relative h-[50vh] lg:h-auto min-h-[400px] lg:min-h-screen w-full overflow-hidden order-last lg:order-first">
                        <Image
                            src="/006.JPG"
                            alt="Siddhaka Ayurveda Wellness Center"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
                    </div>

                    {/* Right Side: Content */}
                    <div className="relative flex flex-col items-center justify-center text-center px-6 py-12 lg:px-16 xl:px-24 bg-background z-10 order-first lg:order-last min-h-[50vh] lg:min-h-screen">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-multiply">
                            <Image
                                src="/mandala_bg.png"
                                alt="Mandala Background"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Content Wrapper */}
                        <div className="relative z-10">
                            {/* Logo */}
                            <div className="mb-6 md:mb-8 flex justify-center">
                                <Image
                                    src="/Siddhaka_ayurveda_Logo.png"
                                    alt="Siddhaka Ayurveda Logo"
                                    width={450}
                                    height={150}
                                    className="h-32 md:h-48 w-auto drop-shadow-sm"
                                />
                            </div>

                            {/* Main Heading */}
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                                Welcome to <span className="text-primary">Siddhaka Ayurveda</span>
                            </h2>

                            {/* Tagline */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-6">
                                <p className="text-sm sm:text-base text-primary font-bold italic tracking-wide">
                                    "Reconnect. Rejuvenate. Restore your natural balance."
                                </p>
                            </div>

                            {/* Body Text */}
                            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-medium mx-auto">
                                <p>
                                    Siddhaka Ayurveda is a serene haven for holistic healing nestled in the peaceful surroundings of
                                    Thissamaharama. Guided by <span className="text-foreground font-semibold">Dr. Nimeshika Madithiyawala</span>, we provide authentic Ayurvedic treatments designed
                                    to help you reconnect and rejuvenate your mind, body, and soul.
                                </p>
                                <p>
                                    At Siddhaka Ayurveda, wellness is a journey, and we are here to guide you every step of the way with treatments rooted in ancient wisdom and personalized for your unique needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="min-h-screen flex flex-col justify-center py-16 bg-background relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-multiply">
                    <Image
                        src="/mandala_bg.png"
                        alt="Mandala Background"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full mb-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">About Us</h2>
                        <p className="text-lg sm:text-xl text-primary font-semibold mb-6 italic">
                            "Ancient wisdom, personalized for your modern life."
                        </p>
                        <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Siddhaka Ayurveda is a holistic healing center dedicated to promoting natural health through the wisdom of
                                classical Ayurveda. We combine personalized consultations, traditional therapies, and mindful lifestyle
                                guidance to support each individual's unique constitution.
                            </p>
                            <p>
                                Under the guidance of Dr. Nimeshika Madithiyawala, our focus is on addressing the root causes of imbalance
                                rather than just treating symptoms. In our calm and nurturing environment, we help you restore harmony,
                                revitalize energy, and cultivate long-term wellness in a way that fits modern life.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {/* Vision Tile */}
                        <div className="bg-card hover:bg-card/80 transition-colors rounded-xl p-8 border border-border shadow-sm flex flex-col">
                            <h3 className="text-2xl font-bold text-foreground mb-3 text-center md:text-left">Our Vision</h3>
                            <p className="text-sm text-primary font-semibold mb-4 italic text-center md:text-left">
                                "Inspiring holistic living and natural wellness for everyone."
                            </p>
                            <p className="text-muted-foreground leading-relaxed flex-grow text-center md:text-left">
                                To be a trusted center of Ayurvedic healing, inspiring natural wellness and holistic living, where
                                individuals can reconnect with their innate capacity for balance, vitality, and well-being.
                            </p>
                        </div>

                        {/* Mission Tile */}
                        <div className="bg-card hover:bg-card/80 transition-colors rounded-xl p-8 border border-border shadow-sm flex flex-col">
                            <h3 className="text-2xl font-bold text-foreground mb-3 text-center md:text-left">Our Mission</h3>
                            <p className="text-sm text-primary font-semibold mb-4 italic text-center md:text-left">
                                "Compassionate care rooted in authentic Ayurveda."
                            </p>
                            <p className="text-muted-foreground leading-relaxed flex-grow text-center md:text-left">
                                To provide authentic, personalized Ayurvedic care rooted in classical wisdom, delivered with compassion
                                and professionalism. We aim to nurture mind, body, and soul by addressing the root causes of imbalance
                                and promoting natural healing.
                            </p>
                        </div>

                        {/* Concept Tile */}
                        <div className="bg-card hover:bg-card/80 transition-colors rounded-xl p-8 border border-border shadow-sm flex flex-col">
                            <h3 className="text-2xl font-bold text-foreground mb-3 text-center md:text-left">Our Concept</h3>
                            <p className="text-sm text-primary font-semibold mb-4 italic text-center md:text-left">
                                "Healing mind, body, and soul — naturally, gently, sustainably."
                            </p>
                            <p className="text-muted-foreground leading-relaxed flex-grow text-center md:text-left">
                                At Siddhaka Ayurveda, wellness is a journey of balance. Our approach blends classical
                                Ayurvedic principles with practical lifestyle guidance. We tailor each treatment to help find calm,
                                restore balance, and rejuvenate the soul.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-10 sm:py-12 md:py-16 bg-background">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8">Why Choose Siddhaka Ayurveda?</h3>
                    <div className="space-y-3 sm:space-y-4">
                        {whyChooseReasons.map((reason, idx) => (
                            <div key={idx} className="flex gap-3 sm:gap-4">
                                <div className="flex-shrink-0 pt-0.5 sm:pt-1">
                                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{reason.title}</h4>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-10 sm:py-12 md:py-16 bg-background">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-10 text-balance">Our Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {[
                            { title: "Head & Hair", href: "/treatments#head-care" },
                            { title: "Body & Skin", href: "/treatments#body-care" },
                            { title: "Facial Care", href: "/treatments#facial-care" },
                            { title: "Foot Care", href: "/treatments#foot-care" },
                        ].map((service, idx) => (
                            <Link
                                key={idx}
                                href={service.href}
                                className="p-4 sm:p-5 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
                            >
                                <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1 sm:mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground">Explore our specialties</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 sm:py-12 md:py-16 bg-gradient-to-r from-primary to-secondary">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3 sm:mb-4 text-balance leading-tight">
                        Ready to Begin Your Wellness Journey?
                    </h2>
                    <p className="text-base sm:text-lg text-primary-foreground/90 mb-5 sm:mb-6 text-balance px-1">
                        Schedule a consultation with Dr. Nimeshika Madithiyawala and discover your path to natural healing
                    </p>
                    <Link
                        href="/packages"
                        className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity font-semibold min-h-11 sm:min-h-12 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 dark:focus:ring-offset-background active:scale-95"
                    >
                        Book Your Appointment
                    </Link>
                </div>
            </section>
        </motion.div>
    )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle, Sparkles, ChevronRight } from "lucide-react"
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

            {/* Welcome Section - Optimized for Premium UX */}
            <section className="relative w-full min-h-screen flex items-center bg-background overflow-hidden py-16 lg:py-24">
                {/* Background Pattern - Mandala with subtle parallax feel */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src="/mandala_bg.png"
                            alt=""
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        {/* Image Content - 5 cols */}
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="lg:col-span-5 relative order-last lg:order-first"
                        >
                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                                <Image
                                    src="/006.JPG"
                                    alt="Siddhaka Ayurveda Wellness Center"
                                    fill
                                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                    priority
                                />
                                {/* Bottom gradient for text readability if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-80" />

                                {/* Inner glow / border */}
                                <div className="absolute inset-0 border-[12px] border-white/10 rounded-[2.5rem]" />
                            </div>

                            {/* Floating Stats / Info Element */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="absolute -bottom-6 -right-6 lg:-right-10 bg-background/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-border/50 hidden md:block"
                            >
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">Authentic Excellence</p>
                                    </div>
                                    <p className="text-xl font-black text-foreground">Traditional Care</p>
                                    <p className="text-xs text-muted-foreground">Modern Comfort & Healing</p>
                                </div>
                            </motion.div>

                            {/* Decorative element */}
                            <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                        </motion.div>

                        {/* Text Content - 7 cols */}
                        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Premium Badge */}
                                <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Discover Ancient Wisdom</span>
                                </div>

                                {/* Logo Integration - More refined */}
                                <div className="mb-8 opacity-90">
                                    <Image
                                        src="/Siddhaka_ayurveda_Logo.png"
                                        alt="Siddhaka Ayurveda"
                                        width={280}
                                        height={80}
                                        className="h-16 md:h-20 w-auto"
                                    />
                                </div>

                                <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-foreground mb-8 leading-[1.05] tracking-tight">
                                    Welcome to <br />
                                    <span className="text-primary font-bold">Siddhaka Ayurveda</span>
                                </h2>

                                <div className="relative pl-0 lg:pl-12 space-y-8 max-w-2xl">
                                    {/* Vertical accent line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/20 to-transparent hidden lg:block" />

                                    <div className="space-y-2">
                                        <p className="text-lg md:text-xl text-primary font-bold italic leading-relaxed">
                                            &ldquo;Reconnect. Rejuvenate. Restore your natural balance.&rdquo;
                                        </p>
                                        <div className="w-12 h-1 bg-primary/20 rounded-full lg:hidden mx-auto" />
                                    </div>

                                    <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
                                        <p>
                                            Siddhaka Ayurveda is a serene haven for holistic healing nestled in the peaceful surroundings of
                                            Thissamaharama. Guided by <span className="text-foreground font-bold border-b-2 border-primary/20 pb-0.5">Dr. Nimeshika Madithiyawala</span>, we provide authentic Ayurvedic treatments designed
                                            to help you reconnect and rejuvenate your mind, body, and soul.
                                        </p>
                                        <p>
                                            At Siddhaka Ayurveda, wellness is a journey, and we are here to guide you every step of the way with treatments rooted in ancient wisdom and personalized for your unique needs.
                                        </p>
                                    </div>

                                    {/* Action links */}
                                    <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-8">
                                        <Link
                                            href="/ayurveda"
                                            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                                        >
                                            <span>Philosophy</span>
                                            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-1">
                                                <ChevronRight size={14} />
                                            </div>
                                        </Link>
                                        <Link
                                            href="/treatments"
                                            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                                        >
                                            <span>Treatments</span>
                                            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:translate-x-1">
                                                <ChevronRight size={14} />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
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

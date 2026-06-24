"use client"

import { useState } from "react"
import { Sparkles, ShieldCheck, Award, ArrowRight, Clock, Heart, Activity, Leaf } from "lucide-react"
import { BookingModal } from "@/components/booking-modal"
import { WellnessPackageCard } from "@/components/wellness-package-card"
import { SignatureCard } from "@/components/signature-card"
import { TreatmentTabs } from "@/components/treatment-tabs"
import { useAuth } from "@/components/auth-context"
import { motion } from "framer-motion"
import Image from "next/image"
import { AyurvedicBackground } from "@/components/ayurvedic-background"

export default function PackagesPage() {
  const { packages, subcategories } = useAuth()
  const [selectedPackageInfo, setSelectedPackageInfo] = useState<{ name: string, id: string } | null>(null)

  const sortedPackages = [...packages].sort((a, b) => (a.index || 0) - (b.index || 0))
  const wellnessPackages = sortedPackages.filter(p => p.category === "wellness")
  const specialPackages = sortedPackages.filter(p => p.category === "special")
  const signaturePackages = sortedPackages.filter(p => p.category === "signature")

  const categories = subcategories.map((sub) => ({
    label: sub.name,
    sub: sub.slug,
  }))

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fbfaf5] via-[#f5f9f0] to-[#edf3e8] dark:from-[#0c1008] dark:via-[#10150d] dark:to-[#080b06] relative overflow-hidden">
      <AyurvedicBackground />
      {/* Premium Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-10 md:pb-16 overflow-hidden border-b border-border/50">
        {/* Modern Premium Background Pattern & Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(141,31,43,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(230,190,120,0.04)_1px,transparent_1px)] [background-size:24px_24px] opacity-80" />

          {/* Modern glowing spots - color aligned with maroon/gold theme */}
          <motion.div
            animate={{
              scale: [1, 1.2, 0.9, 1],
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] dark:bg-primary/5"
          />
          <motion.div
            animate={{
              scale: [1.1, 0.9, 1.2, 1.1],
              x: [0, -30, 40, 0],
              y: [0, 40, -30, 0],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[120px] dark:bg-amber-500/5"
          />

          {/* Fine gold lines / orbits */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] opacity-10 dark:opacity-20 pointer-events-none" viewBox="0 0 100 100">
            <motion.circle
              cx="50" cy="50" r="46"
              stroke="currentColor" strokeWidth="0.05" strokeDasharray="4 4" fill="none" className="text-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              cx="50" cy="50" r="38"
              stroke="currentColor" strokeWidth="0.05" strokeDasharray="2 5" fill="none" className="text-amber-500"
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column - Rich Typography & Details */}
            <div className="lg:col-span-7 text-left flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Premium Pill Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-full mb-6 backdrop-blur-md shadow-sm">
                  <Sparkles size={14} className="text-primary animate-pulse" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.25em]">Curated for Wellness</span>
                </div>

                {/* Title with Gradient and Serif elegance */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground mb-6 tracking-tight leading-[1.05]">
                  Treatment <br />
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-600 dark:from-primary dark:to-amber-500 font-serif italic py-1">
                    Packages
                    {/* Underline accent */}
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary to-amber-500 rounded-full"
                    />
                  </span>
                </h1>

                {/* Tagline */}
                <p className="text-base md:text-lg text-muted-foreground mb-8 font-medium leading-relaxed max-w-xl">
                  Discover our comprehensive range of authentic Ayurvedic treatments, custom-tailored to heal, rejuvenate, and restore complete harmony to your mind, body, and soul.
                </p>

                {/* Value Proposition Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 w-full max-w-2xl">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-card/60 dark:bg-card/30 border border-border/40 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-sm group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <Heart size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Custom Programs</h4>
                      <p className="text-[10px] text-muted-foreground">For your body type</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-card/60 dark:bg-card/30 border border-border/40 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-sm group">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-500 group-hover:scale-110 transition-transform duration-300">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Doctor Guided</h4>
                      <p className="text-[10px] text-muted-foreground">Expert supervision</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-card/60 dark:bg-card/30 border border-border/40 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-sm group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 group-hover:scale-110 transition-transform duration-300">
                      <Leaf size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">100% Natural</h4>
                      <p className="text-[10px] text-muted-foreground">Medicated herbal oils</p>
                    </div>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById("packages-menu")
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    }}
                    className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer text-sm"
                  >
                    Explore Packages
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={() => setSelectedPackageInfo({ name: "General Consultation", id: "consultation" })}
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-card/40 dark:bg-card/10 hover:bg-card/80 dark:hover:bg-card/25 text-foreground border border-border/60 hover:border-primary/30 rounded-2xl font-bold backdrop-blur-md transition-all duration-300 cursor-pointer text-sm"
                  >
                    Book Consultation
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Premium floating treatment collage */}
            <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] lg:h-[500px] w-full flex items-center justify-center">
              {/* Outer spinning Mandala Backing */}
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-20 dark:opacity-30">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
                  className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] relative"
                >
                  <Image
                    src="/mandala_art_circular.png"
                    alt=""
                    fill
                    className="object-contain animate-[pulse_8s_infinite]"
                    priority
                  />
                </motion.div>
              </div>

              {/* Overlapping Floating Treatment Cards */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Card 1: Main Treatment (Shiro Dhara) */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="relative w-48 h-64 sm:w-60 sm:h-80 rounded-[2rem] overflow-hidden border-4 border-primary/20 dark:border-primary/40 shadow-2xl hover:border-primary transition-colors duration-500 group z-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <Image
                    src="/Treatment/Shiro Dhara.JPG"
                    alt="Shiro Dhara Treatment"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <span className="px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-wider">Rejuvenating</span>
                    <h3 className="text-white text-base font-bold mt-2">Shiro Dhara</h3>
                    <p className="text-white/70 text-[10px] font-medium flex items-center gap-1 mt-1">
                      <Clock size={10} /> 45 - 60 Mins
                    </p>
                  </div>
                </motion.div>

                {/* Card 2: Secondary Treatment (Herbal Bath) */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="absolute -right-4 top-[10%] w-32 h-44 sm:w-40 sm:h-56 rounded-[1.5rem] overflow-hidden border-2 border-primary/20 dark:border-primary/40 shadow-xl hover:border-primary transition-colors duration-500 group z-20 hidden sm:block"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                  <Image
                    src="/Treatment/Herbal Bath.JPG"
                    alt="Herbal Bath Treatment"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-white text-xs font-bold">Herbal Bath</h3>
                    <p className="text-white/70 text-[9px] font-medium mt-0.5">Toxin Release</p>
                  </div>
                </motion.div>

                {/* Card 3: Mini Info Badge (Floating) */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-6 bottom-[15%] z-35 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-zinc-950/80 border border-white/20 dark:border-white/10 backdrop-blur-md shadow-lg flex items-center gap-2 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Activity size={12} />
                  </div>
                  <span className="text-[10px] font-extrabold text-foreground">Holistic Healing</span>
                </motion.div>

                {/* Floating Leaf Decors */}
                <motion.div
                  animate={{
                    x: [0, 8, 0],
                    y: [0, -12, 0],
                    rotate: [0, 15, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[10%] left-6 opacity-25 dark:opacity-40 text-primary pointer-events-none select-none"
                >
                  <Leaf size={36} strokeWidth={1} />
                </motion.div>

                <motion.div
                  animate={{
                    x: [0, -10, 0],
                    y: [0, 8, 0],
                    rotate: [0, -20, 0]
                  }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                  className="absolute bottom-[10%] right-6 opacity-20 dark:opacity-35 text-emerald-800 dark:text-emerald-500 pointer-events-none select-none"
                >
                  <Leaf size={48} strokeWidth={1} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid Section */}
      <section id="packages-menu" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 tracking-tight">Our <span className="text-primary">Menu</span></h2>
            <div className="w-20 h-1.5 bg-primary/20 rounded-full" />
          </div>

          <TreatmentTabs
            tabs={[
              ...categories.map((cat) => ({
                id: cat.sub,
                name: cat.label,
                treatments: wellnessPackages
                  .filter((p) => p.subcategory === cat.sub)
                  .map((pkg) => ({
                    title: pkg.name,
                    duration: `${pkg.duration} minutes`,
                    description: pkg.description,
                    benefits: pkg.includes,
                    image: pkg.image || "",
                    type: "wellness",
                    _original: pkg,
                  })),
              })),
              {
                id: "special",
                name: "Special Packages",
                treatments: specialPackages.map((pkg) => ({
                  title: pkg.name,
                  duration: "",
                  description: pkg.description,
                  benefits: [],
                  image: pkg.image || "",
                  type: "special",
                  _original: pkg,
                })),
              },
              {
                id: "signature",
                name: "Signature Packages",
                treatments: signaturePackages.map((pkg) => ({
                  title: pkg.name,
                  duration: "",
                  description: pkg.description,
                  benefits: [],
                  image: pkg.image || "",
                  type: "signature",
                  _original: pkg,
                })),
              },
            ]}
            renderItem={(treatment: any, idx: number) => {
              if (treatment.type === "special" || treatment.type === "signature") {
                return <SignatureCard pkg={treatment._original} delay={idx * 0.05} />
              }
              return (
                <WellnessPackageCard
                  treatment={{
                    title: treatment.title,
                    duration: treatment.duration,
                    description: treatment.description,
                    image: treatment.image,
                  }}
                  delay={idx * 0.05}
                  onBookClick={() =>
                    setSelectedPackageInfo({
                      name: treatment.title,
                      id: treatment._original._id || treatment._original.id,
                    })
                  }
                />
              )
            }}
          />
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-20 bg-primary/5 border-y border-border/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Sparkles size={32} className="text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">
              Unsure which package <span className="text-primary">fits you?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 font-medium max-w-2xl mx-auto">
              Schedule a general consultation with our expert practitioners to receive a personalized wellness roadmap.
            </p>
            <button
              onClick={() => setSelectedPackageInfo({ name: "General Consultation", id: "consultation" })}
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all font-bold text-lg shadow-xl shadow-primary/25 active:scale-95"
            >
              Consult with Doctor
            </button>
          </motion.div>
        </div>
      </section>

      <BookingModal
        isOpen={selectedPackageInfo !== null}
        onClose={() => setSelectedPackageInfo(null)}
        packageName={selectedPackageInfo?.name || ""}
        packageId={selectedPackageInfo?.id || ""}
      />
    </main>
  )
}

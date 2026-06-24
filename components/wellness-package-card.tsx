"use client"

import { Clock, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Treatment {
  title: string
  duration: string
  description: string
  image?: string
}

interface WellnessPackageCardProps {
  treatment: Treatment
  onBookClick: () => void
  delay?: number
}

export function WellnessPackageCard({ treatment, onBookClick, delay = 0 }: WellnessPackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col h-full bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-[2rem] overflow-hidden border border-white/40 dark:border-white/5 shadow-sm hover:shadow-2xl hover:bg-white/80 dark:hover:bg-black/40 hover:border-primary/30 transition-all duration-500"
    >
      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-10">
        <div className="px-3 py-1 bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-sm">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Wellness</p>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
        {treatment.image ? (
          <Image
            src={treatment.image}
            alt={treatment.title}
            fill
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3 text-primary">
          <Clock size={14} className="animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest">{treatment.duration}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-black text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
          {treatment.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed font-medium flex-grow">
          {treatment.description}
        </p>

        <button
          onClick={onBookClick}
          className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white rounded-2xl font-bold text-sm transition-all duration-300 active:scale-95 shadow-lg shadow-primary/20 hover:shadow-primary/40 group/btn"
        >
          <span>Reserve Now</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  )
}

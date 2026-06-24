"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Sparkles, ArrowRight, Zap, Target } from "lucide-react"
import Image from "next/image"
import { BookingModal } from "@/components/booking-modal"

interface SignatureCardProps {
    pkg: {
        _id?: string
        id?: string
        name: string
        image?: string
        focus?: string
        includes: string[]
        benefits?: string
        description?: string
    }
    delay?: number
}

export function SignatureCard({ pkg, delay = 0 }: SignatureCardProps) {
    const [isBookingOpen, setIsBookingOpen] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col h-full bg-gradient-to-br from-primary/[0.03] to-secondary/[0.03] backdrop-blur-md rounded-[2.5rem] overflow-hidden border border-primary/20 shadow-xl hover:shadow-2xl hover:bg-white/60 dark:hover:bg-black/40 transition-all duration-500"
        >
            {/* Signature Badge */}
            {/* <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                <div className="px-4 py-1.5 bg-primary/90 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
                    <Sparkles size={12} className="text-white animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Signature</span>
                </div>
            </div> */}

            {/* Image Section */}
            {/* <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
                {pkg.image ? (
                    <Image
                        src={pkg.image}
                        alt={pkg.name}
                        fill
                        className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Zap className="w-16 h-16 text-primary/10" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            </div> */}

            {/* Content Section */}
            <div className="p-8 md:p-10 flex flex-col flex-1 relative">
                <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                        {pkg.name}
                    </h3>

                    {pkg.focus && (
                        <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                            <Target size={14} />
                            <span>{pkg.focus}</span>
                        </div>
                    )}
                </div>

                {/* Benefits/Description if available */}
                {(pkg.description || pkg.benefits) && (
                    <p className="text-sm text-muted-foreground mb-8 line-clamp-2 italic font-medium">
                        {pkg.description || pkg.benefits}
                    </p>
                )}

                {/* Features List */}
                <div className="space-y-4 mb-10 overflow-hidden">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-4">Therapy Inclusion</p>
                    <ul className="grid grid-cols-1 gap-3">
                        {pkg.includes.slice(0, 8).map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-4 text-sm text-foreground/80 font-semibold group/item">
                                <div className="mt-1 flex-shrink-0">
                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover/item:bg-primary transition-colors">
                                        <Check size={12} className="text-primary group-hover/item:text-white transition-colors" />
                                    </div>
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                        {pkg.includes.length > 8 && (
                            <li className="text-xs text-primary font-bold italic ml-9">
                                + {pkg.includes.length - 8} more sessions
                            </li>
                        )}
                    </ul>
                </div>

                {/* Booking Action */}
                <div className="mt-auto pt-8 border-t border-border/50">
                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="w-full group/btn flex items-center justify-between px-8 py-5 bg-background border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-primary/10 active:scale-95"
                    >
                        <span>Experience Luxury</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                </div>

                <BookingModal
                    isOpen={isBookingOpen}
                    onClose={() => setIsBookingOpen(false)}
                    packageName={pkg.name}
                    packageId={pkg._id || pkg.id}
                />
            </div>
        </motion.div>
    )
}

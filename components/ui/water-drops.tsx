"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Ripple {
    id: number
    x: number
    y: number
}

interface WaterDropsProps {
    children: React.ReactNode
}

export const WaterDrops: React.FC<WaterDropsProps> = ({ children }) => {
    const [ripples, setRipples] = useState<Ripple[]>([])
    const lastRippleTime = useRef<number>(0)

    const addRipple = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const now = Date.now()
        // Throttle ripple creation for a cleaner, more rhythmic feel (every 100ms)
        if (now - lastRippleTime.current < 100) return
        lastRippleTime.current = now

        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const newRipple = {
            id: now,
            x,
            y,
        }

        setRipples((prev) => [...prev.slice(-15), newRipple]) // Slightly more history for richer movement
    }, [])

    // Auto clean up dead ripples
    useEffect(() => {
        const interval = setInterval(() => {
            setRipples((prev) => prev.filter((r) => Date.now() - r.id < 2500))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className="relative w-full h-full overflow-hidden group select-none"
            onMouseMove={addRipple}
        >
            {/* Background Content */}
            <div className="relative z-0 w-full h-full pointer-events-none">
                {children}
            </div>

            {/* Ripple Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <AnimatePresence>
                    {ripples.map((ripple) => (
                        <React.Fragment key={ripple.id}>
                            {/* Generate 3 concentric rings for each drop */}
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={`${ripple.id}-${i}`}
                                    initial={{ scale: 0, opacity: 0.4 }}
                                    animate={{
                                        scale: 2.5 + i * 0.5,
                                        opacity: 0,
                                        borderWidth: "1px"
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        duration: 2 + i * 0.2,
                                        delay: i * 0.1,
                                        ease: [0.16, 1, 0.3, 1] // Custom organic cubic bezier
                                    }}
                                    style={{
                                        position: "absolute",
                                        left: ripple.x,
                                        top: ripple.y,
                                        width: "120px",
                                        height: "120px",
                                        marginLeft: "-60px",
                                        marginTop: "-60px",
                                        borderRadius: "50%",
                                        // Soft gold-tinted white for an organic, premium feel
                                        border: "1px solid rgba(255, 248, 220, 0.5)",
                                        background: i === 0
                                            ? "radial-gradient(circle, rgba(255,250,240,0.5) 0%, transparent 70%)"
                                            : "transparent",
                                        boxShadow: i === 0 ? "0 0 15px rgba(255,248,220,0.5)" : "none",
                                        filter: "blur(3px)",
                                        willChange: "transform, opacity",
                                    }}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </AnimatePresence>
            </div>

            {/* Subtle organic mist/overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/5 to-transparent mix-blend-soft-light opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>
    )
}

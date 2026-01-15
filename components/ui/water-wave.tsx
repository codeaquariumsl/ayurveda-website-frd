"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface WaterWaveProps {
    children: React.ReactNode
    strength?: number
    frequency?: number
}

export const WaterWave: React.FC<WaterWaveProps> = ({
    children,
    strength = 40,
    frequency = 0.02
}) => {
    const [isHovering, setIsHovering] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const turbulenceRef = useRef<SVGFETurbulenceElement>(null)
    const displacementRef = useRef<SVGFEDisplacementMapElement>(null)

    // Create a unique ID for the filter to avoid conflicts if multiple instances exist
    const filterId = useRef(`water-filter-${Math.random().toString(36).substr(2, 9)}`)

    useEffect(() => {
        let frameId: number
        let startTime = Date.now()

        const animate = () => {
            if (turbulenceRef.current && isHovering) {
                const elapsed = (Date.now() - startTime) / 1000
                // Animate the baseFrequency to create a flowing water effect
                const freqX = frequency + Math.sin(elapsed) * 0.005
                const freqY = frequency + Math.cos(elapsed) * 0.005
                turbulenceRef.current.setAttribute("baseFrequency", `${freqX} ${freqY}`)

                if (displacementRef.current) {
                    // Dynamic scale based on mouse movement or just a heartbeat
                    const currentScale = strength + Math.sin(elapsed * 2) * 5
                    displacementRef.current.setAttribute("scale", currentScale.toString())
                }
            }
            frameId = requestAnimationFrame(animate)
        }

        frameId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frameId)
    }, [isHovering, frequency, strength])

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <div
            className="relative w-full h-full overflow-hidden group cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
        >
            <svg className="absolute w-0 h-0 pointer-events-none">
                <filter id={filterId.current} x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence
                        ref={turbulenceRef}
                        type="fractalNoise"
                        baseFrequency={frequency}
                        numOctaves="2"
                        result="noise"
                    />
                    <feDisplacementMap
                        ref={displacementRef}
                        in="SourceGraphic"
                        in2="noise"
                        scale={isHovering ? strength : 0}
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
            </svg>

            <motion.div
                className="w-full h-full will-change-[filter]"
                style={{
                    filter: isHovering ? `url(#${filterId.current})` : "none",
                }}
            >
                {children}
            </motion.div>

            {/* Subtle overlay to enhance the "water" look */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                style={{
                    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                }}
            />
        </div>
    )
}

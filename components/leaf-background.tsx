"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Leaf } from "lucide-react"

const LEAF_COLORS = [
    "text-emerald-500",
    "text-green-600",
    "text-lime-600",
    "text-emerald-700",
    "text-forest-green", // Custom if exists, else use green-800
    "text-green-500"
]

export function LeafBackground() {
    const [leaves, setLeaves] = useState<any[]>([])

    useEffect(() => {
        const newLeaves = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: Math.random() * 25 + 15,
            rotate: Math.random() * 360,
            duration: Math.random() * 15 + 15,
            delay: Math.random() * -20, // Negative delay to start immediately in various positions
            opacity: Math.random() * 0.2 + 0.05,
            color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
            sway: Math.random() * 50 + 20,
        }))
        setLeaves(newLeaves)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {leaves.map((leaf) => (
                <motion.div
                    key={leaf.id}
                    initial={{
                        x: `${leaf.x}vw`,
                        y: `-10vh`,
                        rotate: leaf.rotate,
                        opacity: 0
                    }}
                    animate={{
                        y: "110vh",
                        x: [`${leaf.x}vw`, `${leaf.x + (leaf.sway / 10)}vw`, `${leaf.x - (leaf.sway / 10)}vw`, `${leaf.x}vw`],
                        rotate: leaf.rotate + (Math.random() > 0.5 ? 360 : -360),
                        opacity: [0, leaf.opacity, leaf.opacity, 0]
                    }}
                    transition={{
                        duration: leaf.duration,
                        repeat: Infinity,
                        delay: leaf.delay,
                        ease: "linear",
                        x: {
                            duration: leaf.duration / 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    className={`absolute ${leaf.color}`}
                    style={{ width: leaf.size, height: leaf.size }}
                >
                    <Leaf
                        size={leaf.size}
                        strokeWidth={1}
                        fill="currentColor"
                        fillOpacity={0.15}
                    />
                </motion.div>
            ))}
        </div>
    )
}

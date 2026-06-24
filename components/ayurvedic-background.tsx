"use client"

import { motion } from "framer-motion"
import { Leaf } from "lucide-react"
import { LeafBackground } from "./leaf-background"

export function AyurvedicBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Dynamic Drifting Aurora Glow Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft Warm Sage/Emerald Glow (Top Left) */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-emerald-500/[0.04] dark:bg-emerald-500/[0.03] rounded-full blur-[80px] md:blur-[120px]"
        />

        {/* Soft Warm Amber/Gold Glow (Top Right) */}
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[15%] right-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/[0.06] dark:bg-primary/[0.04] rounded-full blur-[80px] md:blur-[120px]"
        />

        {/* Soft Forest Green Glow (Center Left) */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, 30, -40, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[45%] left-[-8%] w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-lime-600/[0.03] dark:bg-lime-600/[0.02] rounded-full blur-[90px] md:blur-[140px]"
        />

        {/* Soft Earthy Gold Glow (Bottom Right) */}
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[5%] right-[-10%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-amber-500/[0.04] dark:bg-amber-500/[0.03] rounded-full blur-[80px] md:blur-[120px]"
        />
      </div>

      {/* Decorative Floating Outline Leaves (Left and Right Sides) */}
      <div className="absolute inset-0 select-none">
        {/* Large Decorative Leaf (Left Side) */}
        <motion.div
          style={{ rotate: 15 }}
          animate={{
            y: [0, 15, -15, 0],
            rotate: [15, 20, 10, 15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-40px] top-[25%] opacity-[0.06] dark:opacity-[0.04] text-emerald-800 hidden lg:block"
        >
          <Leaf size={240} strokeWidth={0.5} />
        </motion.div>

        {/* Large Decorative Leaf (Right Side) */}
        <motion.div
          style={{ rotate: -45 }}
          animate={{
            y: [0, -20, 20, 0],
            rotate: [-45, -40, -50, -45],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-60px] top-[60%] opacity-[0.05] dark:opacity-[0.03] text-primary hidden lg:block"
        >
          <Leaf size={300} strokeWidth={0.5} />
        </motion.div>

        {/* Small Decorative Leaf (Right Upper) */}
        <motion.div
          style={{ rotate: 120 }}
          animate={{
            y: [0, 10, -10, 0],
            rotate: [120, 125, 115, 120],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[5%] top-[12%] opacity-[0.04] text-emerald-700 hidden lg:block"
        >
          <Leaf size={120} strokeWidth={0.7} />
        </motion.div>
      </div>

      {/* Subtle organic dotted grid overlay */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.1] bg-[radial-gradient(#80a56d_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Dynamic Falling Leaves Animation */}
      <LeafBackground />
    </div>
  )
}

"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, User, LogOut, ChevronRight, Sparkles } from "lucide-react"
import Image from "next/image"
import { useAuth } from "./auth-context"
import { useRouter, usePathname } from "next/navigation"
import { BookingModal } from "./booking-modal"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const { patient, isAdmin, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isAuthOpen) {
      if (isAdmin) {
        setIsAuthOpen(false)
        router.push("/admin")
      } else if (patient) {
        setIsAuthOpen(false)
        router.push("/patient-dashboard")
      }
    }
  }, [isAdmin, patient, isAuthOpen, router])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Our Treatments", href: "/treatments" },
    { label: "Our Treatment Packages", href: "/packages" },
    { label: "Our Products", href: "/products" },
    { label: "Ayurveda Medical System", href: "/ayurveda" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-2 shadow-lg"
          : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with scale effect */}
            <Link href="/" className="relative z-10 flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                  src="/Siddhaka_ayurveda_Logo.png"
                  alt="Siddhaka Ayurveda"
                  width={160}
                  height={50}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const isNotHomeOrAyurveda = !["/", "/ayurveda"].includes(pathname)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 group"
                  >
                    <span className={`text-sm font-bold transition-all duration-300 ${isActive
                      ? "text-primary"
                      : isScrolled
                        ? "text-foreground group-hover:text-primary"
                        : " " + (isNotHomeOrAyurveda ? "" : " text-white hover:text-white/80 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ")
                      }`}>
                      {item.label}
                    </span>
                    {/* Subtle expansion underline effect */}
                    <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full transition-all duration-300 origin-center ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 opacity-50"
                      }`} />
                  </Link>
                )
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {!isAdmin && !patient ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAuthOpen(true)}
                  className="relative flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-primary/40 transition-all font-bold text-sm tracking-wide overflow-hidden group/btn"
                >
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-shine pointer-events-none" />
                  <User size={16} />
                  Sign In / Book
                </motion.button>
              ) : (
                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full shadow-md hover:shadow-primary/20 transition-all font-bold text-sm"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/patient-dashboard"
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full shadow-md hover:shadow-primary/20 transition-all font-bold text-sm"
                    >
                      My Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => logout()}
                    className="p-2.5 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors shadow-sm"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile UI Buttons */}
            <div className="flex md:hidden items-center gap-4">
              {!isAdmin && !patient && (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className={`p-2 rounded-full transition-colors ${isScrolled ? "text-primary hover:bg-primary/10" : "text-white drop-shadow-md hover:bg-white/10"
                    }`}
                >
                  <User size={24} />
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative z-50 p-2 transition-colors ${isOpen || isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white hover:text-white/80 drop-shadow-md"
                  }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Premium Mobile Drawer Navigation */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] md:hidden"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-[280px] bg-background border-l border-border z-[100] md:hidden shadow-2xl flex flex-col"
              >
                <div className="p-6 pt-24 flex flex-col gap-2 flex-grow">
                  <div className="flex items-center gap-2 mb-6 px-4">
                    <Sparkles className="text-primary w-4 h-4" />
                    <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Excellence</p>
                  </div>
                  {navItems.map((item, idx) => {
                    const isActive = pathname === item.href
                    return (
                      <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        key={item.href}
                      >
                        <Link
                          href={item.href}
                          className={`group flex items-center justify-between px-4 py-4 rounded-2xl transition-all ${isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-primary/5 hover:text-primary"
                            }`}
                        >
                          <span className="font-bold tracking-tight">{item.label}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-primary-foreground' : 'text-primary/40'}`} />
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="p-6 border-t border-border bg-secondary/10">
                  {isAdmin || patient ? (
                    <div className="flex flex-col gap-3">
                      <Link
                        href={isAdmin ? "/admin" : "/patient-dashboard"}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg"
                      >
                        <User size={18} />
                        View Dashboard
                      </Link>
                      <button
                        onClick={() => logout()}
                        className="w-full py-4 text-foreground border border-border rounded-2xl font-bold hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Log out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsAuthOpen(true)
                        setIsOpen(false)
                      }}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl overflow-hidden relative group/mbtn"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/mbtn:animate-shine" />
                      <Sparkles size={18} />
                      Book Now
                    </button>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Common Authentication Modal */}
        <BookingModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          packageName="Siddhaka Ayurveda"
        />

        <style jsx global>{`
          @keyframes shine {
            100% {
              transform: translateX(100%);
            }
          }
          .animate-shine {
            animation: shine 0.8s ease-in-out;
          }
        `}</style>
      </nav>

      {/* Spacer to prevent content from being covered on pages without a hero image */}
      {!["/", "/ayurveda"].includes(pathname) && (
        <div className="h-16 md:h-20" />
      )}
    </>
  )
}

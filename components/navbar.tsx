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
    { label: "Ayurveda Medical System", href: "/ayurveda" },
    { label: "Our Treatments", href: "/treatments" },
    { label: "Our Treatment Packages", href: "/packages" },
    { label: "Our Products", href: "/products" },
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
          <div className="flex justify-between items-center h-16 md:h-20">
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
                  width={200}
                  height={64}
                  className="h-12 md:h-16 w-auto object-contain"
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
                      ? isScrolled
                        ? "text-primary"
                        : isNotHomeOrAyurveda
                          ? "text-primary"
                          : "text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                      : isScrolled
                        ? "text-foreground group-hover:text-primary"
                        : isNotHomeOrAyurveda
                          ? "text-foreground"
                          : "text-white hover:text-white/80 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                      }`}>
                      {item.label}
                    </span>
                    {/* Enhanced underline with better visibility */}
                    <div className={`absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-300 origin-center shadow-lg shadow-primary/50 ${isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 group-hover:scale-x-100 opacity-30 group-hover:opacity-60"
                      }`} />
                  </Link>
                )
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://wa.me/94704488844?text=Hello!%20I%20am%20interested%20in%20booking%20a%20consultation%20with%20Siddhaka%20Ayurveda."
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full transition-all duration-300 bg-green-500/10 text-green-600 hover:bg-green-500 hover:text-white shadow-sm group/whatsapp`}
                title="Chat on WhatsApp"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </motion.a>

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
              <a
                href="https://wa.me/94704488844?text=Hello!%20I%20am%20interested%20in%20booking%20a%20consultation%20with%20Siddhaka%20Ayurveda."
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-all duration-300 ${isScrolled
                  ? "text-green-600 hover:bg-green-50"
                  : "text-white drop-shadow-md hover:bg-white/10"
                  }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
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

                <div className="p-6 border-t border-border bg-secondary/10 flex flex-col gap-3">
                  <a
                    href="https://wa.me/94704488844?text=Hello!%20I%20am%20interested%20in%20booking%20a%20consultation%20with%20Siddhaka%20Ayurveda."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-4 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-transform"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
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
        <div className="h-20 md:h-24" />
      )}
    </>
  )
}

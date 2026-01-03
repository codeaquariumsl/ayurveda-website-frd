"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useAuth } from "./auth-context"
import { useRouter, usePathname } from "next/navigation"
import { BookingModal } from "./booking-modal"

export default function Navbar() {
  const { patient, isAdmin, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!mounted) return null

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Siddhaka_ayurveda_Logo.png"
              alt="Siddhaka Ayurveda"
              width={160}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors font-medium ${isActive ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="hidden md:flex gap-3 items-center">
            {!isAdmin && !patient ? (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
              >
                Login
              </button>
            ) : (
              <>
                {isAdmin ? (
                  <Link
                    href="/admin"
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/patient-dashboard"
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
                  >
                    My Dashboard
                  </Link>
                )}
                <button
                  onClick={() => logout()}
                  className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-3 pt-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 rounded transition-colors ${isActive
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
              {!isAdmin && !patient ? (
                <button
                  onClick={() => {
                    setIsAuthOpen(true)
                    setIsOpen(false)
                  }}
                  className="mx-4 py-2 mt-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium text-center"
                >
                  Book Now
                </button>
              ) : (
                <div className="flex flex-col gap-2 px-4">
                  {isAdmin ? (
                    <Link
                      href="/admin"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium w-full text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/patient-dashboard"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium w-full text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      My Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Common Authentication Modal */}
      <BookingModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        packageName="Siddhaka Ayurveda"
      />
    </nav>
  )
}

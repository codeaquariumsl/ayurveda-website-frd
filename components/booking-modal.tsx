"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useAuth } from "./auth-context"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  packageName: string
  packageId?: string
}

export function BookingModal({ isOpen, onClose, packageName, packageId }: BookingModalProps) {
  const { patient, addBooking, register, login, packages, getAvailableTimeSlots } = useAuth()
  const [mode, setMode] = useState<"login" | "register" | "booking">(patient ? "booking" : "login")
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])

  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    country: "",
    gender: "",
  })
  const [bookingForm, setBookingForm] = useState({
    date: "",
    timeSlot: "",
    notes: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (patient) {
      setMode("booking")
    } else {
      setMode("login")
    }
  }, [patient])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(loginForm.email, loginForm.password)
      setMode("booking")
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const { confirmPassword, ...userData } = registerForm
      await register(userData)
      setMode("booking")
    } catch (err: any) {
      setError(err.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!patient) return

    setLoading(true)
    try {
      const pkg = packages.find((p) => (p._id || p.id) === packageId || p.name === packageName)

      await addBooking({
        packageId: packageId || pkg?._id || pkg?.id || "",
        date: bookingForm.date,
        timeSlot: bookingForm.timeSlot,
        notes: bookingForm.notes,
        patientDetails: {
          email: patient.email,
          phone: patient.phone,
          gender: patient.gender,
          country: patient.country,
        },
      })

      alert("Booking confirmed! You can view it in your patient dashboard.")
      setBookingForm({ date: "", timeSlot: "", notes: "" })
      onClose()
    } catch (err: any) {
      setError(err.message || "Booking failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchSlots = async () => {
      if (mode === "booking" && bookingForm.date) {
        const pkg = packages.find((p) => (p._id || p.id) === packageId || p.name === packageName)
        if (pkg) {
          const slots = await getAvailableTimeSlots((pkg._id || pkg.id) as string, bookingForm.date)
          setAvailableTimeSlots(slots)
        }
      }
    }
    fetchSlots()
  }, [bookingForm.date, packageName, packageId, packages, getAvailableTimeSlots, mode])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl text-foreground">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">
            {mode === "login" && "Login"}
            {mode === "register" && "Create Account"}
            {mode === "booking" && `Book ${packageName}`}
          </h2>
          <button onClick={onClose} className="hover:opacity-80 transition-opacity">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

          {/* Login Form */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="user@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("register")
                  setError("")
                }}
                className="w-full py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Register Form */}
          {mode === "register" && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Phone</label>
                  <input
                    type="tel"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="+94 77 123 4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={registerForm.dateOfBirth}
                    onChange={(e) => setRegisterForm({ ...registerForm, dateOfBirth: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Gender</label>
                  <select
                    value={registerForm.gender}
                    onChange={(e) => setRegisterForm({ ...registerForm, gender: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Country</label>
                <input
                  type="text"
                  value={registerForm.country}
                  onChange={(e) => setRegisterForm({ ...registerForm, country: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Your country"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Password</label>
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Confirm</label>
                  <input
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("login")
                  setError("")
                }}
                className="w-full py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Back to Login
              </button>
            </form>
          )}

          {/* Booking Form */}
          {mode === "booking" && (
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Patient:</span> {patient?.name}
                </p>
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Email:</span> {patient?.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value, timeSlot: "" })}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Preferred Time Slot</label>
                {bookingForm.date ? (
                  availableTimeSlots.length > 0 ? (
                    <select
                      value={bookingForm.timeSlot}
                      onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    >
                      <option value="">Select Time Slot</option>
                      {availableTimeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="w-full px-3 py-2 border border-red-300 bg-red-50 rounded-lg text-sm text-red-700">
                      No available slots for this date. Please choose another date.
                    </div>
                  )
                ) : (
                  <select disabled className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-sm text-muted-foreground">
                    <option>Select a date first</option>
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Additional Notes</label>
                <textarea
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  rows={3}
                  placeholder="Any specific requirements or health conditions?"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !bookingForm.date || !bookingForm.timeSlot}
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Confirming..." : "Confirm Booking"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

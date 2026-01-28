"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "./auth-context"
import { countries } from "@/lib/countries"
import { sriLankaCities } from "@/lib/sri-lanka-cities"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  packageName: string
  packageId?: string
}

export function BookingModal({ isOpen, onClose, packageName, packageId }: BookingModalProps) {
  const { patient, addBooking, register, login, packages, getAvailableTimeSlots } = useAuth()
  const { toast } = useToast()
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
    city: "",
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(registerForm.email)) {
      setError("Please enter a valid email address")
      return
    }

    // Phone validation
    const cleanedPhone = registerForm.phone.replace(/[^\d+]/g, "")
    const isSriLanka = registerForm.country.toLowerCase().includes("sri lanka") || registerForm.country.toLowerCase() === "sl"

    if (isSriLanka) {
      const slPhoneRegex = /^(?:\+94|94|0)?7\d{8}$/
      if (!slPhoneRegex.test(cleanedPhone)) {
        setError("Please enter a valid Sri Lankan phone number (e.g., 0771234567 or +94771234567)")
        return
      }
    } else {
      const generalPhoneRegex = /^\+?\d{7,15}$/
      if (!generalPhoneRegex.test(cleanedPhone)) {
        setError("Please enter a valid phone number with country code")
        return
      }
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (registerForm.password.length < 6) {
      setError("Password must be at least 6 characters long")
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

      toast({
        title: "Booking Confirmed",
        description: "You can view it in your patient dashboard.",
      })
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div
        className={`bg-white rounded-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-foreground transition-all duration-300 ${mode === "register" ? "max-w-5xl" : "max-w-md"
          }`}
      >
        {/* Header - Only show simple header for non-register modes */}
        {mode !== "register" && (
          <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
            <h2 className="text-xl font-bold text-primary">
              {mode === "login" && "Login"}
              {mode === "booking" && `Book ${packageName}`}
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        )}

        <div className={mode === "register" ? "flex flex-col md:flex-row min-h-[500px]" : "p-5"}>

          {/* Register Layout: Left Image Side */}
          {mode === "register" && (
            <div className="hidden md:flex md:w-5/12 relative flex-col justify-between p-8 text-white">
              <div className="absolute inset-0 z-0">
                <img src="/wellcome.JPG" alt="Welcome" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-2">Begin Your Journey</h3>
                <p className="text-primary-foreground/90">Join Siddhaka Ayurveda and experience holistic wellness tailored just for you.</p>
              </div>
              <div className="relative z-10 text-xs opacity-70">
                © Siddhaka Ayurveda
              </div>
            </div>
          )}

          {/* Content Side */}
          <div className={`${mode === "register" ? "w-full md:w-7/12 p-6 md:p-8" : ""}`}>

            {/* Register Close Button (specific position for this layout) */}
            {mode === "register" && (
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
            )}

            {error && <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {error}
            </div>}

            {/* Login Form */}
            {mode === "login" && (
              <form onSubmit={handleLogin} className="space-y-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    placeholder="user@email.com"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                  </div>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    placeholder="••••••••"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98] disabled:opacity-70"
                  >
                    {loading ? "Logging in..." : "Sign In"}
                  </button>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">Or</span></div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMode("register")
                    setError("")
                  }}
                  className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all text-sm"
                >
                  Create New Account
                </button>
              </form>
            )}

            {/* Register Form */}
            {mode === "register" && (
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    placeholder="e.g. First Name Last Name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      placeholder="+94 77 123 4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
                    <input
                      type="date"
                      value={registerForm.dateOfBirth}
                      onChange={(e) => setRegisterForm({ ...registerForm, dateOfBirth: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                    <div className="relative">
                      <select
                        value={registerForm.gender}
                        onChange={(e) => setRegisterForm({ ...registerForm, gender: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm appearance-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                  <div className="relative">
                    <select
                      value={registerForm.country}
                      onChange={(e) => {
                        const newCountry = e.target.value
                        setRegisterForm({
                          ...registerForm,
                          country: newCountry,
                          city: newCountry !== "Sri Lanka" ? "" : registerForm.city
                        })
                      }}
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm appearance-none"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                {registerForm.country === "Sri Lanka" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City (Sri Lanka)</label>
                    <div className="relative">
                      <select
                        value={registerForm.city}
                        onChange={(e) => setRegisterForm({ ...registerForm, city: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm appearance-none"
                      >
                        <option value="">Select City</option>
                        {sriLankaCities.sort().map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <input
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      placeholder="Min. 6 characters"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                    <input
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                      placeholder="Re-enter password"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-[0.99] disabled:opacity-70"
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login")
                        setError("")
                      }}
                      className="text-sm text-gray-500 hover:text-primary transition-colors font-medium"
                    >
                      Already have an account? <span className="underline">Log in</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Booking Form */}
            {mode === "booking" && (
              <form onSubmit={handleBooking} className="space-y-5 pt-2">
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{patient?.name}</p>
                      <p className="text-xs text-gray-500">{patient?.email}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value, timeSlot: "" })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Time Slot</label>
                  {bookingForm.date ? (
                    availableTimeSlots.length > 0 ? (
                      <div className="relative">
                        <select
                          value={bookingForm.timeSlot}
                          onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                          required
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm appearance-none"
                        >
                          <option value="">Select Time Slot</option>
                          {availableTimeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full px-4 py-3 border border-amber-200 bg-amber-50 rounded-xl text-sm text-amber-700 flex items-center gap-2">
                        <span>⚠️</span> No available slots for this date.
                      </div>
                    )
                  ) : (
                    <div className="w-full px-4 py-2.5 border border-gray-100 bg-gray-50 rounded-xl text-sm text-gray-400 italic">
                      Please select a date first
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes (Optional)</label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                    rows={3}
                    placeholder="Any specific requirements or health conditions?"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !bookingForm.date || !bookingForm.timeSlot}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:shadow-none"
                  >
                    {loading ? "Confirming..." : "Confirm Booking"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

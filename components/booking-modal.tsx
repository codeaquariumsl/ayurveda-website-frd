"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, User, Mail, Phone, Globe, Calendar, Clock, ChevronRight, ChevronLeft, MapPin, ClipboardList, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "./auth-context"
import { countries } from "@/lib/countries"
import { motion, AnimatePresence } from "framer-motion"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  packageName: string
  packageId?: string
}

export function BookingModal({ isOpen, onClose, packageName, packageId }: BookingModalProps) {
  const { addBooking, packages, getAvailableTimeSlots } = useAuth()
  const { toast } = useToast()
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    country: "",
    date: "",
    timeSlot: "",
    notes: "",
    packageId: packageId || "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }

    setLoading(true)
    setError("")

    try {
      const selectedPkgId = bookingForm.packageId || packageId
      const pkg = packages.find((p) => (p._id || p.id) === selectedPkgId || p.name === packageName)

      if (!selectedPkgId && !pkg) {
        throw new Error("Please select a package")
      }

      await addBooking({
        packageId: selectedPkgId || pkg?._id || pkg?.id || "",
        date: bookingForm.date,
        timeSlot: bookingForm.timeSlot,
        notes: bookingForm.notes,
        patientDetails: {
          name: bookingForm.name,
          email: bookingForm.email,
          phone: bookingForm.phone,
          gender: bookingForm.gender,
          country: bookingForm.country,
        },
      })

      toast({
        title: "Booking Submitted Successfully",
        description: "Our team will contact you soon to confirm.",
      })

      // Reset and close
      setStep(1)
      setBookingForm({
        packageId: packageId || "",
        name: "",
        email: "",
        phone: "",
        gender: "",
        country: "",
        date: "",
        timeSlot: "",
        notes: "",
      })
      onClose()
    } catch (err: any) {
      setError(err.message || "Booking failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchSlots = async () => {
      if (bookingForm.date) {
        const selectedPkgId = bookingForm.packageId || packageId
        const pkg = packages.find((p) => (p._id || p.id) === selectedPkgId || p.name === packageName)
        if (pkg) {
          const slots = await getAvailableTimeSlots((pkg._id || pkg.id) as string, bookingForm.date)
          setAvailableTimeSlots(slots)
        }
      }
    }
    fetchSlots()
  }, [bookingForm.date, bookingForm.packageId, packageName, packageId, packages, getAvailableTimeSlots])

  if (!isOpen || !mounted) return null

  const progress = (step / 2) * 100

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl w-full max-w-xl max-h-[92vh] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-foreground flex flex-col"
        >
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary"
            />
          </div>

          <div className="p-6 md:p-8 flex justify-between items-center bg-gray-50/50">
            <div>
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                {step === 1 ? <User size={24} /> : <Calendar size={24} />}
                {packageName || packages.find(p => (p._id || p.id) === bookingForm.packageId)?.name || "New Appointment"}
              </h2>
              <p className="text-gray-500 text-sm font-medium mt-1">
                {step === 1 ? "Step 1: Patient Information" : "Step 2: Appointment Schedule"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-400 hover:text-gray-600 border border-transparent hover:border-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-4 custom-scrollbar">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleBooking} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5">
                      <div className="relative group">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                          <input
                            type="text"
                            value={bookingForm.name}
                            onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                            required
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-sm font-medium placeholder:text-gray-300 shadow-sm group-hover:border-gray-200"
                            placeholder="Full name as per ID"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="relative group">
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email (Optional)</label>
                          <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                              type="email"
                              value={bookingForm.email}
                              onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                              className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-sm font-medium placeholder:text-gray-300 shadow-sm group-hover:border-gray-200"
                              placeholder="email@example.com"
                            />
                          </div>
                        </div>

                        <div className="relative group">
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
                          <div className="relative">
                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                              type="tel"
                              value={bookingForm.phone}
                              onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                              required
                              className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-sm font-medium placeholder:text-gray-300 shadow-sm group-hover:border-gray-200"
                              placeholder="+1 234 567 890"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div className="relative group">
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Gender</label>
                          <div className="relative">
                            <select
                              value={bookingForm.gender}
                              onChange={(e) => setBookingForm({ ...bookingForm, gender: e.target.value })}
                              required
                              className="w-full pl-4 pr-10 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white appearance-none transition-all text-sm font-medium shadow-sm group-hover:border-gray-200"
                            >
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                              <ChevronRight size={16} className="rotate-90" />
                            </div>
                          </div>
                        </div>

                        <div className="relative group">
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Country</label>
                          <div className="relative">
                            <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <select
                              value={bookingForm.country}
                              onChange={(e) => setBookingForm({ ...bookingForm, country: e.target.value })}
                              required
                              className="w-full pl-12 pr-10 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white appearance-none transition-all text-sm font-medium shadow-sm group-hover:border-gray-200"
                            >
                              <option value="">Select Country</option>
                              {countries.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                              <ChevronRight size={16} className="rotate-90" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {!packageId && !packageName && (
                      <div className="relative group">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Treatment Package</label>
                        <div className="relative">
                          <ClipboardList size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                          <select
                            value={bookingForm.packageId}
                            onChange={(e) => setBookingForm({ ...bookingForm, packageId: e.target.value })}
                            required
                            className="w-full pl-12 pr-10 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white appearance-none transition-all text-sm font-medium shadow-sm group-hover:border-gray-200"
                          >
                            <option value="">Choose a treatment...</option>
                            {[...new Set(packages.map(p => p.category))].map(cat => (
                              <optgroup key={cat} label={cat?.charAt(0).toUpperCase() + cat?.slice(1)}>
                                {packages.filter(p => p.category === cat).map(p => (
                                  <option key={p._id || p.id} value={p._id || p.id}>{p.name}</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ChevronRight size={16} className="rotate-90" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative group">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Select Date</label>
                        <div className="relative">
                          <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                          <input
                            type="date"
                            value={bookingForm.date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value, timeSlot: "" })}
                            required
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white appearance-none transition-all text-sm font-medium shadow-sm group-hover:border-gray-200"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Time Slot</label>
                        <div className="flex items-center gap-2 p-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-medium text-gray-500 shadow-sm transition-all whitespace-nowrap overflow-hidden">
                          <Clock size={16} className="text-primary/60 shrink-0" />
                          {bookingForm.timeSlot ? (
                            <span className="text-primary font-bold">{bookingForm.timeSlot}</span>
                          ) : (
                            <span className="italic text-gray-300">Pick a slot below</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        Available Slots
                        {!bookingForm.date && <span className="text-[10px] text-primary/40 normal-case font-medium">(Select a date first)</span>}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(availableTimeSlots.length > 0 ? availableTimeSlots : [
                          "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
                        ]).map((slot) => {
                          const isSelected = bookingForm.timeSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={!bookingForm.date}
                              onClick={() => setBookingForm({ ...bookingForm, timeSlot: slot })}
                              className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${isSelected
                                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                                  : "bg-white text-gray-500 border-gray-100 hover:border-primary/30 hover:bg-primary/5 disabled:opacity-30 disabled:hover:bg-white disabled:hover:border-gray-100"
                                }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1 flex justify-between">
                        Notes & Requests (Optional)
                        <span className="text-[10px] text-gray-300 normal-case font-medium tracking-normal">{bookingForm.notes.length}/200</span>
                      </label>
                      <textarea
                        value={bookingForm.notes}
                        maxLength={200}
                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                        className="w-full px-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white transition-all text-sm font-medium resize-none shadow-sm group-hover:border-gray-200"
                        rows={3}
                        placeholder="Any health conditions or specific requests?"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-6 flex gap-3">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all border border-gray-100 active:scale-[0.98]"
                  >
                    <ChevronLeft size={20} />
                  </button>
                ) as any}
                <button
                  type="submit"
                  disabled={loading || (step === 2 && (!bookingForm.date || !bookingForm.timeSlot))}
                  className="flex-1 py-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-[0_10px_25px_rgba(var(--primary-rgb),0.25)] hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : step === 1 ? (
                    <>
                      Continue to Scheduling
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      Confirm & Book Now
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="p-4 bg-gray-50/50 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
              Secure Booking · Siddhaka Wellness Resort
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  )
}

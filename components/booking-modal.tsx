"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "./auth-context"
import { countries } from "@/lib/countries"

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

  return createPortal(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl text-foreground transition-all duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-primary">
            {packageName
              ? `Book ${packageName}`
              : bookingForm.packageId
                ? `Book ${packages.find(p => (p._id || p.id) === bookingForm.packageId)?.name}`
                : "Book an Appointment"
            }
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {error}
            </div>
          )}

          <form onSubmit={handleBooking} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Patient Details</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    placeholder="+94 77 123 4567"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                    <select
                      value={bookingForm.gender}
                      onChange={(e) => setBookingForm({ ...bookingForm, gender: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                    <select
                      value={bookingForm.country}
                      onChange={(e) => setBookingForm({ ...bookingForm, country: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white"
                    >
                      <option value="">Select</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Appointment Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Appointment Details</h3>

                {!packageId && !packageName && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Package</label>
                    <select
                      value={bookingForm.packageId}
                      onChange={(e) => setBookingForm({ ...bookingForm, packageId: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white"
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
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value, timeSlot: "" })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Time Slot</label>
                  {bookingForm.date ? (
                    <select
                      value={bookingForm.timeSlot}
                      onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm bg-white"
                    >
                      <option value="">Select Time Slot</option>
                      {(availableTimeSlots.length > 0 ? availableTimeSlots : [
                        "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
                      ]).map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="w-full px-4 py-2.5 border border-gray-100 bg-gray-50 rounded-xl text-sm text-gray-400 italic">
                      Select a date first
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes</label>
                  <textarea
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none"
                    rows={4}
                    placeholder="Any health conditions or specific requests?"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading || !bookingForm.date || !bookingForm.timeSlot}
                className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.99] disabled:opacity-50 disabled:shadow-none"
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  )
}

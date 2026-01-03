"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Eye, EyeOff, LogOut, X, Calendar } from "lucide-react"
import { ProductManagement } from "@/components/product-management"
import { PackageManagement } from "@/components/package-management"

export default function AdminPage() {
  const { isAdmin, logout, bookings, updateBooking, login } = useAuth()
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<"bookings" | "calendar" | "products" | "packages">("bookings")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [rescheduleData, setRescheduleData] = useState({ date: "", timeSlot: "" })

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(adminEmail, adminPassword)
    } catch (err: any) {
      alert(err.message || "Incorrect admin credentials")
    }
  }

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      updateBooking(bookingId, { status: "cancelled" })
      alert("Booking cancelled successfully")
      setSelectedBooking(null)
    }
  }

  const handleUpdateStatus = (bookingId: string, newStatus: any) => {
    updateBooking(bookingId, { status: newStatus })
    if (selectedBooking) {
      setSelectedBooking({ ...selectedBooking, status: newStatus })
    }
    alert(`Booking status updated to ${newStatus}`)
  }

  const handleRescheduleBooking = (bookingId: string) => {
    if (!rescheduleData.date) {
      alert("Please select a date")
      return
    }
    updateBooking(bookingId, {
      date: rescheduleData.date,
      timeSlot: rescheduleData.timeSlot || bookings.find((b) => b.id === bookingId)?.timeSlot,
      status: "rescheduled",
    })
    alert("Booking rescheduled successfully")
    setShowRescheduleModal(false)
    setRescheduleData({ date: "", timeSlot: "" })
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground mb-6">Enter admin credentials to access</p>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="admin@email.com"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          {/* <button
            onClick={() => {
              logout()
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary-foreground text-primary rounded hover:opacity-90 transition-opacity"
          >
            <LogOut size={18} />
            Logout
          </button> */}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto flex">
          {(["bookings", "calendar", "products", "packages"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize flex items-center gap-2 ${activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {tab === "calendar" && <Calendar size={18} />}
              {tab === "bookings" && "Manage Bookings"}
              {tab === "calendar" && "Booking Calendar"}
              {tab === "products" && "Manage Products"}
              {tab === "packages" && "Manage Packages"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Bookings Section */}
        {activeTab === "bookings" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Patient Bookings</h2>
            {bookings && bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-card rounded-lg border border-border p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Patient Name</p>
                        <p className="font-semibold text-foreground text-lg">{booking.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Package</p>
                        <p className="font-semibold text-foreground">{booking.packageName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-semibold text-foreground">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time Slot</p>
                        <p className="font-semibold text-foreground">{booking.timeSlot || "Not specified"}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Status</p>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : booking.status === "completed"
                                  ? "bg-blue-100 text-blue-700"
                                  : booking.status === "cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-purple-100 text-purple-700"
                              }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                        <p className="text-sm text-foreground">{booking.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card rounded-lg border border-border p-8 text-center">
                <p className="text-muted-foreground">No bookings yet</p>
              </div>
            )}
          </div>
        )}

        {/* Calendar Section */}
        {activeTab === "calendar" && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Booking Calendar</h2>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar view */}
                <div className="lg:col-span-2">
                  <div className="bg-background rounded-lg p-4">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-foreground">
                        {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </h3>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 35 }).map((_, i) => {
                        const date = new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          i - new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() + 1,
                        )
                        const isCurrentMonth = date.getMonth() === new Date().getMonth()
                        const bookingsOnDate = bookings.filter((b) => b.date === date.toISOString().split("T")[0])
                        return (
                          <div
                            key={i}
                            className={`p-2 rounded text-center text-sm font-medium cursor-pointer ${isCurrentMonth
                              ? bookingsOnDate.length > 0
                                ? "bg-primary text-primary-foreground"
                                : "bg-background text-foreground hover:bg-secondary"
                              : "text-muted-foreground bg-muted/20"
                              }`}
                          >
                            <div>{date.getDate()}</div>
                            {bookingsOnDate.length > 0 && (
                              <div className="text-xs mt-1">
                                {bookingsOnDate.length} booking{bookingsOnDate.length > 1 ? "s" : ""}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Upcoming bookings summary */}
                <div>
                  <h3 className="font-bold text-foreground mb-4">Upcoming Bookings (Next 7 days)</h3>
                  <div className="space-y-3">
                    {bookings
                      .filter((b) => {
                        const bookingDate = new Date(b.date)
                        const today = new Date()
                        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                        return bookingDate >= today && bookingDate <= nextWeek && b.status !== "cancelled"
                      })
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((booking: any, idx: number) => (
                        <div key={idx} className="bg-background rounded p-3 text-sm border border-border">
                          <p className="font-semibold text-foreground">{booking.patientName}</p>
                          <p className="text-muted-foreground text-xs">
                            {booking.date} {booking.timeSlot}
                          </p>
                          <p className="text-muted-foreground text-xs">{booking.packageName}</p>
                        </div>
                      ))}
                    {bookings.filter((b) => {
                      const bookingDate = new Date(b.date)
                      const today = new Date()
                      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                      return bookingDate >= today && bookingDate <= nextWeek && b.status !== "cancelled"
                    }).length === 0 && <p className="text-muted-foreground text-sm">No upcoming bookings</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Section */}
        {activeTab === "products" && <ProductManagement />}

        {/* Packages Section */}
        {activeTab === "packages" && <PackageManagement />}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-primary text-primary-foreground p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <button onClick={() => setSelectedBooking(null)} className="hover:opacity-80 transition-opacity">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Information */}
              <div>
                <h3 className="font-bold text-foreground mb-3">Patient Information</h3>
                <div className="bg-background rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Name:</span>{" "}
                    <span className="text-muted-foreground">{selectedBooking.patientName}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Status:</span>
                    <span
                      className={`ml-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${selectedBooking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : selectedBooking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : selectedBooking.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : selectedBooking.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                    >
                      {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Booking Information */}
              <div>
                <h3 className="font-bold text-foreground mb-3">Booking Information</h3>
                <div className="bg-background rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Package:</span>{" "}
                    <span className="text-muted-foreground">{selectedBooking.packageName}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Date:</span>{" "}
                    <span className="text-muted-foreground">{selectedBooking.date}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Time Slot:</span>{" "}
                    <span className="text-muted-foreground">{selectedBooking.timeSlot || "Not specified"}</span>
                  </p>
                  {selectedBooking.notes && (
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">Notes:</span>{" "}
                      <span className="text-muted-foreground">{selectedBooking.notes}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Status Management */}
              <div>
                <h3 className="font-bold text-foreground mb-3">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {(["pending", "confirmed", "completed", "cancelled", "rescheduled"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedBooking._id || selectedBooking.id, status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${selectedBooking.status === status
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-secondary"
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {selectedBooking.status !== "cancelled" && (
                <div className="flex gap-3">
                  {selectedBooking.status !== "completed" && (
                    <button
                      onClick={() => setShowRescheduleModal(true)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Reschedule
                    </button>
                  )}
                  <button
                    onClick={() => handleCancelBooking(selectedBooking.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-md w-full shadow-xl">
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Reschedule Booking</h2>
              <button
                onClick={() => {
                  setShowRescheduleModal(false)
                  setRescheduleData({ date: "", timeSlot: "" })
                }}
                className="hover:opacity-80 transition-opacity"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">New Date</label>
                <input
                  type="date"
                  value={rescheduleData.date}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">New Time Slot</label>
                <select
                  value={rescheduleData.timeSlot}
                  onChange={(e) => setRescheduleData({ ...rescheduleData, timeSlot: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="">Keep current time slot</option>
                  <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                  <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                  <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                  <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                  <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleRescheduleBooking(selectedBooking.id)}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Confirm Reschedule
                </button>
                <button
                  onClick={() => {
                    setShowRescheduleModal(false)
                    setRescheduleData({ date: "", timeSlot: "" })
                  }}
                  className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

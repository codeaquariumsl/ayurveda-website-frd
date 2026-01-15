"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-context"
import { Eye, EyeOff, LogOut, X, Calendar } from "lucide-react"
import { ProductManagement } from "@/components/product-management"
import { PackageManagement } from "@/components/package-management"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const { isAdmin, logout, bookings, updateBooking, login } = useAuth()
  const { toast } = useToast()
  const [adminEmail, setAdminEmail] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState<"bookings" | "calendar" | "products" | "packages" | "treatments">("bookings")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [rescheduleData, setRescheduleData] = useState({ date: "", timeSlot: "" })
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])

  const [bookingFilter, setBookingFilter] = useState({
    status: "all",
    search: "",
    date: "",
  })

  const filteredBookings = bookings
    ?.filter((booking) => {
      const matchesStatus = bookingFilter.status === "all" || booking.status === bookingFilter.status
      const matchesSearch =
        booking.patientName?.toLowerCase().includes(bookingFilter.search.toLowerCase()) ||
        booking.packageName?.toLowerCase().includes(bookingFilter.search.toLowerCase()) ||
        booking.notes?.toLowerCase().includes(bookingFilter.search.toLowerCase())
      const matchesDate = !bookingFilter.date || booking.date === bookingFilter.date

      return matchesStatus && matchesSearch && matchesDate
    })
    .sort((a, b) => {
      const today = new Date().toISOString().split("T")[0]
      const isPastA = a.date < today
      const isPastB = b.date < today

      // 1. Prioritize upcoming (false) over past (true)
      if (isPastA !== isPastB) {
        return isPastA ? 1 : -1
      }

      // 2. Sort by date
      if (a.date !== b.date) {
        // Upcoming: closer date first (asc) | Past: recent past first (desc)
        return isPastA ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
      }

      // 3. Sort by time slot
      return (a.timeSlot || "").localeCompare(b.timeSlot || "")
    })

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(adminEmail, adminPassword)
      toast({
        title: "Login Successful",
        description: "Welcome back, Admin",
      })
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: err.message || "Incorrect admin credentials",
      })
    }
  }

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      updateBooking(bookingId, { status: "cancelled" })
      toast({
        title: "Booking Cancelled",
        description: "The booking has been successfully cancelled.",
      })
      setSelectedBooking(null)
    }
  }

  const handleUpdateStatus = (bookingId: string, newStatus: any) => {
    updateBooking(bookingId, { status: newStatus })
    if (selectedBooking) {
      setSelectedBooking({ ...selectedBooking, status: newStatus })
    }
    toast({
      title: "Status Updated",
      description: `Booking status updated to ${newStatus}`,
    })
  }

  const handleRescheduleBooking = (bookingId: string) => {
    if (!rescheduleData.date) {
      toast({
        variant: "destructive",
        title: "Date Required",
        description: "Please select a date",
      })
      return
    }
    updateBooking(bookingId, {
      date: rescheduleData.date,
      timeSlot: rescheduleData.timeSlot || bookings.find((b) => b.id === bookingId)?.timeSlot,
      status: "rescheduled",
    })
    toast({
      title: "Booking Rescheduled",
      description: "The booking has been successfully rescheduled.",
    })
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
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto flex">
          {(["bookings", "calendar", "products", "treatments", "packages"] as const).map((tab) => (
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
              {tab === "treatments" && "Manage Treatments"}
              {tab === "packages" && "Manage Packages"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Bookings Section */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 bg-card p-4 rounded-lg border border-border">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-foreground mb-2">Search Patient / Package</label>
                <input
                  type="text"
                  value={bookingFilter.search}
                  onChange={(e) => setBookingFilter({ ...bookingFilter, search: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Search name, package..."
                />
              </div>
              <div className="w-full md:w-48">
                <label className="block text-sm font-semibold text-foreground mb-2">Status</label>
                <select
                  value={bookingFilter.status}
                  onChange={(e) => setBookingFilter({ ...bookingFilter, status: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rescheduled">Rescheduled</option>
                </select>
              </div>
              <div className="w-full md:w-48">
                <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
                <input
                  type="date"
                  value={bookingFilter.date}
                  onChange={(e) => setBookingFilter({ ...bookingFilter, date: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={() => setBookingFilter({ status: "all", search: "", date: "" })}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90"
              >
                Reset
              </button>
            </div>

            <h2 className="text-2xl font-bold text-foreground">Patient Bookings ({filteredBookings.length})</h2>

            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/10 border-b border-border">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Patient</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Package & Schedule</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right px-10">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredBookings.map((booking: any, idx: number) => {
                      const today = new Date().toISOString().split("T")[0];
                      const canComplete = booking.status === 'confirmed' && booking.date <= today;
                      const canCancel = booking.status === 'pending';
                      const canConfirm = booking.status === 'pending';

                      return (
                        <tr key={idx} className={`hover:bg-secondary/5 transition-colors group ${booking.date < today ? 'opacity-75' : ''}`}>
                          <td className="px-6 py-4">
                            <p className="font-bold text-foreground">{booking.patientName}</p>
                            <p className="text-[10px] text-muted-foreground uppercase font-medium">{booking.date < today ? 'Past Booking' : 'Active Appointment'}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-xs space-y-0.5">
                              <p className="text-muted-foreground">{booking.patientDetails?.email || 'No email'}</p>
                              <p className="font-medium">{booking.patientDetails?.phone || 'No phone'}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-primary text-sm line-clamp-1">{booking.packageName}</span>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                <span className="font-semibold">{booking.date}</span>
                                <span>|</span>
                                <span className="font-medium text-foreground">{booking.timeSlot || "Not Set"}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${booking.status === "confirmed" ? "bg-green-100 text-green-700 border border-green-200" :
                                  booking.status === "pending" ? "bg-yellow-100 text-yellow-700 border border-yellow-200" :
                                    booking.status === "completed" ? "bg-blue-100 text-blue-700 border border-blue-200" :
                                      booking.status === "cancelled" ? "bg-red-100 text-red-700 border border-red-200" :
                                        "bg-purple-100 text-purple-700 border border-purple-200"
                                }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right pr-6">
                            <div className="flex items-center justify-end gap-2">
                              {canConfirm && (
                                <button
                                  onClick={() => handleUpdateStatus((booking._id || booking.id), 'confirmed')}
                                  className="px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded hover:bg-green-600 transition-colors uppercase"
                                >
                                  Confirm
                                </button>
                              )}
                              {canComplete && (
                                <button
                                  onClick={() => handleUpdateStatus((booking._id || booking.id), 'completed')}
                                  className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded hover:opacity-90 transition-colors uppercase"
                                >
                                  Complete
                                </button>
                              )}
                              {canCancel && (
                                <button
                                  onClick={() => handleUpdateStatus((booking._id || booking.id), 'cancelled')}
                                  className="px-3 py-1 border border-red-200 text-red-600 hover:bg-red-50 text-[10px] font-bold rounded transition-colors uppercase"
                                >
                                  Cancel
                                </button>
                              )}
                              <button
                                onClick={() => setSelectedBooking(booking)}
                                className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/5 rounded"
                                title="View Details"
                              >
                                <Eye size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filteredBookings.length === 0 && (
                <div className="p-12 text-center text-muted-foreground italic bg-secondary/5">
                  No bookings found matching your current filters.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Calendar Section */}
        {activeTab === "calendar" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Booking Calendar</h2>
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Calendar view */}
                <div className="lg:col-span-2">
                  <div className="bg-background rounded-xl p-4 border border-border shadow-inner">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-foreground">
                        {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </h3>
                      <div className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        Today: {new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-center font-bold text-xs text-muted-foreground py-2 uppercase tracking-wider">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 35 }).map((_, i) => {
                        const date = new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          i - new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() + 1,
                        )
                        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                        const isCurrentMonth = date.getMonth() === new Date().getMonth()
                        const bookingsOnDate = bookings.filter((b) => b.date === formattedDate)
                        const isSelected = selectedDate === formattedDate
                        const isToday = new Date().toISOString().split('T')[0] === formattedDate

                        return (
                          <div
                            key={i}
                            onClick={() => setSelectedDate(formattedDate)}
                            className={`relative h-16 p-2 rounded-lg border transition-all cursor-pointer flex flex-col items-center justify-between
                              ${isCurrentMonth ? "bg-background" : "bg-muted/10 opacity-40"}
                              ${isSelected ? "border-primary ring-2 ring-primary/20 shadow-md transform scale-105 z-10" : "border-border hover:border-primary/50"}
                              ${isToday ? "border-dashed border-primary" : ""}
                            `}
                          >
                            <span className={`text-sm font-bold ${isSelected ? "text-primary text-base" : "text-foreground"}`}>
                              {date.getDate()}
                            </span>
                            {bookingsOnDate.length > 0 && (
                              <div className="flex gap-0.5 justify-center flex-wrap pb-1">
                                {bookingsOnDate.slice(0, 3).map((booking, idx) => {
                                  let statusColor = "bg-primary";
                                  if (booking.status === "confirmed") statusColor = "bg-green-500";
                                  else if (booking.status === "pending") statusColor = "bg-yellow-500";
                                  else if (booking.status === "completed") statusColor = "bg-blue-500";
                                  else if (booking.status === "cancelled") statusColor = "bg-red-500";
                                  else if (booking.status === "rescheduled") statusColor = "bg-purple-500";

                                  return (
                                    <div key={idx} className={`w-1.5 h-1.5 rounded-full ${statusColor} animate-pulse`} />
                                  );
                                })}
                                {bookingsOnDate.length > 3 && (
                                  <span className="text-[8px] font-bold text-muted-foreground">+{bookingsOnDate.length - 3}</span>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Day Details Side Panel */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                      <Calendar className="text-primary" size={20} />
                      Bookings: {new Date(selectedDate).toLocaleDateString("en-US", { day: 'numeric', month: 'long' })}
                    </h3>
                    <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase">
                      {bookings.filter((b) => b.date === selectedDate).length} Items
                    </span>
                  </div>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {bookings
                      .filter((b) => b.date === selectedDate)
                      .sort((a, b) => (a.timeSlot || "").localeCompare(b.timeSlot || ""))
                      .map((booking: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-background rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-all group"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{booking.patientName}</h4>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="font-semibold text-primary">{booking.timeSlot}</span> • {booking.packageName}
                              </p>
                            </div>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                                booking.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                  booking.status === "completed" ? "bg-blue-100 text-blue-700" :
                                    "bg-red-100 text-red-700"
                                }`}
                            >
                              {booking.status}
                            </span>
                          </div>

                          <div className="flex gap-2 pt-2 border-t border-dashed border-border mt-2">
                            {booking.status === 'pending' && (
                              <button
                                onClick={() => handleUpdateStatus((booking._id || booking.id), 'confirmed')}
                                className="flex-1 py-1.5 bg-green-500 text-white text-[10px] font-bold rounded-lg hover:bg-green-600 transition-colors uppercase"
                              >
                                Confirm
                              </button>
                            )}
                            {booking.status === 'confirmed' && booking.date <= new Date().toISOString().split('T')[0] && (
                              <button
                                onClick={() => handleUpdateStatus((booking._id || booking.id), 'completed')}
                                className="flex-1 py-1.5 bg-blue-500 text-white text-[10px] font-bold rounded-lg hover:bg-blue-600 transition-colors uppercase"
                              >
                                Complete
                              </button>
                            )}
                            {booking.status === 'pending' && (
                              <button
                                onClick={() => handleUpdateStatus((booking._id || booking.id), 'cancelled')}
                                className="flex-1 py-1.5 bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold rounded-lg hover:bg-red-100 transition-colors uppercase"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="p-1.5 text-muted-foreground hover:text-primary transition-colors ml-auto"
                            >
                              <Eye size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    {bookings.filter((b) => b.date === selectedDate).length === 0 && (
                      <div className="text-center py-12 bg-muted/5 rounded-xl border border-dashed border-border">
                        <Calendar className="mx-auto text-muted-foreground/30 mb-3" size={48} />
                        <p className="text-muted-foreground text-sm italic">No slots booked for this date yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Section */}
        {activeTab === "products" && <ProductManagement />}

        {/* Treatments Section (Wellness Packages) */}
        {activeTab === "treatments" && <PackageManagement filterCategory="wellness" title="Manage Treatments (Wellness Procedure)" />}

        {/* Packages Section (Special/Signature Packages) */}
        {activeTab === "packages" && (
          <div className="space-y-12">
            <PackageManagement filterCategory="special" title="Manage Special Packages" />
            <div className="pt-8 border-t border-border">
              <PackageManagement filterCategory="signature" title="Manage Signature Packages" />
            </div>
          </div>
        )}
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
                    <span className="font-semibold text-foreground">Email:</span>{" "}
                    <span className="text-muted-foreground">{selectedBooking.patientDetails.email}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Phone:</span>{" "}
                    <span className="text-muted-foreground">{selectedBooking.patientDetails.phone}</span>
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
                  {(["pending", "confirmed", "completed", "cancelled"] as const)
                    .filter(status => {
                      if (status === 'completed' && selectedBooking.date > new Date().toISOString().split('T')[0]) return false;
                      if (status === 'cancelled' && selectedBooking.status !== 'pending') return false;
                      return true;
                    })
                    .map((status) => (
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
                  {/* <button
                    onClick={() => handleCancelBooking(selectedBooking.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Cancel Booking
                  </button> */}
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

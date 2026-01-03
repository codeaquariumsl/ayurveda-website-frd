"use client"

import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Calendar, AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function PatientDashboard() {
  const { patient, bookings, logout, cancelBooking } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!localStorage.getItem("siddhaka_token")) {
      router.push("/")
    }
  }, [patient, router])

  if (!mounted || !patient) {
    return null
  }

  const upcomingBookings = bookings.filter(
    (b) => b.status !== "completed" && b.status !== "cancelled",
  )
  const completedBookings = bookings.filter((b) => b.status === "completed")
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={16} />
      case "cancelled":
        return <XCircle size={16} />
      case "pending":
        return <AlertCircle size={16} />
      default:
        return null
    }
  }

  const handleCancel = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelBooking(id)
        alert("Booking cancelled")
      } catch (err) {
        alert("Failed to cancel booking")
      }
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Welcome Back, {patient.name}!</h1>
              <p className="text-muted-foreground">Manage your bookings and wellness journey</p>
            </div>
            {/* <button
              onClick={() => {
                logout()
                router.push("/")
              }}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Logout
            </button> */}
          </div>
        </div>
      </section>

      {/* Patient Info */}
      <section className="py-6 md:py-8 bg-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-semibold text-foreground">{patient.email}</p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1">Phone</p>
              <p className="font-semibold text-foreground">{patient.phone}</p>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
              <p className="font-semibold text-foreground">
                {bookings.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Bookings */}
      <section className="py-6 md:py-8 bg-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <h2 className="text-3xl font-bold text-foreground mb-6">Upcoming Bookings</h2>
          {upcomingBookings.length === 0 ? (
            <div className="p-8 bg-card rounded-lg border border-border text-center">
              <p className="text-muted-foreground">No upcoming bookings. Ready to book a treatment?</p>
              <button
                onClick={() => router.push("/packages")}
                className="mt-4 inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Browse Packages
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingBookings.map((booking) => (
                <div key={booking._id || booking.id} className="p-5 bg-card rounded-lg border border-primary shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-foreground">{booking.packageName}</h3>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${getStatusColor(booking.status)}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>{new Date(booking.date).toLocaleDateString()} {booking.timeSlot}</span>
                    </div>
                    {booking.notes && (
                      <div className="text-sm text-muted-foreground italic">
                        <p className="font-semibold">Notes:</p>
                        <p>{booking.notes}</p>
                      </div>
                    )}
                  </div>
                  {booking.status !== "completed" && booking.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel((booking._id || booking.id) as string)}
                      className="w-full py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Completed Bookings */}
      {completedBookings.length > 0 && (
        <section className="py-6 md:py-8 bg-card/50">
          <div className="max-w-6xl mx-auto px-3 sm:px-4">
            <h2 className="text-3xl font-bold text-foreground mb-6">Completed Bookings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedBookings.map((booking) => (
                <div key={booking._id || booking.id} className="p-5 bg-background rounded-lg border border-border">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-foreground">{booking.packageName}</h3>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${getStatusColor(booking.status)}`}
                    >
                      {getStatusIcon(booking.status)}
                      Completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <span>{new Date(booking.date).toLocaleDateString()} {booking.timeSlot}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Helpful Links */}
      <section className="py-6 md:py-8 bg-card/50">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Helpful Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push("/treatments")}
              className="p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors text-center w-full"
            >
              <h3 className="font-semibold text-foreground mb-1">View Treatments</h3>
              <p className="text-sm text-muted-foreground">Explore all available treatments</p>
            </button>
            <button
              onClick={() => router.push("/packages")}
              className="p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors text-center w-full"
            >
              <h3 className="font-semibold text-foreground mb-1">Browse Packages</h3>
              <p className="text-sm text-muted-foreground">Book a new wellness package</p>
            </button>
            <button
              onClick={() => router.push("/")}
              className="p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors text-center w-full"
            >
              <h3 className="font-semibold text-foreground mb-1">Back Home</h3>
              <p className="text-sm text-muted-foreground">Go to homepage</p>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

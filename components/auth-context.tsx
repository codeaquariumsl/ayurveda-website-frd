"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export interface Patient {
  _id?: string
  id?: string
  name: string
  email: string
  phone: string
  dateOfBirth?: string
  address?: string
  country?: string
  gender?: "male" | "female" | "other" | ""
}

export interface Booking {
  _id?: string
  id?: string
  patientId: string
  patientName: string
  packageName: string
  packageId: string
  date: string
  timeSlot?: string
  status: "pending" | "confirmed" | "completed" | "cancelled" | "rescheduled"
  notes?: string
  createdAt: string
  patientDetails?: {
    email?: string
    phone?: string
    gender?: string
    country?: string
  }
}

export interface Product {
  _id?: string
  id?: string
  name: string
  subtitle: string
  description: string
  image: string
  keyIngredients: string[]
  freeFrom: string[]
  benefits: string[]
  category: "oils" | "gels" | "lotions" | "shampoos"
  createdAt: string
}

export interface ServicePackage {
  _id?: string
  id?: string
  name: string
  duration: number
  category: "wellness" | "special" | "signature"
  subcategory?: "head-hair" | "body-skin" | "facial" | "foot" | "full-day" | "half-day" | "7-day"
  description: string
  includes: string[]
  benefits?: string
  image?: string
  focus?: string
  featured?: boolean
  concurrentServices: number
  createdAt: string
}

interface AuthContextType {
  user: any | null
  patient: Patient | null
  bookings: Booking[]
  products: Product[]
  packages: ServicePackage[]
  isAdmin: boolean
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    name: string
    email: string
    phone: string
    password: string
    dateOfBirth: string
    country: string
    gender: string
  }) => Promise<void>
  logout: () => void
  fetchBookings: () => Promise<void>
  fetchProducts: () => Promise<void>
  fetchPackages: () => Promise<void>
  addBooking: (bookingData: any) => Promise<void>
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>
  cancelBooking: (id: string) => Promise<void>
  addProduct: (product: Omit<Product, "id" | "createdAt" | "_id">) => Promise<void>
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  addPackage: (pkg: Omit<ServicePackage, "id" | "createdAt" | "_id">) => Promise<void>
  updatePackage: (id: string, updates: Partial<ServicePackage>) => Promise<void>
  deletePackage: (id: string) => Promise<void>
  getAvailableTimeSlots: (packageId: string, date: string) => Promise<string[]>
  adminLogout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [packages, setPackages] = useState<ServicePackage[]>([])
  const [token, setToken] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("siddhaka_token")
    const savedUser = localStorage.getItem("siddhaka_user")

    if (savedToken && savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setToken(savedToken)
      setUser(parsedUser)
      setIsAdmin(parsedUser.role === "admin")

      // If patient, fetch profile
      if (parsedUser.role === "patient") {
        fetchProfile(savedToken)
      }
    }

    // Always fetch products and packages
    fetchProducts()
    fetchPackages()

    setLoaded(true)
  }, [])

  useEffect(() => {
    if (token) {
      if (isAdmin) {
        fetchBookings()
      } else {
        fetchMyBookings()
      }
    }
  }, [token, isAdmin])

  const fetchProfile = async (tk: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${tk}` },
      })
      if (res.ok) {
        const data = await res.json()
        setPatient(data.patient)
      }
    } catch (err) {
      console.error("Error fetching profile:", err)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (err) {
      console.error("Error fetching products:", err)
    }
  }

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_URL}/packages`)
      if (res.ok) {
        const data = await res.json()
        setPackages(data)
      }
    } catch (err) {
      console.error("Error fetching packages:", err)
    }
  }

  const fetchBookings = async () => {
    if (!token || !isAdmin) return
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setBookings(data)
      }
    } catch (err) {
      console.error("Error fetching bookings:", err)
    }
  }

  const fetchMyBookings = async () => {
    if (!token) return
    try {
      const res = await fetch(`${API_URL}/bookings/mybookings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setBookings(data)
      }
    } catch (err) {
      console.error("Error fetching my bookings:", err)
    }
  }

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || "Login failed")
    }

    setToken(data.token)
    setUser(data)
    setIsAdmin(data.role === "admin")
    localStorage.setItem("siddhaka_token", data.token)
    localStorage.setItem("siddhaka_user", JSON.stringify(data))

    if (data.role === "patient") {
      fetchProfile(data.token)
    }
  }

  const register = async (userData: {
    name: string
    email: string
    phone: string
    password: string
    dateOfBirth: string
    country: string
    gender: string
  }) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || "Registration failed")
    }

    setToken(data.token)
    setUser(data)
    localStorage.setItem("siddhaka_token", data.token)
    localStorage.setItem("siddhaka_user", JSON.stringify(data))
    fetchProfile(data.token)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setPatient(null)
    setBookings([])
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "/"
  }

  const addBooking = async (bookingData: any) => {
    if (!token) return
    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    })

    if (res.ok) {
      isAdmin ? fetchBookings() : fetchMyBookings()
    } else {
      const error = await res.json()
      throw new Error(error.message || "Failed to add booking")
    }
  }

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    if (!token) return
    const res = await fetch(`${API_URL}/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    })

    if (res.ok) {
      isAdmin ? fetchBookings() : fetchMyBookings()
    }
  }

  const cancelBooking = async (id: string) => {
    await updateBooking(id, { status: "cancelled" })
  }

  const addProduct = async (product: Omit<Product, "id" | "createdAt" | "_id">) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
    if (res.ok) fetchProducts()
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    })
    if (res.ok) fetchProducts()
  }

  const deleteProduct = async (id: string) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) fetchProducts()
  }

  const addPackage = async (pkg: Omit<ServicePackage, "id" | "createdAt" | "_id">) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/packages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pkg),
    })
    if (res.ok) fetchPackages()
  }

  const updatePackage = async (id: string, updates: Partial<ServicePackage>) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/packages/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    })
    if (res.ok) fetchPackages()
  }

  const deletePackage = async (id: string) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/packages/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) fetchPackages()
  }

  const getAvailableTimeSlots = async (packageId: string, date: string): Promise<string[]> => {
    try {
      const res = await fetch(`${API_URL}/bookings/available-slots?packageId=${packageId}&date=${date}`)
      if (res.ok) {
        return await res.json()
      }
      return []
    } catch (err) {
      console.error("Error getting slots:", err)
      return []
    }
  }

  const adminLogout = () => {
    logout()
  }

  if (!loaded) return null

  return (
    <AuthContext.Provider
      value={{
        user,
        patient,
        bookings,
        products,
        packages,
        isAdmin,
        token,
        login,
        register,
        logout,
        fetchBookings,
        fetchProducts,
        fetchPackages,
        addBooking,
        updateBooking,
        cancelBooking,
        addProduct,
        updateProduct,
        deleteProduct,
        addPackage,
        updatePackage,
        deletePackage,
        getAvailableTimeSlots,
        adminLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

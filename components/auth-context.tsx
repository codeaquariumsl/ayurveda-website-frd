"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

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
  patientId?: string
  patientName: string
  packageName: string
  packageId: string
  date: string
  timeSlot?: string
  status: "pending" | "confirmed" | "completed" | "cancelled" | "rescheduled"
  notes?: string
  createdAt: string
  patientDetails?: {
    name?: string
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
  subcategory?: string
  description: string
  includes: string[]
  benefits?: string
  image?: string
  focus?: string
  featured?: boolean
  concurrentServices: number
  index?: number
  createdAt: string
}

export interface Subcategory {
  _id?: string
  id?: string
  name: string
  slug: string
  createdAt?: string
}

export interface Treatment {
  _id?: string
  id?: string
  title: string
  category: "head-care" | "body-care" | "facial-care" | "foot-care"
  description: string
  image: string
  benefits: string[]
  createdAt?: string
}

interface AuthContextType {
  user: any | null
  bookings: Booking[]
  products: Product[]
  packages: ServicePackage[]
  treatments: Treatment[]
  subcategories: Subcategory[]
  isAdmin: boolean
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  fetchBookings: () => Promise<void>
  fetchProducts: () => Promise<void>
  fetchPackages: () => Promise<void>
  fetchTreatments: () => Promise<void>
  addBooking: (bookingData: any) => Promise<void>
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>
  cancelBooking: (id: string) => Promise<void>
  addProduct: (product: Omit<Product, "id" | "createdAt" | "_id">) => Promise<void>
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  addPackage: (pkg: Omit<ServicePackage, "id" | "createdAt" | "_id">) => Promise<void>
  updatePackage: (id: string, updates: Partial<ServicePackage>) => Promise<void>
  deletePackage: (id: string) => Promise<void>
  addTreatment: (treatment: Omit<Treatment, "id" | "createdAt" | "_id">) => Promise<void>
  updateTreatment: (id: string, updates: Partial<Treatment>) => Promise<void>
  deleteTreatment: (id: string) => Promise<void>
  fetchSubcategories: () => Promise<void>
  addSubcategory: (subcategory: Omit<Subcategory, "id" | "createdAt" | "_id">) => Promise<void>
  updateSubcategory: (id: string, updates: Partial<Subcategory>) => Promise<void>
  deleteSubcategory: (id: string) => Promise<void>
  getAvailableTimeSlots: (packageId: string, date: string) => Promise<string[]>
  adminLogout: () => void
  uploadImage: (file: File, type: "product" | "package" | "treatment") => Promise<string>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [packages, setPackages] = useState<ServicePackage[]>([])
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
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
    }

    // Always fetch products, packages, treatments, subcategories
    fetchProducts()
    fetchPackages()
    fetchTreatments()
    fetchSubcategories()

    setLoaded(true)
  }, [])

  useEffect(() => {
    if (token && isAdmin) {
      fetchBookings()
    }
  }, [token, isAdmin])

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

  const fetchTreatments = async () => {
    try {
      const res = await fetch(`${API_URL}/treatments`)
      if (res.ok) {
        const data = await res.json()
        setTreatments(data)
      }
    } catch (err) {
      console.error("Error fetching treatments:", err)
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
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setBookings([])
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "/"
  }

  const addBooking = async (bookingData: any) => {
    const headers: any = {
      "Content-Type": "application/json",
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers,
      body: JSON.stringify(bookingData),
    })

    if (res.ok) {
      if (isAdmin) fetchBookings()
    } else {
      const error = await res.json()
      throw new Error(error.message || "Failed to add booking")
    }
  }

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    })

    if (res.ok) {
      fetchBookings()
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

  const addTreatment = async (treatment: Omit<Treatment, "id" | "createdAt" | "_id">) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/treatments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(treatment),
    })
    if (res.ok) fetchTreatments()
  }

  const updateTreatment = async (id: string, updates: Partial<Treatment>) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/treatments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    })
    if (res.ok) fetchTreatments()
  }

  const deleteTreatment = async (id: string) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/treatments/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) fetchTreatments()
  }

  const fetchSubcategories = async () => {
    try {
      const res = await fetch(`${API_URL}/subcategories`)
      if (res.ok) {
        const data = await res.json()
        setSubcategories(data)
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err)
    }
  }

  const addSubcategory = async (subcategory: Omit<Subcategory, "id" | "createdAt" | "_id">) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/subcategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(subcategory),
    })
    if (res.ok) fetchSubcategories()
  }

  const updateSubcategory = async (id: string, updates: Partial<Subcategory>) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/subcategories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    })
    if (res.ok) {
      fetchSubcategories()
      fetchPackages()
    }
  }

  const deleteSubcategory = async (id: string) => {
    if (!token || !isAdmin) return
    const res = await fetch(`${API_URL}/subcategories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) {
      fetchSubcategories()
      fetchPackages()
    }
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

  const uploadImage = async (file: File, type: "product" | "package" | "treatment"): Promise<string> => {
    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch(`${API_URL}/upload/${type}`, {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await res.json()
    return data.url
  }

  if (!loaded) return null

  return (
    <AuthContext.Provider
      value={{
        user,
        bookings,
        products,
        packages,
        treatments,
        isAdmin,
        token,
        login,
        logout,
        fetchBookings,
        fetchProducts,
        fetchPackages,
        fetchTreatments,
        addBooking,
        updateBooking,
        cancelBooking,
        addProduct,
        updateProduct,
        deleteProduct,
        addPackage,
        updatePackage,
        deletePackage,
        addTreatment,
        updateTreatment,
        deleteTreatment,
        subcategories,
        fetchSubcategories,
        addSubcategory,
        updateSubcategory,
        deleteSubcategory,
        getAvailableTimeSlots,
        adminLogout,
        uploadImage,
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

"use client"

import type React from "react"
import { useState } from "react"
import { useAuth, type ServicePackage } from "@/components/auth-context"
import { Trash2, Edit2, Plus } from "lucide-react"

export function PackageManagement() {
  const { packages, addPackage, updatePackage, deletePackage } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<ServicePackage, "id" | "createdAt" | "_id">>({
    name: "",
    duration: 30,
    category: "wellness",
    subcategory: "head-hair",
    description: "",
    includes: [],
    concurrentServices: 1,
  })
  const [newInclude, setNewInclude] = useState("")

  const handleAddInclude = () => {
    if (newInclude.trim()) {
      setFormData({
        ...formData,
        includes: [...formData.includes, newInclude],
      })
      setNewInclude("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updatePackage(editingId, formData)
        setEditingId(null)
      } else {
        await addPackage(formData)
      }
      setFormData({
        name: "",
        duration: 30,
        category: "wellness",
        subcategory: "head-hair",
        description: "",
        includes: [],
        concurrentServices: 1,
      })
      setShowForm(false)
    } catch (err) {
      alert("Failed to save package")
    }
  }

  const handleEdit = (pkg: ServicePackage) => {
    setFormData({
      name: pkg.name,
      duration: pkg.duration,
      category: pkg.category,
      subcategory: pkg.subcategory,
      description: pkg.description,
      includes: pkg.includes,
      benefits: pkg.benefits,
      focus: pkg.focus,
      featured: pkg.featured,
      image: pkg.image,
      concurrentServices: pkg.concurrentServices,
    })
    setEditingId((pkg._id || pkg.id) as string)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manage Packages</h2>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({
              name: "",
              duration: 30,
              category: "wellness",
              subcategory: "head-hair",
              description: "",
              includes: [],
              concurrentServices: 1,
            })
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add Package
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground">
              <div>
                <label className="block text-sm font-semibold mb-2">Package Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  required
                  min="15"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                >
                  <option value="wellness">Wellness</option>
                  <option value="special">Special</option>
                  <option value="signature">Signature</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Concurrent Services</label>
                <input
                  type="number"
                  value={formData.concurrentServices}
                  onChange={(e) => setFormData({ ...formData, concurrentServices: Number.parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  required
                  min="1"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold"
              >
                {editingId ? "Update Package" : "Create Package"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                }}
                className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div key={pkg._id || pkg.id} className="bg-card rounded-lg border border-border p-4">
            <h3 className="font-bold text-foreground mb-2">{pkg.name}</h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{pkg.description}</p>
            <div className="flex justify-between items-center mb-3 text-sm">
              <span className="text-muted-foreground">
                <strong>Duration:</strong> {pkg.duration} min
              </span>
              <span className="text-muted-foreground">
                <strong>Capacity:</strong> {pkg.concurrentServices}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(pkg)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded text-sm font-semibold"
              >
                <Edit2 size={14} />
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Delete this package?")) {
                    deletePackage((pkg._id || pkg.id) as string)
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded text-sm font-semibold"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

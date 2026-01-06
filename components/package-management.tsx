"use client"

import type React from "react"
import { useState } from "react"
import { useAuth, type ServicePackage } from "@/components/auth-context"
import { Trash2, Edit2, Plus, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface PackageManagementProps {
  filterCategory?: "wellness" | "special" | "signature"
  title?: string
}

export function PackageManagement({ filterCategory, title = "Manage Packages" }: PackageManagementProps) {
  const { packages, addPackage, updatePackage, deletePackage } = useAuth()
  const { toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const initialFormState: Omit<ServicePackage, "id" | "createdAt" | "_id"> = {
    name: "",
    duration: 30,
    category: filterCategory || "wellness",
    subcategory: "head-hair",
    description: "",
    includes: [],
    benefits: "",
    image: "",
    focus: "",
    featured: false,
    concurrentServices: 1,
  }

  const [formData, setFormData] = useState<Omit<ServicePackage, "id" | "createdAt" | "_id">>(initialFormState)
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
      setFormData(initialFormState)
      setShowForm(false)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save item.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (pkg: ServicePackage) => {
    setFormData({
      name: pkg.name,
      duration: pkg.duration,
      category: pkg.category,
      subcategory: pkg.subcategory || "head-hair",
      description: pkg.description || "",
      includes: pkg.includes || [],
      benefits: pkg.benefits || "",
      focus: pkg.focus || "",
      featured: pkg.featured || false,
      image: pkg.image || "",
      concurrentServices: pkg.concurrentServices || 1,
    })
    setEditingId((pkg._id || pkg.id) as string)
    setShowForm(true)
  }

  const filteredItems = filterCategory
    ? packages.filter(p => p.category === filterCategory)
    : packages

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData(initialFormState)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add New
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
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
                  min="5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  disabled={!!filterCategory}
                >
                  <option value="wellness">Wellness (Treatment)</option>
                  <option value="special">Special Package</option>
                  <option value="signature">Signature Package</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Subcategory</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                >
                  <option value="head-hair">Head & Hair</option>
                  <option value="body-skin">Body & Skin</option>
                  <option value="facial">Facial</option>
                  <option value="foot">Foot</option>
                  <option value="full-day">Full Day</option>
                  <option value="half-day">Half Day</option>
                  <option value="7-day">7 Day</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Capacity (Concurrent Slots)</label>
                <input
                  type="number"
                  value={formData.concurrentServices}
                  onChange={(e) => setFormData({ ...formData, concurrentServices: Number.parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Focus (Area of target)</label>
                <input
                  type="text"
                  value={formData.focus}
                  onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  placeholder="e.g. Total Relaxation"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background min-h-[80px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Benefits</label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  placeholder="List benefits..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background"
                  placeholder="/images/example.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Includes (Items/Features)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newInclude}
                  onChange={(e) => setNewInclude(e.target.value)}
                  placeholder="Add item..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background"
                />
                <button
                  type="button"
                  onClick={handleAddInclude}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.includes.map((item, idx) => (
                  <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs flex items-center gap-1">
                    {item}
                    <button type="button" onClick={() => setFormData({ ...formData, includes: formData.includes.filter((_, i) => i !== idx) })}>
                      <Trash2 size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="featured" className="text-sm font-semibold text-foreground">Featured Item</label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {editingId ? "Update Item" : "Create Item"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                }}
                className="flex-1 px-4 py-2 bg-muted text-muted-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((pkg) => (
          <div key={pkg._id || pkg.id} className="bg-card rounded-lg border border-border overflow-hidden flex flex-col">
            {pkg.image && (
              <img src={pkg.image || "/placeholder.svg"} alt={pkg.name} className="w-full h-32 object-cover" />
            )}
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-foreground text-lg">{pkg.name}</h3>
                {pkg.featured && (
                  <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Featured</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{pkg.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs">
                <span className="text-muted-foreground"><strong>Dur:</strong> {pkg.duration}m</span>
                <span className="text-muted-foreground"><strong>Cap:</strong> {pkg.concurrentServices}</span>
                <span className="text-muted-foreground uppercase font-bold"><strong>Cat:</strong> {pkg.subcategory}</span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded text-sm font-semibold"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete this item?")) {
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
          </div>
        ))}
      </div>
    </div>
  )
}

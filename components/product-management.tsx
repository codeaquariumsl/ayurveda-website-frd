"use client"

import type React from "react"
import { useState } from "react"
import { useAuth, type Product } from "@/components/auth-context"
import { Trash2, Edit2, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ProductManagement() {
  const { products, addProduct, updateProduct, deleteProduct } = useAuth()
  const { toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Product, "id" | "createdAt" | "_id">>({
    name: "",
    subtitle: "",
    description: "",
    image: "",
    category: "oils",
    keyIngredients: [],
    freeFrom: [],
    benefits: [],
  })
  const [newIngredient, setNewIngredient] = useState("")
  const [newBenefit, setNewBenefit] = useState("")
  const [newFreeFrom, setNewFreeFrom] = useState("")

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setFormData({
        ...formData,
        keyIngredients: [...formData.keyIngredients, newIngredient],
      })
      setNewIngredient("")
    }
  }

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, newBenefit],
      })
      setNewBenefit("")
    }
  }

  const handleAddFreeFrom = () => {
    if (newFreeFrom.trim()) {
      setFormData({
        ...formData,
        freeFrom: [...formData.freeFrom, newFreeFrom],
      })
      setNewFreeFrom("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateProduct(editingId, formData)
        setEditingId(null)
      } else {
        await addProduct(formData)
      }
      setFormData({
        name: "",
        subtitle: "",
        description: "",
        image: "",
        category: "oils",
        keyIngredients: [],
        freeFrom: [],
        benefits: [],
      })
      setShowForm(false)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save product.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      subtitle: product.subtitle,
      description: product.description,
      image: product.image,
      category: product.category,
      keyIngredients: product.keyIngredients,
      freeFrom: product.freeFrom,
      benefits: product.benefits,
    })
    setEditingId((product._id || product.id) as string)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manage Products</h2>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({
              name: "",
              subtitle: "",
              description: "",
              image: "",
              category: "oils",
              keyIngredients: [],
              freeFrom: [],
              benefits: [],
            })
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="oils">Oils</option>
                  <option value="gels">Gels</option>
                  <option value="lotions">Lotions</option>
                  <option value="shampoos">Shampoos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Key Ingredients</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  placeholder="Add ingredient..."
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.keyIngredients.map((ingredient, idx) => (
                  <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs flex items-center gap-1">
                    {ingredient}
                    <button type="button" onClick={() => setFormData({ ...formData, keyIngredients: formData.keyIngredients.filter((_, i) => i !== idx) })}>
                      <Trash2 size={10} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                {editingId ? "Update Product" : "Create Product"}
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
        {products.map((product) => (
          <div key={product._id || product.id} className="bg-card rounded-lg border border-border overflow-hidden">
            {product.image && (
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-bold text-foreground mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{product.subtitle}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded text-sm font-semibold"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete this product?")) {
                      deleteProduct((product._id || product.id) as string)
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

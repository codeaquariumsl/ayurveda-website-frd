"use client"

import type React from "react"
import { useState } from "react"
import { useAuth, type Subcategory } from "@/components/auth-context"
import { Trash2, Edit2, Plus, X, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SubcategoryManagement() {
  const { subcategories, addSubcategory, updateSubcategory, deleteSubcategory } = useAuth()
  const { toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const [formData, setFormData] = useState<Omit<Subcategory, "id" | "createdAt" | "_id">>({
    name: "",
    slug: "",
  })

  // Helper to generate slug from name
  const handleNameChange = (nameValue: string) => {
    const slugValue = nameValue
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
    setFormData({
      name: nameValue,
      slug: slugValue,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateSubcategory(editingId, formData)
        setEditingId(null)
      } else {
        await addSubcategory(formData)
      }
      setFormData({
        name: "",
        slug: "",
      })
      setShowForm(false)
      toast({
        title: "Success",
        description: "Subcategory saved successfully.",
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to save subcategory.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (sub: Subcategory) => {
    setFormData({
      name: sub.name,
      slug: sub.slug,
    })
    setEditingId((sub._id || sub.id) as string)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this subcategory? This may affect package filtering.")) {
      try {
        await deleteSubcategory(id)
        toast({
          title: "Deleted",
          description: "Subcategory deleted successfully.",
        })
      } catch (err: any) {
        toast({
          title: "Error",
          description: "Failed to delete subcategory.",
          variant: "destructive",
        })
      }
    }
  }

  const filteredSubcategories = subcategories.filter((sub) => {
    return (
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.slug.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground font-black">Manage Subcategories</h2>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search subcategories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary h-10"
            />
            <div className="absolute left-3 top-2.5 text-muted-foreground">
              <Search size={18} />
            </div>
          </div>
          <button
            onClick={() => {
              setShowForm(true)
              setEditingId(null)
              setFormData({ name: "", slug: "" })
            }}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-all h-10 shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Add Subcategory
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-lg max-w-md w-full shadow-2xl text-foreground">
            {/* Modal Header */}
            <div className="sticky top-0 bg-primary text-primary-foreground p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">{editingId ? "Edit Subcategory" : "Add New Subcategory"}</h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({ name: "", slug: "" })
                }}
                className="hover:opacity-80 transition-opacity"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Subcategory Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow"
                    required
                    placeholder="e.g. Head & Hair Care"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1.5">Slug (url path)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow"
                    required
                    placeholder="e.g. head-hair"
                  />
                </div>

                <div className="flex gap-4 border-t border-border pt-4 mt-6">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-all shadow-md shadow-primary/20 active:scale-[0.98]"
                  >
                    {editingId ? "Save Changes" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingId(null)
                      setFormData({ name: "", slug: "" })
                    }}
                    className="flex-1 px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-bold hover:bg-secondary/80 transition-all active:scale-[0.98]"
                  >
                    Discard
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Subcategory List Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/10 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right px-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSubcategories.map((sub) => (
                <tr key={sub._id || sub.id} className="hover:bg-secondary/5 transition-colors group">
                  <td className="px-6 py-4 font-bold text-foreground">{sub.name}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{sub.slug}</td>
                  <td className="px-6 py-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(sub)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/5 rounded"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete((sub._id || sub.id) as string)}
                        className="p-2 text-muted-foreground hover:text-red-600 transition-colors hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredSubcategories.length === 0 && (
          <div className="p-12 text-center text-muted-foreground italic bg-secondary/5">
            No subcategories found.
          </div>
        )}
      </div>
    </div>
  )
}

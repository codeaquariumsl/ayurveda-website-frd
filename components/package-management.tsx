"use client"

import type React from "react"
import { useState } from "react"
import { useAuth, type ServicePackage } from "@/components/auth-context"
import { Trash2, Edit2, Plus, Check, X } from "lucide-react"
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
  const [searchTerm, setSearchTerm] = useState("")
  const [viewingPackage, setViewingPackage] = useState<ServicePackage | null>(null)

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

  const filteredItems = packages.filter((p) => {
    const matchesCategory = filterCategory ? p.category === filterCategory : true
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subcategory?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary h-10"
            />
            <Plus className="absolute left-3 top-2.5 text-muted-foreground rotate-45" size={18} />
          </div>
          <button
            onClick={() => {
              setShowForm(true)
              setEditingId(null)
              setFormData(initialFormState)
            }}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-all h-10 shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Add New
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl text-foreground">
            {/* Modal Header */}
            <div className="sticky top-0 bg-primary text-primary-foreground p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Item" : `Add New ${filterCategory ? (filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)) : "Package"}`}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData(initialFormState)
                }}
                className="hover:opacity-80 transition-opacity"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow"
                        required
                        placeholder="Package name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-1.5">Duration (min)</label>
                        <input
                          type="number"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
                          className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow"
                          required
                          min="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1.5">Capacity</label>
                        <input
                          type="number"
                          value={formData.concurrentServices}
                          onChange={(e) => setFormData({ ...formData, concurrentServices: Number.parseInt(e.target.value) })}
                          className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow"
                          required
                          min="1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow"
                        disabled={!!filterCategory}
                      >
                        <option value="wellness">Wellness (Treatment)</option>
                        <option value="special">Special Package</option>
                        <option value="signature">Signature Package</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Subcategory</label>
                      <select
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value as any })}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow"
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
                      <label className="block text-sm font-semibold mb-1.5">Focus Area</label>
                      <input
                        type="text"
                        value={formData.focus}
                        onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow"
                        placeholder="e.g. Total Relaxation"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background min-h-[120px] transition-shadow"
                        required
                        placeholder="Describe the package..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Benefits</label>
                      <textarea
                        value={formData.benefits}
                        onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background min-h-[100px] transition-shadow"
                        placeholder="List the key health benefits..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Image URL</label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow"
                        placeholder="/images/example.jpg"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/20">
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    Includes <span className="text-[10px] font-normal text-muted-foreground">(Specific features or items)</span>
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newInclude}
                      onChange={(e) => setNewInclude(e.target.value)}
                      placeholder="Add a feature..."
                      className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background transition-shadow"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddInclude();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddInclude}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-all text-sm active:scale-95 shadow-md shadow-primary/20"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.includes.map((item, idx) => (
                      <span key={idx} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-primary/20">
                        {item}
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, includes: formData.includes.filter((_, i) => i !== idx) })}
                          className="hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </span>
                    ))}
                    {formData.includes.length === 0 && (
                      <p className="text-sm text-muted-foreground italic">No features added yet.</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    <label htmlFor="featured" className="ms-3 text-sm font-semibold text-foreground cursor-pointer">Mark as Featured Item</label>
                  </div>
                </div>

                <div className="flex gap-4 sticky bottom-0 bg-white py-4 border-t border-border mt-8">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/30 active:scale-[0.98]"
                  >
                    {editingId ? "Save Changes" : "Create Package"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingId(null)
                      setFormData(initialFormState)
                    }}
                    className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-bold hover:bg-secondary/80 transition-all active:scale-[0.98]"
                  >
                    Discard
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Package View Details Modal */}
      {viewingPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-foreground">
            <div className="relative h-64">
              <img
                src={viewingPackage.image || "/placeholder.svg"}
                alt={viewingPackage.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setViewingPackage(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{viewingPackage.name}</h3>
                <p className="text-white/80 text-sm font-medium uppercase tracking-wider">{viewingPackage.category} / {viewingPackage.subcategory}</p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary/10 p-4 rounded-xl text-center border border-secondary/20">
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Duration</p>
                  <p className="text-lg font-bold text-primary">{viewingPackage.duration}m</p>
                </div>
                <div className="bg-secondary/10 p-4 rounded-xl text-center border border-secondary/20">
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Capacity</p>
                  <p className="text-lg font-bold text-primary">{viewingPackage.concurrentServices}</p>
                </div>
                <div className="bg-secondary/10 p-4 rounded-xl text-center border border-secondary/20">
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Featured</p>
                  <p className="text-lg font-bold text-primary">{viewingPackage.featured ? "Yes" : "No"}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Check className="text-primary" size={20} />
                  Description
                </h4>
                <p className="text-sm text-balance leading-relaxed text-muted-foreground">{viewingPackage.description}</p>
              </div>

              {viewingPackage.benefits && (
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2 text-primary">
                    <Check size={20} />
                    Health Benefits
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">{viewingPackage.benefits}</p>
                </div>
              )}

              {viewingPackage.includes.length > 0 && (
                <div>
                  <h4 className="font-bold text-lg mb-3">What's Included</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingPackage.includes.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-bold rounded-full border border-primary/20">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-border flex gap-3">
                <button
                  onClick={() => {
                    handleEdit(viewingPackage)
                    setViewingPackage(null)
                  }}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-md active:scale-95"
                >
                  Edit Configuration
                </button>
                <button
                  onClick={() => setViewingPackage(null)}
                  className="px-8 py-3 bg-secondary text-secondary-foreground rounded-xl font-bold hover:bg-secondary/80 transition-all active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Package Table View */}
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/10 border-b border-border">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Package</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Category/Sub</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Details</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right px-10">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredItems.map((pkg) => (
                <tr key={pkg._id || pkg.id} className="hover:bg-secondary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                        <img src={pkg.image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground truncate max-w-[200px]">{pkg.name}</p>
                        <p className="text-[10px] text-muted-foreground">Concurrent: {pkg.concurrentServices}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary uppercase">{pkg.category}</span>
                      <span className="text-[11px] text-muted-foreground capitalize">{pkg.subcategory}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Plus className="w-3 h-3 rotate-45" size={12} />
                        {pkg.duration} mins
                      </div>
                      <p className="text-[11px] text-muted-foreground italic line-clamp-1 max-w-[150px]">{pkg.focus || "No focus specified"}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {pkg.featured ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-yellow-100 text-yellow-700 border border-yellow-200">
                        <Check size={10} /> Featured
                      </span>
                    ) : (
                      <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-400 border border-gray-200">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setViewingPackage(pkg)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors group/view"
                        title="View Details"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this package?")) {
                            deletePackage((pkg._id || pkg.id) as string)
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">
                    No packages found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


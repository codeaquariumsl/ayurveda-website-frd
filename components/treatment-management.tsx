"use client"

import type React from "react"
import { useState } from "react"
import { useAuth, type Treatment } from "@/components/auth-context"
import { Trash2, Edit2, Plus, X, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function TreatmentManagement() {
  const { treatments, addTreatment, updateTreatment, deleteTreatment, uploadImage } = useAuth()
  const { toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const initialFormState: Omit<Treatment, "id" | "createdAt" | "_id"> = {
    title: "",
    category: "head-care",
    description: "",
    image: "",
    benefits: [],
  }

  const [formData, setFormData] = useState<Omit<Treatment, "id" | "createdAt" | "_id">>(initialFormState)
  const [newBenefit, setNewBenefit] = useState("")

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, newBenefit],
      })
      setNewBenefit("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateTreatment(editingId, formData)
        setEditingId(null)
      } else {
        await addTreatment(formData)
      }
      setFormData(initialFormState)
      setShowForm(false)
      toast({ title: "Success", description: "Treatment saved successfully." })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save treatment.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (treatment: Treatment) => {
    setFormData({
      title: treatment.title,
      category: treatment.category,
      description: treatment.description,
      image: treatment.image || "",
      benefits: treatment.benefits || [],
    })
    setEditingId((treatment._id || treatment.id) as string)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Manage Treatments</h2>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingId(null)
            setFormData(initialFormState)
          }}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-all h-10 shadow-lg shadow-primary/20"
        >
          <Plus size={18} />
          Add Treatment
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl text-foreground">
            {/* Modal Header */}
            <div className="sticky top-0 bg-primary text-primary-foreground p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">{editingId ? "Edit Treatment" : "Add New Treatment"}</h2>
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
                      <label className="block text-sm font-semibold mb-1.5">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow"
                        required
                        placeholder="Treatment name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow"
                      >
                        <option value="head-care">Head and Hair Care</option>
                        <option value="body-care">Body and Skin Care</option>
                        <option value="facial-care">Facial Care</option>
                        <option value="foot-care">Foot Care</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Treatment Image</label>
                      <div className="flex gap-4 items-center mb-2">
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                try {
                                  const url = await uploadImage(file, "treatment")
                                  setFormData({ ...formData, image: url })
                                  toast({ title: "Success", description: "Image uploaded successfully." })
                                } catch (err) {
                                  toast({ title: "Error", description: "Image upload failed.", variant: "destructive" })
                                }
                              }
                            }}
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm cursor-pointer file:cursor-pointer file:border-0 file:bg-primary/10 file:text-primary file:font-semibold file:px-4 file:py-1.5 file:rounded-md file:mr-4 hover:file:bg-primary/20 transition-all"
                          />
                        </div>
                        {formData.image && (
                          <div className="w-16 h-16 rounded-md border border-border overflow-hidden flex-shrink-0 bg-muted">
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background transition-shadow text-sm"
                        placeholder="/uploads/treatment/example.jpg or enter external URL"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground bg-background min-h-[220px] transition-shadow"
                        required
                        placeholder="Describe the treatment..."
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/5 p-4 rounded-xl border border-secondary/20">
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    Benefits
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="Add a benefit..."
                      className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-background transition-shadow"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddBenefit();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddBenefit}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-all text-sm active:scale-95 shadow-md shadow-primary/20"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.benefits.map((item, idx) => (
                      <span key={idx} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-primary/20">
                        {item}
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, benefits: formData.benefits.filter((_, i) => i !== idx) })}
                          className="hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </span>
                    ))}
                    {formData.benefits.length === 0 && (
                      <p className="text-sm text-muted-foreground italic">No benefits added yet.</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 sticky bottom-0 bg-white py-4 border-t border-border mt-8">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/30 active:scale-[0.98]"
                  >
                    {editingId ? "Save Changes" : "Create Treatment"}
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

      {/* Grid View for Treatments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treatments.map((treatment) => (
          <div key={treatment._id || treatment.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm flex flex-col">
            <div className="relative h-48 bg-muted">
              {treatment.image ? (
                <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <span className="bg-white/90 text-primary px-2.5 py-1 rounded-md text-[10px] font-bold uppercase shadow-sm border border-primary/20">
                  {treatment.category.replace("-", " ")}
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">{treatment.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                {treatment.description}
              </p>
              
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleEdit(treatment)}
                  className="flex-1 flex justify-center items-center gap-2 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-semibold text-sm transition-colors"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this treatment?")) {
                      deleteTreatment((treatment._id || treatment.id) as string)
                    }
                  }}
                  className="flex-1 flex justify-center items-center gap-2 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-semibold text-sm transition-colors"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {treatments.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 py-12 text-center bg-muted/20 rounded-xl border border-dashed border-border">
            <p className="text-muted-foreground italic">No treatments added yet. Click "Add Treatment" to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}

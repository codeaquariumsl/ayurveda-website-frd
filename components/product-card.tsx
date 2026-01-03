"use client"
import { X } from "lucide-react"

interface ProductCardProps {
  product: any
  onViewMore: (product: any) => void
}

export function ProductCard({ product, onViewMore }: ProductCardProps) {
  return (
    <div className="rounded-lg border border-primary bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
      {product.image && (
        <div className="w-full h-48 overflow-hidden bg-gray-200">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
        <p className="text-sm text-primary font-semibold mb-3">{product.subtitle}</p>
        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">{product.description}</p>
        <button
          onClick={() => onViewMore(product)}
          className="w-full py-2 bg-primary text-primary-foreground rounded font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          View More
        </button>
      </div>
    </div>
  )
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: { product: any; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-primary text-primary-foreground p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="hover:opacity-80 transition-opacity">
            <X size={24} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {product.image && (
            <div className="w-full h-64 overflow-hidden rounded-lg">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <p className="text-primary font-semibold mb-2">{product.subtitle}</p>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Key Ingredients</h4>
              <ul className="space-y-1">
                {product.keyIngredients?.map((ingredient: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Free From</h4>
              <ul className="space-y-1">
                {product.freeFrom?.map((item: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {product.benefits && (
            <div className="bg-background rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Key Benefits</h4>
              <ul className="space-y-2">
                {product.benefits.map((benefit: any, idx: number) => {
                  const [title, description] = typeof benefit === "string" ? benefit.split(" - ") : [benefit, ""]
                  return (
                    <li key={idx} className="text-sm">
                      <p className="font-medium text-foreground">{title}</p>
                      {description && <p className="text-muted-foreground text-xs mt-1">{description}</p>}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

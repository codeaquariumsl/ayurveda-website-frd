"use client"
import { X, Sparkles, ShoppingBag, Leaf, Droplets, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface ProductCardProps {
  product: any
  onViewMore: (product: any) => void
}

export function ProductCard({ product, onViewMore }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col h-full bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
    >
      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-10">
        <div className="px-3 py-1 bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-sm">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category || "Naturals"}</p>
        </div>
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">{product.subtitle}</p>
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed flex-grow">
          {product.description}
        </p>

        <button
          onClick={() => onViewMore(product)}
          className="w-full flex items-center justify-center gap-2 py-4 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-2xl font-bold text-sm transition-all duration-300 active:scale-95 group/btn"
        >
          <span>See Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  )
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: { product: any; isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-background rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[85vh]"
          >
            {/* Close Button Mobile */}
            <button
              onClick={onClose}
              className="lg:hidden absolute top-4 right-4 z-50 p-3 bg-background/80 backdrop-blur-md rounded-full shadow-lg text-foreground hover:bg-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left: Product Image */}
            <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-0 bg-muted">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-24 h-24 text-muted-foreground/20" />
                </div>
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/20 via-transparent to-transparent" />
            </div>

            {/* Right: Product Details */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4">
                  <Sparkles size={12} className="text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category || "Premium Naturals"}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2 leading-tight">{product.name}</h2>
                <p className="text-sm font-bold text-primary italic">{product.subtitle}</p>
              </div>

              {/* Description */}
              <div className="mb-10">
                <p className="text-base text-muted-foreground leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Ingredients */}
                {product.keyIngredients && product.keyIngredients.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-foreground font-bold uppercase tracking-widest text-xs">
                      <Leaf size={14} className="text-primary" />
                      <span>Key Ingredients</span>
                    </div>
                    <ul className="space-y-2">
                      {product.keyIngredients.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground font-medium group">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-foreground font-bold uppercase tracking-widest text-xs">
                      <Sparkles size={14} className="text-primary" />
                      <span>Key Benefits</span>
                    </div>
                    <ul className="space-y-2">
                      {product.benefits.map((item: any, idx: number) => {
                        const content = typeof item === "string" ? item.split(" - ")[0] : item;
                        return (
                          <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground font-medium group">
                            <Droplets size={14} className="text-primary/40 mt-0.5 flex-shrink-0" />
                            <span>{content}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer / CTA */}
              <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={`https://wa.me/94704488844?text=Hello!%20I%20am%20interested%20in%20enquiring%20about%20the%20${encodeURIComponent(product.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-500/20 transition-all active:scale-95"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  <span>Enquire on WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="hidden lg:flex items-center justify-center p-4 text-foreground hover:bg-border rounded-2xl font-bold transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

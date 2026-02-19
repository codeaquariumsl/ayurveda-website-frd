"use client"
import { useState, useMemo } from "react"
import { ProductCard, ProductDetailModal } from "@/components/product-card"
import { useAuth, Product } from "@/components/auth-context"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Sparkles, Filter, Search, X, Leaf } from "lucide-react"
import Image from "next/image"
import { LeafBackground } from "@/components/leaf-background"

export default function ProductsPage() {
  const { products } = useAuth()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category))
    return ["all", ...Array.from(cats)].filter(Boolean)
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, activeCategory, searchQuery])

  return (
    <main className="min-h-screen bg-background pb-20 relative">
      <LeafBackground />
      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Mandala */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <Image
            src="/mandala_bg.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-10">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-700" />
                <Image
                  src="/siddhaka_products_logo.jpeg"
                  alt="Siddhaka Products Logo"
                  width={240}
                  height={240}
                  className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 rounded-full shadow-2xl border-4 border-white/50"
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles size={14} className="text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Pure • Natural • Authentic</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tighter">
              Siddhaka <span className="text-primary">Naturals</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
              Experience the true essence of Ayurvedic healing with our premium range of ethically sourced, 100% natural wellness products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar: Search & Filter */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-border/50 py-4 mb-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            <Filter size={16} className="text-muted-foreground mr-2 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-2xl border-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id || idx}
                  product={product as any}
                  onViewMore={setSelectedProduct as any}
                  priority={idx < 4}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="text-muted-foreground" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground max-w-xs">
              We couldn&apos;t find any products matching your current filters. Try adjusting your search.
            </p>
            <button
              onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
              className="mt-8 text-primary font-bold uppercase tracking-widest text-xs hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct || ({} as Product)}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Custom Styles */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--primary), 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--primary), 0.2);
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </main>
  )
}

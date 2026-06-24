"use client"
import { useState, useMemo } from "react"
import { ProductCard, ProductDetailModal } from "@/components/product-card"
import { useAuth, Product } from "@/components/auth-context"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Sparkles, Filter, Search, X, Leaf, ShieldCheck, Award, ArrowRight, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { AyurvedicBackground } from "@/components/ayurvedic-background"

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
    <main className="min-h-screen bg-gradient-to-b from-[#fbfaf5] via-[#f5f9f0] to-[#edf3e8] dark:from-[#0c1008] dark:via-[#10150d] dark:to-[#080b06] pb-20 relative overflow-hidden">
      <AyurvedicBackground />
      {/* Premium Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-10 md:pb-24 overflow-hidden">
        {/* Modern Premium Background Pattern & Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(141,31,43,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(230,190,120,0.04)_1px,transparent_1px)] [background-size:24px_24px] opacity-80" />

          {/* Modern glowing spots - color aligned with maroon/gold theme */}
          <motion.div
            animate={{
              scale: [1, 1.2, 0.9, 1],
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] dark:bg-primary/5"
          />
          <motion.div
            animate={{
              scale: [1.1, 0.9, 1.2, 1.1],
              x: [0, -40, 30, 0],
              y: [0, 30, -30, 0],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[120px] dark:bg-amber-500/5"
          />

          {/* Fine gold lines / orbits */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 dark:opacity-20 pointer-events-none" viewBox="0 0 100 100">
            <motion.circle
              cx="50" cy="50" r="45"
              stroke="currentColor" strokeWidth="0.05" strokeDasharray="3 4" fill="none" className="text-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              cx="50" cy="50" r="35"
              stroke="currentColor" strokeWidth="0.05" strokeDasharray="1 6" fill="none" className="text-amber-500"
              animate={{ rotate: -360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column - Rich Typography & Details */}
            <div className="lg:col-span-7 text-left flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Premium Pill Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-full mb-6 backdrop-blur-md shadow-sm">
                  <Sparkles size={14} className="text-primary animate-pulse" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.25em]">Pure • Natural • Authentic</span>
                </div>

                {/* Title with Gradient and Serif elegance */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground mb-6 tracking-tight leading-[1.05]">
                  Siddhaka <br />
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-600 dark:from-primary dark:to-amber-500 font-serif italic py-1">
                    Naturals
                    {/* Underline accent */}
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-primary to-amber-500 rounded-full"
                    />
                  </span>
                </h1>

                {/* Tagline */}
                <p className="text-base md:text-lg text-muted-foreground mb-8 font-medium leading-relaxed max-w-xl">
                  Experience the true essence of Ayurvedic healing with our premium range of ethically sourced, 100% natural wellness products, designed to restore balance and vitality.
                </p>

                {/* Value Proposition Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 w-full max-w-2xl">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-card/60 dark:bg-card/30 border border-border/40 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-sm group">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <Leaf size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">100% Organic</h4>
                      <p className="text-[10px] text-muted-foreground">Certified botanicals</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-card/60 dark:bg-card/30 border border-border/40 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-sm group">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-500 group-hover:scale-110 transition-transform duration-300">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Pure Quality</h4>
                      <p className="text-[10px] text-muted-foreground">Chemical & toxin free</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-card/60 dark:bg-card/30 border border-border/40 backdrop-blur-md hover:border-primary/30 transition-all duration-300 shadow-sm group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 group-hover:scale-110 transition-transform duration-300">
                      <Award size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Ethical Source</h4>
                      <p className="text-[10px] text-muted-foreground">Direct from wild forests</p>
                    </div>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById("products-display")
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    }}
                    className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer text-sm"
                  >
                    Explore Collection
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById("products-display")
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    }}
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-card/40 dark:bg-card/10 hover:bg-card/80 dark:hover:bg-card/25 text-foreground border border-border/60 hover:border-primary/30 rounded-2xl font-bold backdrop-blur-md transition-all duration-300 cursor-pointer text-sm"
                  >
                    Our Philosophy
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Premium floating visual display */}
            <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] lg:h-[500px] w-full flex items-center justify-center">
              {/* Outer spinning Mandala Backing */}
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-20 dark:opacity-30">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
                  className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] relative"
                >
                  <Image
                    src="/mandala_art_circular.png"
                    alt=""
                    fill
                    className="object-contain animate-[pulse_8s_infinite]"
                    priority
                  />
                </motion.div>
              </div>

              {/* Glowing background behind logo */}
              <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full bg-gradient-to-tr from-primary/10 to-amber-500/10 blur-3xl pointer-events-none z-0 animate-[pulse_4s_infinite]" />

              {/* Core Circular Emblem with Floating Ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="relative z-10 w-44 h-44 sm:w-60 sm:h-60 rounded-full bg-white dark:bg-zinc-900 border-4 border-primary/20 dark:border-primary/40 shadow-2xl flex items-center justify-center p-4 hover:border-primary transition-colors duration-500 group"
              >
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-amber-500 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-700" />
                <Image
                  src="/siddhaka_products_logo_circle.png"
                  alt="Siddhaka Products Logo"
                  width={240}
                  height={240}
                  className="w-full h-full object-contain relative z-10 rounded-full transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </motion.div>

              {/* Floating Glassmorphic Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-4 sm:right-10 z-20 px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-zinc-950/70 border border-white/20 dark:border-white/10 backdrop-blur-md shadow-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={12} />
                </div>
                <span className="text-[11px] font-bold text-foreground">100% Ayurvedic</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-10 left-4 sm:left-10 z-20 px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-zinc-950/70 border border-white/20 dark:border-white/10 backdrop-blur-md shadow-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-500">
                  <Sparkles size={12} />
                </div>
                <span className="text-[11px] font-bold text-foreground">Premium Quality</span>
              </motion.div>

              {/* Floating organic leaf elements around emblem */}
              <motion.div
                animate={{
                  x: [0, 8, 0],
                  y: [0, -12, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[25%] left-6 sm:left-14 opacity-25 dark:opacity-40 text-primary pointer-events-none select-none"
              >
                <Leaf size={44} strokeWidth={1} />
              </motion.div>

              <motion.div
                animate={{
                  x: [0, -10, 0],
                  y: [0, 8, 0],
                  rotate: [0, -20, 0]
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                className="absolute bottom-[20%] right-6 sm:right-12 opacity-20 dark:opacity-35 text-emerald-800 dark:text-emerald-500 pointer-events-none select-none"
              >
                <Leaf size={56} strokeWidth={1} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar: Search & Filter */}
      <section id="products-display" className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-border/50 py-4 mb-12">
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
                  delay={idx * 0.06}
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

"use client"

import { useState } from "react"
import { ProductCard, ProductDetailModal } from "@/components/product-card"
import { useAuth, Product } from "@/components/auth-context"

import Image from "next/image"

export default function ProductsPage() {
  const { products } = useAuth()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/siddhaka_products_logo.jpeg"
              alt="Siddhaka Products Logo"
              width={200}
              height={200}
              className="w-48 h-auto object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Our Products</h1>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Premium natural Ayurvedic products crafted with pure, ethically sourced ingredients for your wellness and
            beauty.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-10 bg-background">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products && products.length > 0 ? (
              products.map((product, idx) => (
                <ProductCard key={product.id || idx} product={product as any} onViewMore={setSelectedProduct as any} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No products found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct || ({} as Product)}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  )
}

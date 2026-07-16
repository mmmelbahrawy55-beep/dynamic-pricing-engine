'use client'
import type { Product } from '@/lib/store-data'
import { ProductCard } from '@/app/components/ProductCard'

export function SectionGrid({ products, visible = 4 }: { products: Product[]; visible?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.slice(0, visible).map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
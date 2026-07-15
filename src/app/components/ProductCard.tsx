'use client'
import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'
import type { Product } from '@/lib/store-data'

const CATEGORIES = ['All', 'Hoodies', 'T-Shirts', 'Jackets', 'Accessories']

export function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product
  onAddToCart: (product: Product, size: string, color: string) => void
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])

  return (
    <ScrollReveal>
      <div className="group relative bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-white/5 hover:-translate-y-1">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {product.badge && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
              product.badge === 'Sale' ? 'bg-red-500 text-white' :
              product.badge === 'New' ? 'bg-emerald-500 text-white' :
              'bg-amber-500 text-black'
            }`}>{product.badge}</span>
          )}
          {product.originalPrice && (
            <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
          <button
            onClick={() => onAddToCart(product, selectedSize, selectedColor.name)}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-semibold text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-zinc-200"
          >
            <ShoppingBag size={16} />
            Add to Cart — ${product.price.toFixed(2)}
          </button>
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-medium text-sm leading-tight">{product.name}</h3>
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedColor.name === c.name ? 'border-white scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedSize === s
                    ? 'bg-white text-black'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export function ProductGrid({
  products,
  onAddToCart,
}: {
  products: Product[]
  onAddToCart: (product: Product, size: string, color: string) => void
}) {
  const [category, setCategory] = useState('All')
  const filtered = category === 'All' ? products : products.filter((p) => p.category === category)
  const [visibleCount, setVisibleCount] = useState(8)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setVisibleCount(8) }}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              category === cat
                ? 'bg-white text-black'
                : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
      {visibleCount < filtered.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((c) => c + 8)}
            className="px-8 py-3 rounded-xl border border-white/20 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Load More ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </section>
  )
}
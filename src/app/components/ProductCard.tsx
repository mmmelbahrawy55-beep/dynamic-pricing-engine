'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'
import { useCart } from '@/lib/contexts/cart-context'
import type { Product } from '@/lib/store-data'

const CATEGORIES = ['All', 'Hoodies', 'T-Shirts', 'Jackets', 'Accessories']

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])

  return (
    <ScrollReveal>
      <div
        className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
        }}
      >
        <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {product.badge && (
            <span
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
              style={{
                background:
                  product.badge === 'Sale' ? 'var(--badge-sale)' :
                  product.badge === 'New' ? 'var(--badge-new)' : 'var(--badge-trending)',
              }}
            >
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </Link>
        <div className="p-4 space-y-3">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium text-sm leading-tight transition-colors hover:opacity-70">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={(e) => { e.preventDefault(); setSelectedColor(c) }}
                className={`w-5 h-5 rounded-full border-2 transition-all ${selectedColor.name === c.name ? 'scale-110' : 'border-transparent'}`}
                style={{
                  backgroundColor: c.hex,
                  borderColor: selectedColor.name === c.name ? 'var(--accent)' : 'transparent',
                }}
                title={c.name}
              />
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={(e) => { e.preventDefault(); setSelectedSize(s) }}
                className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: selectedSize === s ? 'var(--accent)' : 'var(--bg-elevated)',
                  color: selectedSize === s ? 'var(--bg)' : 'var(--text-secondary)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product, selectedSize, selectedColor.name)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)',
            }}
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </ScrollReveal>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  const [category, setCategory] = useState('All')
  const filtered = category === 'All' ? products : products.filter((p) => p.category === category)
  const [visible, setVisible] = useState(12)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setVisible(12) }}
            className="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
            style={{
              background: category === cat ? 'var(--accent)' : 'var(--bg-elevated)',
              color: category === cat ? 'var(--bg)' : 'var(--text-secondary)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.slice(0, visible).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {visible < filtered.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisible((c) => c + 12)}
            className="px-8 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          >
            Load More ({filtered.length - visible} remaining)
          </button>
        </div>
      )}
    </section>
  )
}
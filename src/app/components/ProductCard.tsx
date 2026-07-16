'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Eye } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'
import { useCart } from '@/lib/contexts/cart-context'
import type { Product } from '@/lib/store-data'

const CATEGORIES = ['All', 'Hoodies', 'T-Shirts', 'Jackets', 'Accessories']

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor.name)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <ScrollReveal>
      <div className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        {/* Image */}
        <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
          <img src={product.images[0]} alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 50%)' }} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white"
                style={{
                  background: product.badge === 'Sale' ? 'var(--badge-sale)' :
                    product.badge === 'New' ? 'var(--badge-new)' :
                    product.badge === 'Premium' || product.badge === 'Best Seller' ? 'var(--badge-premium)' :
                    'var(--badge-trending)'
                }}>
                {product.badge}
              </span>
            )}
            {product.originalPrice && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Quick view */}
          <div className="absolute top-3 right-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <Link href={`/product/${product.id}`}
              className="flex items-center justify-center w-9 h-9 rounded-xl backdrop-blur-md transition-transform hover:scale-105"
              style={{ background: 'var(--glass)', color: 'var(--text)' }}>
              <Eye size={16} />
            </Link>
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 space-y-3">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium text-sm leading-tight transition-colors line-clamp-1" style={{ color: 'var(--text)' }}>
              {product.name}
            </h3>
          </Link>

          {/* Colors */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <button key={c.name}
                onClick={(e) => { e.preventDefault(); setSelectedColor(c) }}
                className="w-4 h-4 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: c.hex,
                  outline: selectedColor.name === c.name ? `2px solid var(--accent)` : 'none',
                  outlineOffset: '2px',
                }}
                title={c.name} />
            ))}
            {product.colors.length > 1 && (
              <span className="text-[10px] ml-1" style={{ color: 'var(--text-muted)' }}>+{product.colors.length - 1}</span>
            )}
          </div>

          {/* Sizes */}
          <div className="flex gap-1.5 flex-wrap">
            {product.sizes.slice(0, 4).map((s) => (
              <button key={s}
                onClick={(e) => { e.preventDefault(); setSelectedSize(s) }}
                className="w-7 h-7 rounded-lg text-[10px] font-medium transition-all"
                style={{
                  background: selectedSize === s ? 'var(--accent)' : 'var(--bg-elevated)',
                  color: selectedSize === s ? '#000' : 'var(--text-secondary)',
                }}>
                {s}
              </button>
            ))}
            {product.sizes.length > 4 && (
              <span className="w-7 h-7 rounded-lg text-[10px] flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
                +{product.sizes.length - 4}
              </span>
            )}
          </div>

          {/* Price + Add */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs line-through ml-2" style={{ color: 'var(--text-muted)' }}>${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <button onClick={handleAdd}
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:scale-105"
              style={{
                background: added ? 'var(--badge-new)' : 'var(--accent-muted)',
                color: added ? '#fff' : 'var(--accent)',
              }}>
              <ShoppingBag size={15} />
            </button>
          </div>
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
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Section header */}
      <div className="text-center mb-12">
        <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--accent)' }}>The Collection</span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4" style={{ color: 'var(--text)' }}>
          Premium <span className="italic font-serif" style={{ color: 'var(--accent)' }}>Essentials</span>
        </h2>
        <p className="max-w-md mx-auto text-sm" style={{ color: 'var(--text-muted)' }}>
          Curated for those who appreciate quality, design, and individuality.
        </p>
      </div>

      {/* Categories */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button key={cat}
            onClick={() => { setCategory(cat); setVisible(12) }}
            className="px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium whitespace-nowrap transition-all duration-300"
            style={{
              background: category === cat ? 'var(--accent)' : 'transparent',
              color: category === cat ? '#000' : 'var(--text-secondary)',
              border: category === cat ? 'none' : '1px solid var(--border)',
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.slice(0, visible).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Load More */}
      {visible < filtered.length && (
        <div className="flex justify-center mt-12">
          <button onClick={() => setVisible((c) => c + 12)}
            className="group relative px-10 py-3.5 rounded-xl text-sm font-medium tracking-wider uppercase overflow-hidden transition-all duration-300"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            <span className="relative z-10">Show More ({filtered.length - visible})</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'var(--glass)' }} />
          </button>
        </div>
      )}
    </section>
  )
}
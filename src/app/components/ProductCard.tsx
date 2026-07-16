'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Eye, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/contexts/cart-context'
import { useLocale } from '@/lib/contexts/locale-context'
import type { Product } from '@/lib/store-data'

const CATEGORIES_EN = ['All', 'Hoodies', 'T-Shirts', 'Jackets', 'Accessories']
const CATEGORIES_AR = ['الكل', 'هوديز', 'تيشرتات', 'جواكت', 'إكسسوارات']

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart()
  const { t, dir, locale } = useLocale()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [added, setAdded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, selectedSize, selectedColor.name)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 product-glow"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        opacity: 0,
        transform: 'translateY(40px) scale(0.95)',
        animation: `stagger-${(index % 4) + 1} 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms forwards`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }) }}
      onMouseMove={handleMouseMove}
    >
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: hovered
              ? `scale(1.08) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
              : 'scale(1)',
          }}
        />
        <div className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: 'linear-gradient(to top, var(--bg) 0%, transparent 40%)',
          }} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5" style={{ direction: 'ltr' }}>
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white"
              style={{
                background: product.badge === 'Sale' ? 'var(--badge-sale)' :
                  product.badge === 'New' ? 'var(--badge-new)' :
                  product.badge === 'Premium' || product.badge === 'Best Seller' ? 'var(--badge-premium)' :
                  'var(--badge-trending)',
                animation: hovered ? 'counter-pulse 0.3s ease' : 'none',
              }}>
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Quick view + Add buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${dir === 'rtl' ? '!left-3 !right-auto' : ''}`}
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : `translateX(${dir === 'ltr' ? '20px' : '-20px'})`,
          }}>
          <Link href={`/product/${product.id}`}
            className="flex items-center justify-center w-9 h-9 rounded-xl backdrop-blur-md transition-all hover:scale-110"
            style={{ background: 'var(--glass)', color: 'var(--text)', border: '1px solid var(--border)' }}>
            <Eye size={15} />
          </Link>
        </div>

        {/* Bottom overlay: quick add */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(20px)',
          }}>
          <button onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: added ? 'var(--badge-new)' : 'var(--accent)',
              color: '#000',
              backdropFilter: 'blur(10px)',
            }}>
            {added ? (
              <>✓ {t.product.added}</>
            ) : (
              <><ShoppingBag size={15} /> {t.product.addToBag}</>
            )}
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-sm leading-tight transition-colors line-clamp-1 hover:opacity-70" style={{ color: 'var(--text)' }}>
            {locale === 'ar' ? product.name : product.name}
          </h3>
        </Link>

        {/* Colors */}
        <div className="flex items-center gap-1.5" style={{ direction: 'ltr' }}>
          {product.colors.map((c) => (
            <button key={c.name}
              onClick={(e) => { e.preventDefault(); setSelectedColor(c) }}
              className="w-4 h-4 rounded-full transition-all duration-200 hover:scale-125"
              style={{
                backgroundColor: c.hex,
                outline: selectedColor.name === c.name ? '2px solid var(--accent)' : 'none',
                outlineOffset: '2px',
              }}
              title={c.name} />
          ))}
        </div>

        {/* Sizes */}
        <div className="flex gap-1.5 flex-wrap" style={{ direction: 'ltr' }}>
          {product.sizes.slice(0, 4).map((s) => (
            <button key={s}
              onClick={(e) => { e.preventDefault(); setSelectedSize(s) }}
              className="w-7 h-7 rounded-lg text-[10px] font-medium transition-all duration-200 hover:scale-110"
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

        {/* Price */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <Link href={`/product/${product.id}`}
            className="flex items-center gap-1 text-[11px] font-medium transition-all hover:gap-2"
            style={{ color: 'var(--text-muted)' }}>
            {t.product.continue} <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  const [category, setCategory] = useState('All')
  const { t, locale } = useLocale()
  const categories = locale === 'ar' ? CATEGORIES_AR : CATEGORIES_EN
  const categoryMap: Record<string, string> = {
    'All': 'all', 'الكل': 'all',
    'Hoodies': 'hoodies', 'هوديز': 'hoodies',
    'T-Shirts': 't-shirts', 'تيشرتات': 't-shirts',
    'Jackets': 'jackets', 'جواكت': 'jackets',
    'Accessories': 'accessories', 'إكسسوارات': 'accessories',
  }
  const filtered = category === 'All' || category === 'الكل'
    ? products
    : products.filter((p) => p.category === categoryMap[category])
  const [visible, setVisible] = useState(12)

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 scrollbar-hide">
        {categories.map((cat) => (
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 stagger">
        {filtered.slice(0, visible).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      {visible < filtered.length && (
        <div className="flex justify-center mt-12">
          <button onClick={() => setVisible((c) => c + 12)}
            className="group relative px-10 py-3.5 rounded-xl text-sm font-medium tracking-wider uppercase overflow-hidden transition-all duration-300"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            <span className="relative z-10">{t.loadMore} ({filtered.length - visible})</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'var(--glass)' }} />
          </button>
        </div>
      )}
    </section>
  )
}
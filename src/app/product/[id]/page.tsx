'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ShoppingBag, Check, Minus, Plus, Shield } from 'lucide-react'
import { products } from '@/lib/store-data'
import { useCart } from '@/lib/contexts/cart-context'
import { useTheme } from '@/lib/contexts/theme-context'
import { useAuth } from '@/lib/contexts/auth-context'
import { ScrollReveal } from '@/app/components/ScrollReveal'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { addToCart } = useCart()
  const { theme, toggle } = useTheme()
  const { user, logout } = useAuth()

  const product = products.find((p) => p.id === id)
  if (!product) return <div className="min-h-screen flex items-center justify-center"><p className="text-muted">Product not found</p></div>

  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product, selectedSize, selectedColor.name)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 -ml-2 rounded-lg transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
              <ChevronLeft size={20} />
            </button>
            <Link href="/" className="text-xl font-bold tracking-wider" style={{ color: 'var(--text)' }}>ELITE</Link>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <Link href="/admin" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
                <Shield size={16} /> Dashboard
              </Link>
            )}
            {user ? (
              <button onClick={logout} className="text-sm opacity-60 hover:opacity-100 transition-opacity" style={{ color: 'var(--text)' }}>Sign out</button>
            ) : (
              <Link href="/auth/login" className="text-sm" style={{ color: 'var(--text)' }}>Sign In</Link>
            )}
            <button onClick={toggle} className="p-2 rounded-lg transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)' }}>
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {product.images[1] && (
                <div className="aspect-[4/1] rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)' }}>
                  <img src={product.images[1]} alt={product.name} className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6 lg:pt-4">
              <div>
                {product.badge && (
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3" style={{
                    background: product.badge === 'Sale' ? 'var(--badge-sale)' : product.badge === 'New' ? 'var(--badge-new)' : 'var(--badge-trending)',
                    color: '#fff'
                  }}>
                    {product.badge}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{product.name}</h1>
                <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Colors */}
              <div>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Color — <span className="font-semibold" style={{ color: 'var(--text)' }}>{selectedColor.name}</span></p>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button key={c.name} onClick={() => setSelectedColor(c)} className="relative w-10 h-10 rounded-full transition-transform hover:scale-110" style={{ backgroundColor: c.hex }}>
                      {selectedColor.name === c.name && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check size={16} className={c.hex === '#ffffff' || c.hex === '#f5f0e8' ? 'text-black' : 'text-white'} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Size — <span className="font-semibold" style={{ color: 'var(--text)' }}>{selectedSize}</span></p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      className="min-w-[3rem] px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: selectedSize === s ? 'var(--accent)' : 'var(--bg-card)',
                        color: selectedSize === s ? 'var(--bg)' : 'var(--text)',
                        border: selectedSize === s ? 'none' : '1px solid var(--border)',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>Quantity</p>
                <div className="flex items-center gap-3" style={{ color: 'var(--text)' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 rounded-lg transition-colors hover:bg-white/10" style={{ border: '1px solid var(--border)' }}>
                    <Minus size={18} />
                  </button>
                  <span className="w-10 text-center font-semibold text-lg">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-2 rounded-lg transition-colors hover:bg-white/10" style={{ border: '1px solid var(--border)' }}>
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className="w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all"
                style={{
                  background: added ? 'var(--badge-new)' : 'var(--accent)',
                  color: added ? '#fff' : 'var(--bg)',
                }}
              >
                {added ? (
                  <><Check size={20} /> Added to Cart!</>
                ) : (
                  <><ShoppingBag size={20} /> Add to Cart — ${(product.price * qty).toFixed(2)}</>
                )}
              </button>

              <Link
                href="/"
                className="block w-full py-3 rounded-xl text-center text-sm font-medium transition-colors hover:bg-white/5"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ShoppingBag, Check, Minus, Plus, Shield } from 'lucide-react'
import { products } from '@/lib/store-data'
import { useCart } from '@/lib/contexts/cart-context'
import { useTheme } from '@/lib/contexts/theme-context'
import { useAuth } from '@/lib/contexts/auth-context'
import { useLocale } from '@/lib/contexts/locale-context'
import { ScrollReveal } from '@/app/components/ScrollReveal'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { addToCart } = useCart()
  const { theme, toggle } = useTheme()
  const { user, logout } = useAuth()
  const { t, dir, locale, toggle: toggleLocale } = useLocale()

  const product = products.find((p) => p.id === id)
  if (!product) return <div className="min-h-screen flex items-center justify-center"><p style={{ color: 'var(--text-muted)' }}>Product not found</p></div>

  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product, selectedSize, selectedColor.name)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen" dir={dir}>
      <nav className="sticky top-0 z-50 backdrop-blur-xl" style={{ borderBottom: '1px solid var(--border)', background: 'color-mix(in srgb, var(--bg) 85%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105" style={{ background: 'var(--bg-elevated)', color: 'var(--text)' }}>
              <ChevronLeft size={18} />
            </button>
            <Link href="/" className="text-lg font-bold tracking-[0.15em] uppercase" style={{ color: 'var(--text)' }}>ELITE</Link>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <Link href="/admin" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium" style={{ color: 'var(--accent)', background: 'var(--accent-muted)' }}>
                <Shield size={14} /> {t.nav.dashboard}
              </Link>
            )}
            <button onClick={toggleLocale} className="p-2 rounded-lg transition-colors text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {locale === 'en' ? 'AR' : 'EN'}
            </button>
            <button onClick={toggle} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-secondary)' }}>
              {theme === 'dark' ? <span>☀️</span> : <span>🌙</span>}
            </button>
            {user ? (
              <button onClick={logout} className="text-xs px-3 py-2 rounded-lg" style={{ color: 'var(--text-muted)' }}>{t.nav.signOut}</button>
            ) : (
              <Link href="/auth/login" className="text-xs font-medium px-3 py-2 rounded-lg" style={{ color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>{t.nav.signIn}</Link>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className={`space-y-4 ${dir === 'rtl' ? 'lg:order-2' : ''}`}>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)' }}>
                <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover transition-all duration-500" />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)}
                      className="w-20 h-24 rounded-xl overflow-hidden transition-all duration-200"
                      style={{ border: selectedImage === i ? '2px solid var(--accent)' : '2px solid var(--border)', opacity: selectedImage === i ? 1 : 0.5 }}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={`space-y-8 lg:pt-8 ${dir === 'rtl' ? 'lg:order-1' : ''}`}>
              <div>
                <div className="flex items-center gap-3 mb-4" style={{ flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}>
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
                  <span className="text-xs tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>{product.category}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>{product.name}</h1>
                <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
              </div>

              <div className="flex items-baseline gap-3" style={{ flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}>
                <span className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <div>
                <p className="text-xs tracking-wider uppercase font-medium mb-4" style={{ color: 'var(--text-muted)' }}>
                  {t.product.color} — <span className="font-semibold" style={{ color: 'var(--text)' }}>{selectedColor.name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button key={c.name} onClick={() => setSelectedColor(c)}
                      className="relative w-11 h-11 rounded-full transition-all hover:scale-110"
                      style={{
                        backgroundColor: c.hex,
                        outline: selectedColor.name === c.name ? '2px solid var(--accent)' : 'none',
                        outlineOffset: '3px',
                      }}>
                      {selectedColor.name === c.name && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check size={16} className={c.hex === '#ffffff' || c.hex === '#f5f0e8' ? 'text-black' : 'text-white'} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--text-muted)' }}>
                    {t.product.size} — <span className="font-semibold" style={{ color: 'var(--text)' }}>{selectedSize}</span>
                  </p>
                  <button className="text-xs underline" style={{ color: 'var(--text-muted)' }}>{t.product.sizeGuide}</button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)}
                      className="py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                      style={{
                        background: selectedSize === s ? 'var(--accent)' : 'var(--bg-card)',
                        color: selectedSize === s ? '#000' : 'var(--text-secondary)',
                        border: selectedSize === s ? 'none' : '1px solid var(--border)',
                      }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs tracking-wider uppercase font-medium mb-4" style={{ color: 'var(--text-muted)' }}>{t.product.quantity}</p>
                <div className="inline-flex items-center gap-3 rounded-xl p-1" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5" style={{ color: 'var(--text)' }}>
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-semibold text-lg" style={{ color: 'var(--text)' }}>{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5" style={{ color: 'var(--text)' }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button onClick={handleAdd}
                  className="w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01]"
                  style={{ background: added ? 'var(--badge-new)' : 'var(--accent)', color: '#000' }}>
                  {added ? <><Check size={20} /> {t.product.added} — ${(product.price * qty).toFixed(2)}</>
                    : <><ShoppingBag size={20} /> {t.product.addToBag} — ${(product.price * qty).toFixed(2)}</>}
                </button>
                <Link href="/"
                  className="block w-full py-3.5 rounded-xl text-center text-sm font-medium transition-all hover:opacity-80"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  {t.product.continue}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
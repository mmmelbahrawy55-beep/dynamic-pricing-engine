'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ShoppingBag, Check, Minus, Plus, Shield, Heart, Share2, Star } from 'lucide-react'
import { products } from '@/lib/store-data'
import { useCart } from '@/lib/contexts/cart-context'
import { useTheme } from '@/lib/contexts/theme-context'
import { useAuth } from '@/lib/contexts/auth-context'
import { useLocale } from '@/lib/contexts/locale-context'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { addToCart } = useCart()
  const { theme, toggle } = useTheme()
  const { user, logout } = useAuth()
  const { t, dir, locale, toggle: toggleLocale } = useLocale()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const product = products.find((p) => p.id === id)
  if (!product) return <div className="min-h-screen flex items-center justify-center"><p style={{ color: 'var(--text-muted)' }}>Product not found</p></div>

  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [liked, setLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const mainImageRef = useRef<HTMLDivElement>(null)
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    const h = () => {
      if (!mainImageRef.current) return
      const rect = mainImageRef.current.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setParallaxY((rect.top / window.innerHeight) * 30)
      }
    }
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product, selectedSize, selectedColor.name)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen page-enter" dir={dir}>
      {/* Nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl' : ''}`}
        style={{ borderBottom: '1px solid var(--border)', background: scrolled ? 'color-mix(in srgb, var(--bg) 85%, transparent)' : 'transparent' }}>
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
              {locale === 'en' ? 'عربي' : 'EN'}
            </button>
            <button onClick={toggle} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-secondary)' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images - with parallax */}
          <div className={`space-y-4 ${dir === 'rtl' ? 'lg:order-2' : ''}`}>
            <div ref={mainImageRef} className="aspect-[4/5] rounded-2xl overflow-hidden relative" style={{ background: 'var(--bg-card)' }}>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700"
                style={{
                  transform: `scale(1.05) translateY(${parallaxY}px)`,
                  opacity: imageLoaded ? 1 : 0,
                  filter: imageLoaded ? 'none' : 'blur(20px)',
                }}
                onLoad={() => setImageLoaded(true)}
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3))' }} />
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, i) => (
                  <button key={i} onClick={() => { setSelectedImage(i); setImageLoaded(false) }}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: selectedImage === i ? '24px' : '8px',
                      background: selectedImage === i ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
                    }} />
                ))}
              </div>
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => { setSelectedImage(i); setImageLoaded(false) }}
                    className="w-20 h-24 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
                    style={{
                      border: selectedImage === i ? '2px solid var(--accent)' : '2px solid var(--border)',
                      opacity: selectedImage === i ? 1 : 0.5,
                    }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className={`space-y-6 lg:pt-4 ${dir === 'rtl' ? 'lg:order-1' : ''}`}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)', animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}>
              <Link href="/" className="hover:opacity-80 transition-opacity">{locale === 'en' ? 'Home' : 'الرئيسية'}</Link>
              <span>/</span>
              <span className="capitalize">{product.category}</span>
              <span>/</span>
              <span style={{ color: 'var(--text-secondary)' }}>{product.name}</span>
            </div>

            {/* Badge + Title */}
            <div style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}>
              <div className="flex items-center gap-3 mb-3" style={{ flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}>
                {product.badge && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white"
                    style={{
                      background: product.badge === 'Sale' ? 'var(--badge-sale)' :
                        product.badge === 'New' ? 'var(--badge-new)' :
                        product.badge === 'Premium' || product.badge === 'Best Seller' ? 'var(--badge-premium)' : 'var(--badge-trending)'
                    }}>
                    {product.badge}
                  </span>
                )}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} fill={s <= 4 ? 'var(--accent)' : 'none'} style={{ color: 'var(--accent)' }} />
                  ))}
                  <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>(4.0)</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>{product.name}</h1>
              <p className="mt-4 leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3" style={{ flexDirection: dir === 'rtl' ? 'row-reverse' : 'row', animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }}>
              <span className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>${product.originalPrice.toFixed(2)}</span>
                  <span className="text-sm font-semibold px-2 py-0.5 rounded" style={{ background: 'var(--badge-sale)', color: '#fff' }}>
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--border)' }} />

            {/* Colors */}
            <div style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' }}>
              <p className="text-xs tracking-wider uppercase font-medium mb-4" style={{ color: 'var(--text-muted)' }}>
                {t.product.color} — <span className="font-semibold" style={{ color: 'var(--text)' }}>{selectedColor.name}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button key={c.name} onClick={() => setSelectedColor(c)}
                    className="relative w-12 h-12 rounded-full transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: c.hex,
                      outline: selectedColor.name === c.name ? '2px solid var(--accent)' : 'none',
                      outlineOffset: '4px',
                      boxShadow: selectedColor.name === c.name ? '0 0 20px var(--glow)' : 'none',
                    }}>
                    {selectedColor.name === c.name && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check size={18} className={c.hex === '#ffffff' || c.hex === '#f5f0e8' ? 'text-black' : 'text-white'} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs tracking-wider uppercase font-medium" style={{ color: 'var(--text-muted)' }}>
                  {t.product.size} — <span className="font-semibold" style={{ color: 'var(--text)' }}>{selectedSize}</span>
                </p>
                <button className="text-xs underline transition-colors hover:opacity-80" style={{ color: 'var(--accent)' }}>{t.product.sizeGuide}</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className="py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: selectedSize === s ? 'var(--accent)' : 'var(--bg-card)',
                      color: selectedSize === s ? '#000' : 'var(--text-secondary)',
                      border: selectedSize === s ? 'none' : '1px solid var(--border)',
                      boxShadow: selectedSize === s ? '0 4px 20px var(--glow)' : 'none',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' }}>
              <p className="text-xs tracking-wider uppercase font-medium mb-4" style={{ color: 'var(--text-muted)' }}>{t.product.quantity}</p>
              <div className="inline-flex items-center gap-4 rounded-xl p-1.5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 rounded-lg flex items-center justify-center transition-all hover:scale-105" style={{ color: 'var(--text)' }}>
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-bold text-xl" style={{ color: 'var(--text)' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-11 h-11 rounded-lg flex items-center justify-center transition-all hover:scale-105" style={{ color: 'var(--text)' }}>
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2" style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both' }}>
              <div className="flex gap-3">
                <button onClick={handleAdd}
                  className="flex-1 py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: added ? 'var(--badge-new)' : 'var(--accent)', color: '#000', boxShadow: added ? 'none' : '0 4px 30px var(--glow)' }}>
                  {added ? <><Check size={20} /> {t.product.added}</> : <><ShoppingBag size={20} /> {t.product.addToBag} — ${(product.price * qty).toFixed(2)}</>}
                </button>
                <button onClick={() => setLiked(!liked)}
                  className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                  style={{ border: '1px solid var(--border)', color: liked ? '#ef4444' : 'var(--text-secondary)' }}>
                  <Heart size={20} fill={liked ? '#ef4444' : 'none'} />
                </button>
                <button className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  <Share2 size={20} />
                </button>
              </div>
              <Link href="/"
                className="block w-full py-3.5 rounded-xl text-center text-sm font-medium transition-all hover:opacity-80"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                {t.product.continue}
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 pt-4" style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' }}>
              {[
                { icon: '🚚', label: t.hero.freeShipping },
                { icon: '↩️', label: t.hero.returns },
                { icon: '🔒', label: locale === 'en' ? 'Secure Checkout' : 'دفع آمن' },
                { icon: '✨', label: locale === 'en' ? 'Authentic Products' : 'منتجات أصلية' },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'
import { useState, useMemo } from 'react'
import { products, categories, type Product } from '@/lib/store-data'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<{ product: Product; size: string; color: string; quantity: number }[]>([])

  const filtered = useMemo(
    () => activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory),
    [activeCategory],
  )

  const addToCart = (product: Product, size: string, color: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size && i.color === color)
      if (existing) {
        return prev.map((i) => i === existing ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { product, size, color, quantity: 1 }]
    })
  }

  const updateQty = (index: number, qty: number) => {
    setCart((prev) => qty <= 0 ? prev.filter((_, i) => i !== index) : prev.map((i, idx) => idx === index ? { ...i, quantity: qty } : i))
  }

  const cartCount = cart.reduce((a, i) => a + i.quantity, 0)
  const cartTotal = cart.reduce((a, i) => a + i.product.price * i.quantity, 0)

  return (
    <div className="min-h-screen bg-dark-950">
      <header className="sticky top-0 z-50 bg-dark-950/90 backdrop-blur-lg border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold tracking-widest text-white">ELITE</h1>
            <nav className="hidden md:flex gap-6">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`text-sm tracking-wider transition-colors ${activeCategory === cat.id ? 'text-white' : 'text-dark-400 hover:text-white'}`}>
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative p-2 text-dark-300 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-dark-950 text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="md:hidden flex px-4 pb-3 gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`text-xs tracking-wider whitespace-nowrap px-3 py-1.5 rounded-full border transition-colors ${activeCategory === cat.id ? 'bg-white text-dark-950 border-white' : 'border-dark-700 text-dark-400 hover:text-white'}`}>
              {cat.name}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">{categories.find((c) => c.id === activeCategory)?.name || 'All'}</h2>
          <p className="text-dark-400 text-sm mt-1">{filtered.length} products</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="border-t border-dark-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-dark-500 text-xs tracking-wider">
          <p className="font-bold text-dark-300 mb-2">ELITE</p>
          <p>Premium Fashion 2026. All rights reserved.</p>
        </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onUpdateQty={updateQty} total={cartTotal} />
    </div>
  )
}
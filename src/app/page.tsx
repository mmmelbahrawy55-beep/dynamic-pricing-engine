'use client'
import { useState } from 'react'
import { products, type Product } from '@/lib/store-data'
import { Navbar } from '@/app/components/Navbar'
import { Hero } from '@/app/components/Hero'
import { ProductGrid } from '@/app/components/ProductCard'
import { CartDrawer } from '@/app/components/CartDrawer'
import { Footer } from '@/app/components/Footer'

interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: string
}

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product, size: string, color: string) => {
    setCart((prev) => {
      const key = `${product.id}-${size}-${color}`
      const existing = prev.find(
        (i) => `${i.id}-${i.selectedSize}-${i.selectedColor}` === key
      )
      if (existing) {
        return prev.map((i) =>
          `${i.id}-${i.selectedSize}-${i.selectedColor}` === key
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (id: string, qty: number) => {
    setCart((prev) =>
      qty === 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    )
  }

  const removeItem = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id))

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <div id="products">
        <ProductGrid products={products} onAddToCart={addToCart} />
      </div>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  )
}
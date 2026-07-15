'use client'
import { products } from '@/lib/store-data'
import { useCart } from '@/lib/contexts/cart-context'
import { Navbar } from '@/app/components/Navbar'
import { Hero } from '@/app/components/Hero'
import { ProductGrid } from '@/app/components/ProductCard'
import { CartDrawer } from '@/app/components/CartDrawer'
import { Footer } from '@/app/components/Footer'

export default function Home() {
  const { open, setOpen, items, updateQuantity, removeItem, count } = useCart()

  return (
    <div className="min-h-screen">
      <Navbar cartCount={count} onCartOpen={() => setOpen(true)} />
      <Hero />
      <div id="products">
        <ProductGrid products={products} />
      </div>
      <Footer />
      <CartDrawer
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        onUpdateQuantity={(id, qty) => {
          const item = items.find((i) => i.id === id)
          if (item) updateQuantity(id, item.selectedSize, item.selectedColor, qty)
        }}
        onRemove={(id) => {
          const item = items.find((i) => i.id === id)
          if (item) removeItem(id, item.selectedSize, item.selectedColor)
        }}
      />
    </div>
  )
}
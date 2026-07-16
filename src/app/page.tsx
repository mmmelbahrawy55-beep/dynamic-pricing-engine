'use client'
import { products } from '@/lib/store-data'
import { useCart } from '@/lib/contexts/cart-context'
import { useLocale } from '@/lib/contexts/locale-context'
import { Navbar } from '@/app/components/Navbar'
import { Hero } from '@/app/components/Hero'
import { ProductSection } from '@/app/components/sections/ProductSection'
import { BrandStory } from '@/app/components/sections/BrandStory'
import { CartDrawer } from '@/app/components/CartDrawer'
import { Footer } from '@/app/components/Footer'

export default function Home() {
  const { open, setOpen, items, updateQuantity, removeItem, count } = useCart()
  const { t } = useLocale()

  const featured = products.filter((p) => p.featured && !p.badge?.includes('New'))
  const newArrivals = products.filter((p) => p.badge === 'New')
  const bestsellers = products.filter((p) => p.badge === 'Best Seller' || p.badge === 'Premium')
  const hoodies = products.filter((p) => p.category === 'hoodies')
  const accessories = products.filter((p) => p.category === 'accessories')

  return (
    <div className="min-h-screen">
      <Navbar cartCount={count} onCartOpen={() => setOpen(true)} />
      <Hero />
      <ProductSection products={featured} tag={t.sections.featured.tag} title={t.sections.featured.title} accent={t.sections.featured.accent} desc={t.sections.featured.desc} limit={4} />
      <ProductSection products={newArrivals} tag={t.sections.newArrivals.tag} title={t.sections.newArrivals.title} accent={t.sections.newArrivals.accent} desc={t.sections.newArrivals.desc} limit={4} />
      <ProductSection products={bestsellers} tag={t.sections.bestsellers.tag} title={t.sections.bestsellers.title} accent={t.sections.bestsellers.accent} desc={t.sections.bestsellers.desc} limit={4} />
      <ProductSection products={hoodies} tag={t.sections.hoodies.tag} title={t.sections.hoodies.title} accent={t.sections.hoodies.accent} desc={t.sections.hoodies.desc} limit={4} />
      <ProductSection products={accessories} tag={t.sections.accessories.tag} title={t.sections.accessories.title} accent={t.sections.accessories.accent} desc={t.sections.accessories.desc} limit={4} />
      <BrandStory t={t.sections.story} />
      <Footer />
      <CartDrawer
        open={open} onClose={() => setOpen(false)} items={items}
        onUpdateQuantity={(id, qty) => { const i = items.find((x) => x.id === id); if (i) updateQuantity(id, i.selectedSize, i.selectedColor, qty) }}
        onRemove={(id) => { const i = items.find((x) => x.id === id); if (i) removeItem(id, i.selectedSize, i.selectedColor) }}
      />
    </div>
  )
}
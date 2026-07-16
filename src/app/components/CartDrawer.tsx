'use client'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCart, type CartItem } from '@/lib/contexts/cart-context'
import { useLocale } from '@/lib/contexts/locale-context'

export function CartDrawer({
  open,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}: {
  open: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, qty: number) => void
  onRemove: (id: string) => void
}) {
  const { total } = useCart()
  const { t, dir } = useLocale()

  return (
    <>
      {open && <div className="fixed inset-0 z-40 backdrop-blur-sm" style={{ background: 'var(--overlay)' }} onClick={onClose} />}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-lg z-50 transform transition-all duration-500 ease-out"
        dir={dir}
        style={{
          background: 'var(--bg)',
          borderLeft: dir === 'ltr' ? '1px solid var(--border)' : 'none',
          borderRight: dir === 'rtl' ? '1px solid var(--border)' : 'none',
          transform: open ? 'translateX(0)' : `translateX(${dir === 'ltr' ? '100%' : '-100%'})`,
          [dir === 'ltr' ? 'right' : 'left']: 0,
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid var(--border)' }}>
            <div>
              <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>{t.product.shoppingBag}</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {items.length} {items.length === 1 ? t.product.item : t.product.items}
              </p>
            </div>
            <button onClick={onClose}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
              style={{ background: 'var(--bg-elevated)', color: 'var(--text)' }}>
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center" style={{ color: 'var(--text-muted)' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'var(--bg-elevated)' }}>
                  <ShoppingBag size={28} style={{ color: 'var(--text-muted)' }} />
                </div>
                <p className="text-base font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{t.product.emptyBag}</p>
                <p className="text-sm">{t.product.emptyHint}</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 rounded-xl p-3 transition-colors"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <Link href={`/product/${item.id}`} onClick={onClose} className="shrink-0">
                    <div className="w-20 h-24 rounded-lg overflow-hidden">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`} onClick={onClose}>
                      <h3 className="font-medium text-sm leading-tight transition-colors hover:opacity-70" style={{ color: 'var(--text)' }}>
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      {item.selectedSize} · {item.selectedColor}
                    </p>
                    <p className="text-sm font-semibold mt-1" style={{ color: 'var(--accent)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2" style={{ direction: 'ltr' }}>
                      <button onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                        style={{ background: 'var(--bg-elevated)', color: 'var(--text)' }}>
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-sm font-medium" style={{ color: 'var(--text)' }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                        style={{ background: 'var(--bg-elevated)', color: 'var(--text)' }}>
                        <Plus size={12} />
                      </button>
                      <button onClick={() => onRemove(item.id)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${dir === 'rtl' ? 'mr-auto' : 'ml-auto'}`}
                        style={{ color: 'var(--badge-sale)' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 space-y-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex justify-between items-baseline">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t.product.subtotal}</span>
                <span className="text-xl font-bold" style={{ color: 'var(--text)' }}>${total.toFixed(2)}</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.product.freeShipping}</p>
              <Link href="/auth/login" onClick={onClose}
                className="block w-full py-3.5 rounded-xl font-semibold text-sm text-center transition-all hover:scale-[1.01]"
                style={{ background: 'var(--accent)', color: '#000' }}>
                {t.product.checkout} — ${total.toFixed(2)}
              </Link>
              <button onClick={onClose}
                className="block w-full py-2 text-xs tracking-wider uppercase text-center transition-colors"
                style={{ color: 'var(--text-muted)' }}>
                {t.product.continue}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
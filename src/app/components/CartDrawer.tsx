'use client'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCart, type CartItem } from '@/lib/contexts/cart-context'

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

  return (
    <>
      {open && <div className="fixed inset-0 z-40" style={{ background: 'var(--overlay)' }} onClick={onClose} />}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md z-50 transform transition-transform duration-300"
        style={{
          background: 'var(--bg-card)',
          borderLeft: '1px solid var(--border)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h2 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <ShoppingBag size={20} /> Cart ({items.length})
            </h2>
            <button onClick={onClose} className="p-1 rounded-lg transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center mt-20" style={{ color: 'var(--text-muted)' }}>
                <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3 rounded-xl p-3" style={{ background: 'var(--bg-elevated)' }}>
                  <Link href={`/product/${item.id}`} onClick={onClose}>
                    <img src={item.images[0]} alt={item.name} className="w-20 h-24 object-cover rounded-lg" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.id}`} onClick={onClose}>
                      <h3 className="font-medium text-sm truncate transition-colors hover:opacity-70" style={{ color: 'var(--text)' }}>{item.name}</h3>
                    </Link>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {item.selectedSize} / {item.selectedColor}
                    </p>
                    <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text)' }}>${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 rounded transition-colors" style={{ background: 'var(--bg-card)', color: 'var(--text)' }}>
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm" style={{ color: 'var(--text)' }}>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded transition-colors" style={{ background: 'var(--bg-card)', color: 'var(--text)' }}>
                        <Plus size={14} />
                      </button>
                      <button onClick={() => onRemove(item.id)}
                        className="ml-auto p-1 rounded transition-colors" style={{ color: '#ef4444' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {items.length > 0 && (
            <div className="p-4 space-y-3" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex justify-between text-lg font-semibold" style={{ color: 'var(--text)' }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link
                href="/auth/login"
                onClick={onClose}
                className="block w-full py-3 text-center font-semibold rounded-xl transition-all"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
'use client'
import { useState } from 'react'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import type { Product } from '@/lib/store-data'

interface CartItem extends Product { quantity: number; selectedSize: string; selectedColor: string }

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
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-white/10 z-50 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag size={20} /> Cart ({items.length})
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center text-zinc-500 mt-20">
                <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3 bg-zinc-800/50 rounded-xl p-3">
                  <img src={item.images[0]} alt={item.name} className="w-20 h-24 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-zinc-400">
                      {item.selectedSize} / {item.selectedColor}
                    </p>
                    <p className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-auto p-1 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {items.length > 0 && (
            <div className="p-4 border-t border-white/10 space-y-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link
                href="/auth/login"
                onClick={onClose}
                className="block w-full py-3 bg-white text-black text-center font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
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
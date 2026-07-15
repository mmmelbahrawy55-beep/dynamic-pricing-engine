'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product } from '@/lib/store-data'

export interface CartItem extends Product {
  quantity: number
  selectedSize: string
  selectedColor: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, qty: number) => void
  removeItem: (id: string, size: string, color: string) => void
  count: number
  total: number
  open: boolean
  setOpen: (v: boolean) => void
}

const CartContext = createContext<CartContextType>({} as CartContextType)

function key(product: Product, size: string, color: string) {
  return `${product.id}-${size}-${color}`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [open, setOpen] = useState(false)

  const addToCart = (product: Product, size: string, color: string) => {
    const k = key(product, size, color)
    setItems((prev) => {
      const existing = prev.find((i) => key(i, i.selectedSize, i.selectedColor) === k)
      if (existing) return prev.map((i) => (key(i, i.selectedSize, i.selectedColor) === k ? { ...i, quantity: i.quantity + 1 } : i))
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }]
    })
    setOpen(true)
  }

  const updateQuantity = (id: string, size: string, color: string, qty: number) => {
    if (qty <= 0) return removeItem(id, size, color)
    setItems((prev) => prev.map((i) => (i.id === id && i.selectedSize === size && i.selectedColor === color ? { ...i, quantity: qty } : i)))
  }

  const removeItem = (id: string, size: string, color: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.selectedSize === size && i.selectedColor === color)))
  }

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem, count, total, open, setOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
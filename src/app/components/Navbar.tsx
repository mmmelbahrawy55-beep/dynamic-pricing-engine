'use client'
import { useTheme } from '@/lib/contexts/theme-context'
import { useAuth } from '@/lib/contexts/auth-context'
import { Moon, Sun, ShoppingBag, LogOut, User, Shield } from 'lucide-react'
import Link from 'next/link'

export function Navbar({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) {
  const { theme, toggle } = useTheme()
  const { user, logout } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{ borderBottom: '1px solid var(--border)', background: 'color-mix(in srgb, var(--bg) 80%, transparent)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wider" style={{ color: 'var(--text)' }}>ELITE</Link>
        <div className="flex items-center gap-2">
          {user && (
            <Link href="/admin" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
              <Shield size={16} /> Dashboard
            </Link>
          )}
          {user ? (
            <button onClick={logout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
              <LogOut size={16} /> Sign out
            </button>
          ) : (
            <Link href="/auth/login" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
              <User size={16} /> Sign In
            </Link>
          )}
          <button onClick={toggle} className="p-2 rounded-lg transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={onCartOpen} className="relative p-2 rounded-lg transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
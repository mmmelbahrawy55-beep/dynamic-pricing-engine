'use client'
import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/contexts/theme-context'
import { useAuth } from '@/lib/contexts/auth-context'
import { ShoppingBag, User, Shield, LogOut, Sun, Moon } from 'lucide-react'
import Link from 'next/link'

export function Navbar({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) {
  const { theme, toggle } = useTheme()
  const { user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl' : ''
      }`}
      style={{
        background: scrolled ? 'color-mix(in srgb, var(--bg) 85%, transparent)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: 'var(--accent)' }}>
            <span className="text-black text-xs font-black">E</span>
          </div>
          <span className="text-xl font-bold tracking-[0.15em] uppercase" style={{ color: 'var(--text)' }}>
            ELITE
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Collection', 'New Arrivals', 'Sale'].map((item) => (
            <a key={item} href="#products"
              className="text-sm tracking-wider uppercase transition-colors relative group"
              style={{ color: 'var(--text-secondary)' }}>
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full" style={{ background: 'var(--accent)' }} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {user && (
            <Link href="/admin"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
              style={{ color: 'var(--accent)', background: 'var(--accent-muted)' }}>
              <Shield size={14} /> Dashboard
            </Link>
          )}
          <button onClick={toggle} className="p-2.5 rounded-xl transition-all hover:scale-105" style={{ color: 'var(--text-secondary)' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <button onClick={logout} className="p-2.5 rounded-xl transition-all hover:scale-105 hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
              <LogOut size={18} />
            </button>
          ) : (
            <Link href="/auth/login" className="p-2.5 rounded-xl transition-all hover:scale-105 hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
              <User size={18} />
            </Link>
          )}
          <button onClick={onCartOpen} className="relative p-2.5 rounded-xl transition-all hover:scale-105" style={{ color: 'var(--text-secondary)' }}>
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold rounded-full"
                style={{ background: 'var(--accent)', color: '#000' }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
'use client'
import { useAuth } from '@/lib/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Package, BarChart3, TrendingUp, CreditCard, LogOut } from 'lucide-react'

export default function AdminPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/auth/login?redirect=/admin')
  }, [user, router])

  if (!user) return null

  const stats = [
    { label: 'Total Revenue', value: '$12,845', icon: BarChart3, change: '+23%' },
    { label: 'Orders', value: '156', icon: ShoppingBag, change: '+12%' },
    { label: 'Products', value: '42', icon: Package, change: '+4' },
    { label: 'Conversion', value: '3.2%', icon: TrendingUp, change: '+0.8%' },
  ]

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 backdrop-blur-xl" style={{ borderBottom: '1px solid var(--border)', background: 'color-mix(in srgb, var(--bg) 80%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-bold tracking-wider" style={{ color: 'var(--text)' }}>ELITE</Link>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}>Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{user.name}</span>
            <button onClick={logout} className="p-2 rounded-lg transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <s.icon size={20} style={{ color: 'var(--text-muted)' }} />
                <span className="text-xs" style={{ color: '#10b981' }}>{s.change}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link href="/admin/products" className="rounded-2xl p-6 transition-all group"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <Package size={24} className="mb-3 transition-colors group-hover:opacity-80" style={{ color: 'var(--text-muted)' }} />
            <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Products</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Manage your catalog, inventory, and pricing</p>
          </Link>
          <Link href="/admin/orders" className="rounded-2xl p-6 transition-all group"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <CreditCard size={24} className="mb-3 transition-colors group-hover:opacity-80" style={{ color: 'var(--text-muted)' }} />
            <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>Orders</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>View and manage customer orders</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
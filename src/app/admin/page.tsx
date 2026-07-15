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
      <div className="sticky top-0 z-30 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-bold tracking-wider">ELITE</Link>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-zinc-400">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400">{user.name}</span>
            <button onClick={logout} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-zinc-900/50 rounded-2xl p-5 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <s.icon size={20} className="text-zinc-400" />
                <span className="text-xs text-emerald-400">{s.change}</span>
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Link
            href="/admin/products"
            className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all group"
          >
            <Package size={24} className="mb-3 text-zinc-400 group-hover:text-white transition-colors" />
            <h3 className="font-semibold mb-1">Products</h3>
            <p className="text-sm text-zinc-500">Manage your catalog, inventory, and pricing</p>
          </Link>
          <Link
            href="/admin/orders"
            className="bg-zinc-900/50 rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all group"
          >
            <CreditCard size={24} className="mb-3 text-zinc-400 group-hover:text-white transition-colors" />
            <h3 className="font-semibold mb-1">Orders</h3>
            <p className="text-sm text-zinc-500">View and manage customer orders</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
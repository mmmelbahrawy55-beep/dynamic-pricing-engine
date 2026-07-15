'use client'
import { useAuth } from '@/lib/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AdminOrdersPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/auth/login?redirect=/admin/orders')
  }, [user, router])

  if (!user) return null

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 backdrop-blur-xl" style={{ borderBottom: '1px solid var(--border)', background: 'color-mix(in srgb, var(--bg) 80%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link href="/admin" className="p-2 rounded-lg transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
            <ArrowLeft size={18} />
          </Link>
          <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>Orders</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
          <p className="text-lg">No orders yet</p>
          <p className="text-sm mt-2">Orders will appear here once customers start purchasing</p>
        </div>
      </div>
    </div>
  )
}
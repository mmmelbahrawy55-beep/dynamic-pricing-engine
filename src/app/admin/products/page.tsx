'use client'
import { useAuth } from '@/lib/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { products } from '@/lib/store-data'

export default function AdminProductsPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/auth/login?redirect=/admin/products')
  }, [user, router])

  if (!user) return null

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-30 backdrop-blur-xl" style={{ borderBottom: '1px solid var(--border)', background: 'color-mix(in srgb, var(--bg) 80%, transparent)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link href="/admin" className="p-2 rounded-lg transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
            <ArrowLeft size={18} />
          </Link>
          <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>Products</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="overflow-x-auto rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Product', 'Category', 'Price', 'Sizes', 'Colors'].map((h) => (
                  <th key={h} className="text-left py-3 px-3 font-medium" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="transition-colors" style={{ borderBottom: '1px solid var(--border)' }}>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded" />
                      <span style={{ color: 'var(--text)' }}>{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>{p.category}</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text)' }}>${p.price.toFixed(2)}</td>
                  <td className="py-3 px-3" style={{ color: 'var(--text-muted)' }}>{p.sizes.join(', ')}</td>
                  <td className="py-3 px-3">
                    <div className="flex gap-1">
                      {p.colors.map((c) => (
                        <span key={c.name} className="w-4 h-4 rounded-full" style={{ backgroundColor: c.hex, border: '1px solid var(--border)' }} />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
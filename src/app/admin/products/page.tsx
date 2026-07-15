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
      <div className="sticky top-0 z-30 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link href="/admin" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <span className="text-lg font-bold">Products</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 text-zinc-500 font-medium">Product</th>
                <th className="text-left py-3 px-2 text-zinc-500 font-medium">Category</th>
                <th className="text-left py-3 px-2 text-zinc-500 font-medium">Price</th>
                <th className="text-left py-3 px-2 text-zinc-500 font-medium">Sizes</th>
                <th className="text-left py-3 px-2 text-zinc-500 font-medium">Colors</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded" />
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-zinc-400">{p.category}</td>
                  <td className="py-3 px-2">${p.price.toFixed(2)}</td>
                  <td className="py-3 px-2 text-zinc-400">{p.sizes.join(', ')}</td>
                  <td className="py-3 px-2">
                    <div className="flex gap-1">
                      {p.colors.map((c) => (
                        <span
                          key={c.name}
                          className="w-4 h-4 rounded-full border border-white/10"
                          style={{ backgroundColor: c.hex }}
                        />
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
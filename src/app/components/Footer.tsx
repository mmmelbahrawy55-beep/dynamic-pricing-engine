'use client'
import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }} className="mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold tracking-wider mb-4" style={{ color: 'var(--text)' }}>ELITE</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Premium streetwear for the bold. Redefining fashion one stitch at a time.
            </p>
          </div>
          {[
            { title: 'Shop', links: ['Hoodies', 'T-Shirts', 'Jackets', 'Accessories'] },
            { title: 'Support', links: ['Contact', 'Shipping', 'Returns', 'FAQ'] },
            { title: 'Legal', links: ['Privacy', 'Terms'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text)' }}>{col.title}</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="hover:opacity-80 transition-opacity">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 text-center text-sm" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          &copy; 2026 ELITE. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
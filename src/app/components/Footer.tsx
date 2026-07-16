'use client'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-32" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                <span className="text-black text-xs font-black">E</span>
              </div>
              <span className="text-lg font-bold tracking-[0.15em] uppercase" style={{ color: 'var(--text)' }}>ELITE</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Redefining contemporary fashion with uncompromising quality and bold design since 2020.
            </p>
            <div className="flex gap-3 mt-6">
              {['IG', 'TT', 'YT', 'PI'].map((s) => (
                <a key={s} href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all hover:scale-105"
                  style={{ background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Shop', links: ['All Products', 'Hoodies', 'T-Shirts', 'Jackets', 'Accessories', 'Sale'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Sustainability', 'Press', 'Lookbook'] },
            { title: 'Support', links: ['Contact', 'Shipping', 'Returns & Exchanges', 'Size Guide', 'FAQ'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs tracking-[0.15em] uppercase font-semibold mb-5" style={{ color: 'var(--text)' }}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#"
                      className="text-sm transition-colors duration-200 hover:opacity-80"
                      style={{ color: 'var(--text-muted)' }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderTop: '1px solid var(--border)' }}>
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-1" style={{ color: 'var(--text-secondary)' }}>
              Join the Elite
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Subscribe for exclusive drops and early access.
            </p>
          </div>
          <div className="flex w-full sm:w-auto">
            <input type="email" placeholder="Enter your email"
              className="px-4 py-3 text-sm outline-none flex-1 sm:w-64"
              style={{ background: 'var(--bg-card)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '12px 0 0 12px' }} />
            <button
              className="px-6 py-3 text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#000', borderRadius: '0 12px 12px 0' }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
          <p>&copy; 2026 ELITE. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-80 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-80 transition-opacity">Terms of Service</a>
            <a href="#" className="hover:opacity-80 transition-opacity">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
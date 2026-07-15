'use client'
import { useTheme } from '@/lib/contexts/theme-context'

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer className="border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg tracking-wider mb-4">ELITE</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Premium streetwear for the bold. Redefining fashion one stitch at a time.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Hoodies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">T-Shirts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jackets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-10 pt-6 text-center text-sm text-zinc-600">
          &copy; 2026 ELITE. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
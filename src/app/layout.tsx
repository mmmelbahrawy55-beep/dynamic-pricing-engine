import type { Metadata } from 'next'
import { ThemeProvider } from '@/lib/contexts/theme-context'
import { AuthProvider } from '@/lib/contexts/auth-context'
import { CartProvider } from '@/lib/contexts/cart-context'
import { LocaleProvider } from '@/lib/contexts/locale-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'ELITE — Premium Fashion',
  description: 'Premium streetwear for the bold. Redefining fashion one stitch at a time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <LocaleProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </LocaleProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
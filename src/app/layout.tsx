import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ELITE — Premium Fashion',
  description: 'Premium clothing collection for the modern individual',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
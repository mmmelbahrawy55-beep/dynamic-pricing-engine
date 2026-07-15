export const metadata = {
  title: 'Dynamic Pricing Engine',
  description: 'Real-time Amazon price scraping and dynamic pricing dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0a0a0a', color: '#e5e5e5' }}>
        {children}
      </body>
    </html>
  )
}

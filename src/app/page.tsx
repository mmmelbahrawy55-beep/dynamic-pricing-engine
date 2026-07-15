import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const statusColor: Record<string, string> = {
  pending: 'text-yellow-400',
  syncing: 'text-blue-400',
  synced: 'text-green-400',
  failed: 'text-red-400',
}

interface Product {
  id: string
  amazon_url: string
  product_name: string | null
  raw_price: number | null
  our_price: number | null
  margin_percentage: number | null
  sync_status: string
  updated_at: string
}

export default async function Dashboard() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, amazon_url, product_name, raw_price, our_price, margin_percentage, sync_status, updated_at')
    .order('updated_at', { ascending: false })
    .limit(50)

  const { count: total } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  const list = (products ?? []) as unknown as Product[]

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24, background: '#0a0a0a', color: '#e5e5e5', fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>Dynamic Pricing Engine</h1>
          <p style={{ margin: '4px 0 0', color: '#888', fontSize: 14 }}>
            {total ?? 0} products
            {error && <span style={{ color: '#f87171', marginLeft: 8 }}>· DB error</span>}
          </p>
        </div>
      </header>

      <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid #1f1f1f' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#141414', borderBottom: '1px solid #1f1f1f' }}>
              <th style={th}>Product</th>
              <th style={th}>Raw Price</th>
              <th style={th}>Our Price</th>
              <th style={th}>Margin</th>
              <th style={th}>Status</th>
              <th style={th}>Updated</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 32, textAlign: 'center', color: '#666' }}>
                  No products yet. Add one via{' '}
                  <code style={{ background: '#1f1f1f', padding: '2px 6px', borderRadius: 4 }}>
                    POST /api/queue/scrape
                  </code>
                </td>
              </tr>
            ) : (
              list.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #1f1f1f' }}>
                  <td style={td}>
                    <div style={{
                      maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {p.product_name ?? '—'}
                    </div>
                    <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                      {p.amazon_url.replace(/^https?:\/\//, '').slice(0, 40)}...
                    </div>
                  </td>
                  <td style={td}>{p.raw_price != null ? `$${p.raw_price}` : '—'}</td>
                  <td style={td}>{p.our_price != null ? `$${p.our_price}` : '—'}</td>
                  <td style={td}>
                    {p.raw_price && p.our_price
                      ? `${((p.raw_price - p.our_price) / p.raw_price * 100).toFixed(1)}%`
                      : '—'}
                  </td>
                  <td style={td}>
                    <span style={{ color: statusColor[p.sync_status] ?? '#888', fontWeight: 500 }}>
                      {p.sync_status}
                    </span>
                  </td>
                  <td style={td}>{new Date(p.updated_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const th: React.CSSProperties = {
  padding: '10px 16px',
  textAlign: 'left',
  fontWeight: 500,
  color: '#888',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

const td: React.CSSProperties = {
  padding: '12px 16px',
  whiteSpace: 'nowrap',
}

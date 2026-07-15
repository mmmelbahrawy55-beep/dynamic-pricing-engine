import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    return NextResponse.json({ error: 'Missing env vars', url: !!url, key: !!key }, { status: 500 })
  }

  const supabase = createClient(url, key)

  const { data, error, count } = await supabase
    .from('products')
    .select('id, amazon_url, product_name, raw_price, our_price, margin_percentage, sync_status, updated_at', { count: 'exact' })
    .order('updated_at', { ascending: false })
    .limit(50)

  return NextResponse.json({ products: data ?? [], total: count ?? 0, error: error?.message })
}
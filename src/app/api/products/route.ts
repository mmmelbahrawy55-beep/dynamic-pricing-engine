import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const supabase = createClient(url, key)

  const { data: products, error } = await supabase
    .from('products')
    .select('id, amazon_url, product_name, raw_price, our_price, margin_percentage, sync_status, updated_at')
    .order('updated_at', { ascending: false })
    .limit(50)

  if (error) {
    return NextResponse.json({ error: error.message })
  }

  const { count: total } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({ products, total })
}
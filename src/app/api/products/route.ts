import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = getSupabase()

    const { data: products, error } = await supabase
      .from('products')
      .select('id, amazon_url, product_name, raw_price, our_price, margin_percentage, sync_status, updated_at')
      .order('updated_at', { ascending: false })
      .limit(50)

    if (error) throw error

    const { count: total } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({ products, total, debug: { url: process.env.SUPABASE_URL?.substring(0, 30), keyLen: process.env.SUPABASE_SERVICE_ROLE_KEY?.length, ts: Date.now() } })
  } catch (err) {
    logger.error({ err }, 'Failed to fetch products')
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
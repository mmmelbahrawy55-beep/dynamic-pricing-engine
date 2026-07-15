import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('id, amazon_url, product_name, raw_price, our_price, margin_percentage, sync_status, updated_at')
      .order('updated_at', { ascending: false })
      .limit(50)

    if (error) throw error

    const { count: total } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({ products, total })
  } catch (err) {
    logger.error({ err }, 'Failed to fetch products')
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

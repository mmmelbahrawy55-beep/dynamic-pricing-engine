import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = getSupabase()
    const { data: products, error } = await supabase
      .from('products')
      .select('id, amazon_url, product_name, raw_price, our_price, margin_percentage, sync_status, created_at, updated_at')
      .order('updated_at', { ascending: false })

    if (error) throw error

    const header = 'id,amazon_url,product_name,raw_price,our_price,margin_percentage,sync_status,created_at,updated_at'
    const rows = (products ?? []).map((p) =>
      [
        p.id,
        `"${p.amazon_url}"`,
        p.product_name ? `"${p.product_name.replace(/"/g, '""')}"` : '',
        p.raw_price ?? '',
        p.our_price ?? '',
        p.margin_percentage ?? '',
        p.sync_status,
        p.created_at,
        p.updated_at,
      ].join(','),
    )

    const csv = [header, ...rows].join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="products-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  } catch (err) {
    logger.error({ err }, 'Failed to export products')
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}
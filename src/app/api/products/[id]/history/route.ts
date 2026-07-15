import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { logger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

function parseMessage(msg: string): { rawPrice: number | null; ourPrice: number | null } {
  const rawMatch = msg.match(/raw_price=(\d+\.?\d*)/)
  const ourMatch = msg.match(/our_price=(\d+\.?\d*)/)
  return {
    rawPrice: rawMatch ? parseFloat(rawMatch[1]) : null,
    ourPrice: ourMatch ? parseFloat(ourMatch[1]) : null,
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    const supabase = getSupabase()
    const { data: logs, error } = await supabase
      .from('sync_logs')
      .select('created_at, message')
      .eq('product_id', id)
      .eq('status', 'success')
      .order('created_at', { ascending: true })
      .limit(90)

    if (error) throw error

    const history = (logs ?? []).map((log) => ({
      recordedAt: log.created_at,
      ...parseMessage(log.message ?? ''),
    })).filter((h) => h.rawPrice != null || h.ourPrice != null)

    return NextResponse.json({ history })
  } catch (err) {
    logger.error({ err, productId: id }, 'Failed to fetch price history')
    return NextResponse.json({ error: 'Failed to fetch price history' }, { status: 500 })
  }
}
import { NextResponse } from 'next/server'
import { getScrapeQueue } from '@/lib/queue/config'
import { logger } from '@/lib/logger'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [waiting, active, completed, failed] = await Promise.all([
      getScrapeQueue().getWaitingCount(),
      getScrapeQueue().getActiveCount(),
      getScrapeQueue().getCompletedCount(),
      getScrapeQueue().getFailedCount(),
    ])

    return NextResponse.json({ queue: 'scrape-products', waiting, active, completed, failed })
  } catch (err) {
    logger.error({ err }, 'Failed to get queue status')
    return NextResponse.json({ error: 'Queue unavailable' }, { status: 503 })
  }
}

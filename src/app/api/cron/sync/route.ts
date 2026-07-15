import { NextRequest, NextResponse } from 'next/server'
import { enqueueSyncAll } from '@/lib/queue/producers/sync-all'
import { badRequest, serverError } from '@/lib/errors'
import { logger } from '@/lib/logger'

export const maxDuration = 60

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expected = process.env.CRON_SECRET

  if (expected && authHeader !== `Bearer ${expected}`) {
    return badRequest('Unauthorized')
  }

  const marginRaw = request.nextUrl.searchParams.get('margin')
  const marginPercentage = marginRaw ? Number(marginRaw) : 25

  if (isNaN(marginPercentage) || marginPercentage < 0) {
    return badRequest('Invalid margin parameter')
  }

  logger.info({ marginPercentage }, 'Cron: syncing all products')

  try {
    const result = await enqueueSyncAll(marginPercentage)
    logger.info(result, 'Cron: sync completed')
    return NextResponse.json({ message: 'Jobs enqueued', ...result })
  } catch (err) {
    logger.error({ err }, 'Cron: sync failed')
    return serverError('Failed to enqueue sync jobs')
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { enqueueScrapeProduct } from '@/lib/queue/producers/scrape-product'
import { queueScrapeSchema } from '@/lib/validation'
import { badRequest, fromZod, serverError } from '@/lib/errors'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return badRequest('Invalid JSON body')
  }

  const parsed = queueScrapeSchema.safeParse(body)
  if (!parsed.success) return fromZod(parsed.error)

  try {
    const jobId = await enqueueScrapeProduct({
      productId: parsed.data.productId,
      amazonUrl: parsed.data.amazonUrl,
      marginPercentage: parsed.data.margin,
    })

    logger.info({ productId: parsed.data.productId, jobId }, 'Scrape job enqueued')
    return NextResponse.json({ jobId, message: 'Scrape job enqueued' }, { status: 202 })
  } catch (err) {
    logger.error({ err, productId: parsed.data.productId }, 'Failed to enqueue job')
    return serverError('Failed to enqueue scrape job')
  }
}

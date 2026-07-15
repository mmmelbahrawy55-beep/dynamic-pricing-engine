import { NextRequest, NextResponse } from 'next/server'
import { scrapeAmazon } from '@/lib/scrapers/amazon'
import { isScrapeError } from '@/lib/types'
import { scrapeUrlSchema } from '@/lib/validation'
import { badRequest, serverError, fromZod } from '@/lib/errors'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return badRequest('Invalid JSON body')
  }

  const parsed = scrapeUrlSchema.safeParse(body)
  if (!parsed.success) return fromZod(parsed.error)

  logger.info({ url: parsed.data.url }, 'Scraping product')

  const result = await scrapeAmazon(parsed.data.url)

  if (isScrapeError(result)) {
    logger.warn({ code: result.code, url: parsed.data.url }, 'Scrape failed')
    const statusMap: Record<string, number> = {
      INVALID_URL: 400,
      BLOCKED: 429,
      NETWORK_ERROR: 502,
      PARSE_ERROR: 422,
      UNKNOWN: 500,
    }
    return NextResponse.json(
      { error: result.message, code: result.code },
      { status: statusMap[result.code] ?? 500 },
    )
  }

  logger.info({ url: parsed.data.url, price: result.rawPrice }, 'Scrape succeeded')
  return NextResponse.json(result, { status: 200 })
}

import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { scrapeAmazon } from '@/lib/scrapers/amazon'
import { isScrapeError } from '@/lib/types'
import { scrapeUrlSchema } from '@/lib/validation'
import { badRequest } from '@/lib/errors'
import { logger } from '@/lib/logger'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return badRequest('Invalid JSON body')
  }

  const input = json as { urls?: unknown; margin?: number }

  if (!Array.isArray(input.urls) || input.urls.length === 0) {
    return badRequest('urls must be a non-empty array')
  }
  if (input.urls.length > 10) {
    return badRequest('Maximum 10 URLs per batch')
  }

  const margin = input.margin ?? 25
  const results: { url: string; status: string; productName?: string; rawPrice?: number; ourPrice?: number; error?: string }[] = []

  const supabase = getSupabase()
  const urls = input.urls.filter((u): u is string => typeof u === 'string')
  for (const url of urls) {
    const parsed = scrapeUrlSchema.safeParse({ url, margin })
    if (!parsed.success) {
      results.push({ url, status: 'invalid', error: parsed.error.issues[0]?.message })
      continue
    }

    try {
      const scrapeResult = await scrapeAmazon(url)
      if (isScrapeError(scrapeResult)) {
        results.push({ url, status: 'error', error: scrapeResult.message })
        continue
      }

      const { error: dbError } = await supabase.from('products').insert({
        amazon_url: url,
        product_name: scrapeResult.productName,
        raw_price: scrapeResult.rawPrice,
        our_price: scrapeResult.rawPrice != null ? Math.round(scrapeResult.rawPrice * (1 - margin / 100) * 100) / 100 : null,
        sync_status: 'synced',
      })

      if (dbError) {
        results.push({ url, status: 'db_error', error: dbError.message })
        continue
      }

      results.push({
        url,
        status: 'success',
        productName: scrapeResult.productName ?? undefined,
        rawPrice: scrapeResult.rawPrice ?? undefined,
        ourPrice: scrapeResult.rawPrice != null ? Math.round(scrapeResult.rawPrice * (1 - margin / 100) * 100) / 100 : undefined,
      })
    } catch (err) {
      results.push({ url, status: 'error', error: err instanceof Error ? err.message : 'Unknown' })
    }
  }

  logger.info({ total: results.length, success: results.filter((r) => r.status === 'success').length }, 'Batch scrape completed')
  return NextResponse.json({ results, total: results.length })
}
import { getSupabase } from '../supabase'
import { scrapeAmazon } from '../scrapers/amazon'
import { isScrapeError } from '../types'
import { syncProductPrice } from '../services/product-sync'
import type { ScrapeProductPayload } from './jobs'

async function markFailed(productId: string, message: string): Promise<void> {
  const supabase = getSupabase()
  await supabase
    .from('products')
    .update({ sync_status: 'failed', updated_at: new Date().toISOString() })
    .eq('id', productId)

  await supabase.from('sync_logs').insert({
    product_id: productId,
    status: 'failure',
    message,
  })
}

export async function processScrapeJob(payload: ScrapeProductPayload): Promise<void> {
  const { productId, amazonUrl, marginPercentage } = payload

  const scrapeResult = await scrapeAmazon(amazonUrl)

  if (isScrapeError(scrapeResult)) {
    if (scrapeResult.retryable) {
      throw new Error(scrapeResult.message)
    }

    await markFailed(productId, scrapeResult.message)
    return
  }

  if (scrapeResult.rawPrice == null) {
    await markFailed(productId, 'Price could not be extracted from the page')
    return
  }

  await syncProductPrice(productId, scrapeResult.rawPrice, marginPercentage)
}

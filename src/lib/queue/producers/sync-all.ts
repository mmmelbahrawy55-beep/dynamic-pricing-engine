import { supabase } from '../../supabase'
import { enqueueScrapeProduct } from './scrape-product'

interface SyncAllResult {
  enqueued: number
  failed: number
  reverted: number
}

export async function enqueueSyncAll(marginPercentage = 25): Promise<SyncAllResult> {
  const now = new Date().toISOString()

  const { data: products, error } = await supabase
    .from('products')
    .update({ sync_status: 'syncing', updated_at: now })
    .neq('sync_status', 'syncing')
    .select('id, amazon_url')

  if (error) throw error
  if (!products || products.length === 0) return { enqueued: 0, failed: 0, reverted: 0 }

  const enqueuedIds: string[] = []
  const failedIds: string[] = []

  for (const product of products) {
    try {
      await enqueueScrapeProduct({
        productId: product.id,
        amazonUrl: product.amazon_url,
        marginPercentage,
      })
      enqueuedIds.push(product.id)
    } catch {
      failedIds.push(product.id)
    }
  }

  if (failedIds.length > 0) {
    await supabase
      .from('products')
      .update({ sync_status: 'pending', updated_at: now })
      .in('id', failedIds)
  }

  return { enqueued: enqueuedIds.length, failed: failedIds.length, reverted: failedIds.length }
}

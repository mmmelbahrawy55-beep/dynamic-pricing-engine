import { getScrapeQueue } from '../config'
import { JOB_NAMES } from '../jobs'
import type { ScrapeProductPayload } from '../jobs'

export async function enqueueScrapeProduct(payload: ScrapeProductPayload): Promise<string> {
  const job = await getScrapeQueue().add(JOB_NAMES.SCRAPE_PRODUCT, payload, {
    jobId: `scrape-${payload.productId}-${Date.now()}`,
  })
  return job.id!
}

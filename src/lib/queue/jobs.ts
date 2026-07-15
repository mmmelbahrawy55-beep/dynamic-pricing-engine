export const JOB_NAMES = {
  SCRAPE_PRODUCT: 'scrape-product',
} as const

export interface ScrapeProductPayload {
  productId: string
  amazonUrl: string
  marginPercentage: number
}

export interface ScrapeResult {
  productName: string | null
  rawPrice: number | null
  currency: string | null
  url: string
  scrapedAt: string
}

export interface ScrapeError {
  code: 'NETWORK_ERROR' | 'PARSE_ERROR' | 'BLOCKED' | 'INVALID_URL' | 'UNKNOWN'
  message: string
  retryable: boolean
}

export type ScrapeResponse = ScrapeResult | ScrapeError

export function isScrapeError(res: ScrapeResponse): res is ScrapeError {
  return 'code' in res
}

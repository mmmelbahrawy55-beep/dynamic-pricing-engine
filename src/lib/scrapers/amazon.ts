import axios from 'axios'
import { load } from 'cheerio'
import type { CheerioAPI } from 'cheerio'
import type { ScrapeResult, ScrapeError } from '../types'
import { getNextUserAgent } from '../user-agents'
import { callWithBreaker, CircuitBreakerOpenError } from '../circuit-breaker'
import { reportError } from '../sentry'

const TIMEOUT_MS = 8_000
const MAX_REDIRECTS = 3

const SELECTORS = {
  title: [
    '#productTitle',
    '#title',
    'h1.a-size-large',
    '[data-feature-name="title"]',
    '#productTitle_feature_div h1',
  ],
  price: [
    '.a-price .a-offscreen',
    '#priceblock_ourprice',
    '#priceblock_dealprice',
    '.a-price-whole',
    '.priceToPay .a-offscreen',
    '.a-price .a-text-price',
    '[data-a-size="xl"] .a-offscreen',
  ],
  currency: [
    '.a-price-symbol',
    '.a-price .a-text-price .a-offscreen',
  ],
} as const

function parseAmazonUrl(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`
  }
  return trimmed
}

function extractPrice(text: string): { value: number; currency: string } | null {
  const cleaned = text.replace(/[^0-9.,]/g, '').replace(/,/g, '')
  const value = parseFloat(cleaned)
  if (isNaN(value)) return null

  const match = text.match(/[£$€¥]|[A-Z]{3}/)
  const currency = match ? match[0] : 'USD'
  return { value, currency }
}

async function fetchPage(url: string): Promise<string> {
  const ua = getNextUserAgent()
  const { data } = await callWithBreaker('amazon', () =>
    axios.get<string>(url, {
      timeout: TIMEOUT_MS,
      maxRedirects: MAX_REDIRECTS,
      headers: {
        'User-Agent': ua,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      responseType: 'text',
    }),
  )
  return data
}

function isBlocked(html: string): boolean {
  const signals = [
    'What is your question',
    'Enter the characters you see below',
    'Sorry, we just need to make sure',
    'Type the characters you see in this image',
    'captcha',
    '/errors/validateCaptcha',
  ]
  return signals.some((s) => html.toLowerCase().includes(s.toLowerCase()))
}

function findFirst($: CheerioAPI, selectors: readonly string[]): string | null {
  for (const sel of selectors) {
    const el = $(sel).first()
    const text = el.text().trim()
    if (text) return text
  }
  return null
}

export async function scrapeAmazon(url: string): Promise<ScrapeResult | ScrapeError> {
  const cleanUrl = parseAmazonUrl(url)

  if (!cleanUrl.includes('amazon.') && !cleanUrl.includes('amzn.')) {
    return { code: 'INVALID_URL', message: 'URL does not appear to be an Amazon product page', retryable: false }
  }

  let html: string
  try {
    html = await fetchPage(cleanUrl)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.code === 'ECONNABORTED') {
        return { code: 'NETWORK_ERROR', message: 'Request timed out', retryable: true }
      }
      if (err.response?.status === 503 || err.response?.status === 403) {
        return { code: 'BLOCKED', message: `Amazon returned status ${err.response.status}`, retryable: true }
      }
      return { code: 'NETWORK_ERROR', message: err.message, retryable: true }
    }
    if (err instanceof CircuitBreakerOpenError) {
      return { code: 'BLOCKED', message: 'Amazon circuit breaker is open — too many failures', retryable: true }
    }
    reportError(err)
    return { code: 'UNKNOWN', message: err instanceof Error ? err.message : 'Unknown error', retryable: true }
  }

  if (isBlocked(html)) {
    return { code: 'BLOCKED', message: 'Captcha or bot detection triggered', retryable: true }
  }

  const $ = load(html)

  const title = findFirst($, SELECTORS.title)

  const priceText = findFirst($, SELECTORS.price)
  let rawPrice: number | null = null
  let currency: string | null = null
  if (priceText) {
    const parsed = extractPrice(priceText)
    if (parsed) {
      rawPrice = parsed.value
      currency = parsed.currency
    }
  }

  if (!title && rawPrice === null) {
    return { code: 'PARSE_ERROR', message: 'Could not extract product title or price from the page', retryable: false }
  }

  return {
    productName: title,
    rawPrice,
    currency,
    url: cleanUrl,
    scrapedAt: new Date().toISOString(),
  }
}

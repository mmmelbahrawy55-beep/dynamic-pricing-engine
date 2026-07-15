import { describe, it, expect } from 'vitest'

function parseAmazonUrl(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`
  }
  return trimmed
}

function isValidAmazonUrl(url: string): boolean {
  const clean = parseAmazonUrl(url)
  return clean.includes('amazon.') || clean.includes('amzn.')
}

describe('url validation', () => {
  it('detects amazon URLs', () => {
    expect(isValidAmazonUrl('https://www.amazon.com/dp/B0D4WZ86B7')).toBe(true)
    expect(isValidAmazonUrl('http://amazon.co.uk/dp/test')).toBe(true)
    expect(isValidAmazonUrl('https://amzn.to/test')).toBe(true)
  })

  it('rejects non-amazon URLs', () => {
    expect(isValidAmazonUrl('https://example.com/product')).toBe(false)
    expect(isValidAmazonUrl('https://google.com')).toBe(false)
  })

  it('adds https prefix', () => {
    const result = parseAmazonUrl('www.amazon.com/dp/test')
    expect(result).toBe('https://www.amazon.com/dp/test')
  })

  it('handles empty string', () => {
    const result = parseAmazonUrl('')
    expect(result).toBe('https://')
  })
})

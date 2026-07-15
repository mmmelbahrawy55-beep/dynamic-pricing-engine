import { describe, it, expect } from 'vitest'
import { calculateOurPrice } from '@/lib/pricing'

describe('calculateOurPrice', () => {
  it('calculates price with 25% margin', () => {
    expect(calculateOurPrice(100, 25)).toBe(75)
  })

  it('returns null for null rawPrice', () => {
    expect(calculateOurPrice(null, 25)).toBeNull()
  })

  it('returns null for null margin', () => {
    expect(calculateOurPrice(100, null)).toBeNull()
  })

  it('returns null for undefined inputs', () => {
    expect(calculateOurPrice(undefined, 25)).toBeNull()
    expect(calculateOurPrice(100, undefined)).toBeNull()
  })

  it('returns null for negative rawPrice', () => {
    expect(calculateOurPrice(-10, 25)).toBeNull()
  })

  it('returns null for zero rawPrice', () => {
    expect(calculateOurPrice(0, 25)).toBeNull()
  })

  it('caps at 0 when margin > 100%', () => {
    expect(calculateOurPrice(100, 150)).toBe(0)
  })

  it('returns rawPrice for 0% margin', () => {
    expect(calculateOurPrice(50, 0)).toBe(50)
  })

  it('rounds to 2 decimal places', () => {
    expect(calculateOurPrice(99.99, 33.33)).toBe(66.66)
  })

  it('handles Infinity gracefully', () => {
    expect(calculateOurPrice(Infinity, 25)).toBeNull()
    expect(calculateOurPrice(100, Infinity)).toBeNull()
  })

  it('handles NaN gracefully', () => {
    expect(calculateOurPrice(NaN, 25)).toBeNull()
    expect(calculateOurPrice(100, NaN)).toBeNull()
  })
})

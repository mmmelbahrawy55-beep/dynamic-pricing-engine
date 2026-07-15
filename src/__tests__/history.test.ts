import { describe, it, expect } from 'vitest'

function parseMessage(msg: string): { rawPrice: number | null; ourPrice: number | null } {
  const rawMatch = msg.match(/raw_price=(\d+\.?\d*)/)
  const ourMatch = msg.match(/our_price=(\d+\.?\d*)/)
  return {
    rawPrice: rawMatch ? parseFloat(rawMatch[1]) : null,
    ourPrice: ourMatch ? parseFloat(ourMatch[1]) : null,
  }
}

describe('parseMessage', () => {
  it('parses standard success message', () => {
    const result = parseMessage('raw_price=29.99, our_price=22.49, margin=25%')
    expect(result.rawPrice).toBe(29.99)
    expect(result.ourPrice).toBe(22.49)
  })

  it('returns nulls for failure message', () => {
    const result = parseMessage('Network error: timeout')
    expect(result.rawPrice).toBeNull()
    expect(result.ourPrice).toBeNull()
  })

  it('handles integer prices', () => {
    const result = parseMessage('raw_price=50, our_price=37.5, margin=25%')
    expect(result.rawPrice).toBe(50)
    expect(result.ourPrice).toBe(37.5)
  })

  it('handles empty message', () => {
    const result = parseMessage('')
    expect(result.rawPrice).toBeNull()
    expect(result.ourPrice).toBeNull()
  })
})

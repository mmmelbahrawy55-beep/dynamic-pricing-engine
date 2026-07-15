/**
 * Calculates our selling price from the raw Amazon price and target margin.
 *
 * Formula:  ourPrice = rawPrice - (rawPrice × marginPercentage / 100)
 *
 * Returns null for any invalid / non-financial input.
 */
export function calculateOurPrice(
  rawPrice: number | null | undefined,
  marginPercentage: number | null | undefined,
): number | null {
  if (rawPrice == null || marginPercentage == null) return null
  if (typeof rawPrice !== 'number' || typeof marginPercentage !== 'number') return null
  if (!Number.isFinite(rawPrice) || !Number.isFinite(marginPercentage)) return null
  if (rawPrice <= 0) return null

  const ourPrice = rawPrice - rawPrice * (marginPercentage / 100)

  return Number(Math.max(ourPrice, 0).toFixed(2))
}

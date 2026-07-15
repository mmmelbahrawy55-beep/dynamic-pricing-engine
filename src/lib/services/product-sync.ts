import { supabase } from '../supabase'
import { calculateOurPrice } from '../pricing'

export interface SyncResult {
  ourPrice: number | null
  success: boolean
  error?: string
}

/**
 * Calculates our_price from raw_price and margin_percentage, then updates the
 * products table. On success sync_status is set to 'synced'; on failure it is
 * set to 'failed' and the error is recorded in sync_logs.
 *
 * This function always updates sync_logs (success or failure).
 */
export async function syncProductPrice(
  productId: string,
  rawPrice: number,
  marginPercentage: number,
): Promise<SyncResult> {
  const ourPrice = calculateOurPrice(rawPrice, marginPercentage)

  try {
    const { error: updateError } = await supabase
      .from('products')
      .update({
        raw_price: rawPrice,
        our_price: ourPrice,
        sync_status: 'synced',
        updated_at: new Date().toISOString(),
      })
      .eq('id', productId)

    if (updateError) throw updateError

    const { error: logError } = await supabase.from('sync_logs').insert({
      product_id: productId,
      status: 'success',
      message: `raw_price=${rawPrice}, our_price=${ourPrice}, margin=${marginPercentage}%`,
    })

    if (logError) throw logError

    return { ourPrice, success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'

    await supabase
      .from('products')
      .update({
        sync_status: 'failed',
        updated_at: new Date().toISOString(),
      })
      .eq('id', productId)

    await supabase.from('sync_logs').insert({
      product_id: productId,
      status: 'failure',
      message,
    })

    return { ourPrice, success: false, error: message }
  }
}

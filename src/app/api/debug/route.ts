import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.SUPABASE_URL ?? 'NOT SET'
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'NOT SET'
  const keyPreview = key.substring(0, 30) + '...'
  const keyLength = key.length

  return NextResponse.json({
    url,
    keyLength,
    keyPreview,
    nodeEnv: process.env.NODE_ENV,
  })
}
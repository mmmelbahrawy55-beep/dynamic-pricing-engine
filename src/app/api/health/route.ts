import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET() {
  const checks: Record<string, string> = {}

  try {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const { error } = await supabase.from('products').select('id').limit(1)
    checks.supabase = error ? 'unhealthy' : 'healthy'
  } catch {
    checks.supabase = 'unhealthy'
  }

  const isHealthy = Object.values(checks).every((s) => s === 'healthy')

  return NextResponse.json(
    {
      status: isHealthy ? 'healthy' : 'degraded',
      version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? process.env.npm_package_version ?? '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks,
    },
    { status: isHealthy ? 200 : 503 },
  )
}
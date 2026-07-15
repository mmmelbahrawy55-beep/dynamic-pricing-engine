import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '')
const sql = fs.readFileSync(path.resolve(__dirname, '../../schema.sql'), 'utf8')

const statements = sql
  .split(';')
  .map((s) => s.trim())
  .filter((s) => s.length > 0 && !s.startsWith('--'))

async function migrate() {
  console.log(`Running ${statements.length} statements on ${projectRef}...`)

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i] + ';'
    try {
      const res = await fetch(
        `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: stmt }),
        },
      )

      if (!res.ok) {
        const body = await res.text()
        throw new Error(`${res.status}: ${body.slice(0, 200)}`)
      }

      console.log(`  [${i + 1}/${statements.length}] OK`)
    } catch (err) {
      console.error(`  [${i + 1}/${statements.length}] FAILED:`, (err as Error).message)
    }
  }

  console.log('Migration complete.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})

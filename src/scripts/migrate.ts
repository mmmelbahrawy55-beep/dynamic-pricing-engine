import { Client } from 'pg'
import { readFileSync } from 'fs'
import { join } from 'path'

async function migrate() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })

  try {
    await client.connect()
    const sql = readFileSync(join(__dirname, '../../schema.sql'), 'utf8')
    await client.query(sql)
    console.log('Migration completed successfully')
  } catch (err) {
    console.error('Migration failed:', err)
    process.exit(1)
  } finally {
    await client.end()
  }
}

migrate()
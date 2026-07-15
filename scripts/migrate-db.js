const { Client } = require('pg');

const client = new Client({
  host: 'db.ucrxeiiaxvhihzulhnxu.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});

const sql = `
CREATE TABLE IF NOT EXISTS price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  raw_price NUMERIC(10,2),
  our_price NUMERIC(10,2),
  margin_percentage NUMERIC(5,2),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_price_history_product_id ON price_history(product_id);
CREATE INDEX IF NOT EXISTS idx_price_history_recorded_at ON price_history(recorded_at);
`;

client.connect()
  .then(() => client.query(sql))
  .then(() => { console.log('Migration completed'); process.exit(0); })
  .catch(err => { console.error('Failed:', err.message); process.exit(1); });
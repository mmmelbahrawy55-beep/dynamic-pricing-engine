CREATE TABLE products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amazon_url    TEXT NOT NULL,
  product_name  TEXT,
  raw_price     NUMERIC(10,2),
  our_price     NUMERIC(10,2),
  margin_percentage NUMERIC(5,2) GENERATED ALWAYS AS (
    CASE WHEN raw_price > 0 THEN ROUND(((raw_price - our_price) / raw_price) * 100, 2) ELSE NULL END
  ) STORED,
  sync_status   TEXT NOT NULL DEFAULT 'pending'
    CHECK (sync_status IN ('pending', 'syncing', 'synced', 'failed')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_amazon_url ON products (amazon_url);
CREATE INDEX idx_products_sync_status ON products (sync_status);

CREATE TABLE sync_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID REFERENCES products (id) ON DELETE CASCADE,
  status        TEXT NOT NULL CHECK (status IN ('success', 'failure')),
  message       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sync_logs_product_id ON sync_logs (product_id);
CREATE INDEX idx_sync_logs_created_at ON sync_logs (created_at);

CREATE TABLE price_history (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id    UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
  raw_price     NUMERIC(10,2),
  our_price     NUMERIC(10,2),
  margin_percentage NUMERIC(5,2),
  recorded_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_price_history_product_id ON price_history (product_id);
CREATE INDEX idx_price_history_recorded_at ON price_history (recorded_at);

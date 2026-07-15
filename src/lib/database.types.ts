export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          amazon_url: string
          product_name: string | null
          raw_price: number | null
          our_price: number | null
          margin_percentage: number | null
          sync_status: 'pending' | 'syncing' | 'synced' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          amazon_url: string
          product_name?: string | null
          raw_price?: number | null
          our_price?: number | null
          sync_status?: 'pending' | 'syncing' | 'synced' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          amazon_url?: string
          product_name?: string | null
          raw_price?: number | null
          our_price?: number | null
          sync_status?: 'pending' | 'syncing' | 'synced' | 'failed'
          updated_at?: string
        }
      }
      sync_logs: {
        Row: {
          id: string
          product_id: string
          status: 'success' | 'failure'
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          status: 'success' | 'failure'
          message?: string | null
          created_at?: string
        }
        Update: {
          status?: 'success' | 'failure'
          message?: string | null
        }
      }
    }
  }
}

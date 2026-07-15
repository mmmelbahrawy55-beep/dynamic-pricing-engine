import { z } from 'zod'

export const scrapeUrlSchema = z.object({
  url: z.string().url('Must be a valid URL').min(1, 'URL is required'),
})

export const queueScrapeSchema = z.object({
  productId: z.string().uuid('Must be a valid UUID'),
  amazonUrl: z.string().url('Must be a valid URL').min(1, 'amazonUrl is required'),
  margin: z.number().min(0).max(1000).optional().default(25),
})

export const cronSyncSchema = z.object({
  margin: z.coerce.number().min(0).max(1000).optional().default(25),
})

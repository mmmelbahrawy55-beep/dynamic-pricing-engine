import { Queue, Worker } from 'bullmq'
import Redis from 'ioredis'
import type { ScrapeProductPayload } from './jobs'

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379'

function createConnection(): Redis {
  const needsTls = REDIS_URL.includes('upstash.io') || REDIS_URL.includes('redislabs.com')
  return new Redis(REDIS_URL, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: false,
    lazyConnect: true,
    ...(needsTls ? { tls: {} } : {}),
  })
}

let _connection: Redis | null = null
function getConnection(): Redis {
  if (!_connection) {
    _connection = createConnection()
  }
  return _connection
}

let _queue: Queue | null = null
export function getScrapeQueue(): Queue {
  if (!_queue) {
    _queue = new Queue('scrape-products', {
      connection: getConnection(),
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 5_000 },
        removeOnComplete: { age: 86_400, count: 500 },
        removeOnFail: { age: 604_800 },
      },
    })
  }
  return _queue
}

export function createScrapeWorker(handler: (payload: ScrapeProductPayload) => Promise<void>): Worker {
  return new Worker(
    'scrape-products',
    async (job) => {
      await handler(job.data as ScrapeProductPayload)
    },
    {
      connection: getConnection(),
      concurrency: 3,
    },
  )
}

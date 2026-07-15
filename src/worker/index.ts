import { createScrapeWorker } from '../lib/queue/config'
import { processScrapeJob } from '../lib/queue/worker'
import { logger } from '../lib/logger'

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379'

async function main() {
  const worker = createScrapeWorker(processScrapeJob)
  logger.info({ redisUrl: REDIS_URL }, 'Worker listening for scrape-product jobs')

  const shutdown = async (signal: string) => {
    logger.info({ signal }, 'Shutting down worker...')
    await worker.close()
    process.exit(0)
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))

  worker.on('failed', (job, err) => {
    logger.error(
      { jobId: job?.id, productId: job?.data?.productId, attempts: job?.attemptsMade, err },
      'Job failed after all retries',
    )
  })

  worker.on('completed', (job) => {
    logger.info({ jobId: job.id, productId: job.data.productId }, 'Job completed')
  })
}

main().catch((err) => {
  logger.fatal(err, 'Worker failed to start')
  process.exit(1)
})

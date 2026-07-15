import { init, captureException, captureMessage, SeverityLevel } from '@sentry/nextjs'

const dsn = process.env.SENTRY_DSN

export function initSentry(): void {
  if (!dsn) return
  init({ dsn, environment: process.env.NODE_ENV ?? 'development', tracesSampleRate: 0.1 })
}

export function reportError(error: unknown, context?: Record<string, unknown>): void {
  if (!dsn) {
    console.error('[sentry disabled]', error, context)
    return
  }
  if (error instanceof Error) {
    captureException(error, { extra: context })
  } else {
    captureMessage(String(error), 'error' as SeverityLevel)
  }
}

export function reportMessage(message: string, level: SeverityLevel = 'info'): void {
  if (!dsn) return
  captureMessage(message, level)
}

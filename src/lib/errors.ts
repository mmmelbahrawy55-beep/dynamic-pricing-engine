import { NextResponse } from 'next/server'
import type { ZodError } from 'zod'

export interface ApiError {
  error: string
  code: string
  details?: unknown
}

export function badRequest(message: string, details?: unknown): NextResponse<ApiError> {
  return NextResponse.json({ error: message, code: 'BAD_REQUEST', details }, { status: 400 })
}

export function notFound(message = 'Resource not found'): NextResponse<ApiError> {
  return NextResponse.json({ error: message, code: 'NOT_FOUND' }, { status: 404 })
}

export function tooManyRequests(message = 'Rate limit exceeded'): NextResponse<ApiError> {
  return NextResponse.json({ error: message, code: 'RATE_LIMITED' }, { status: 429 })
}

export function serverError(message = 'Internal server error'): NextResponse<ApiError> {
  return NextResponse.json({ error: message, code: 'SERVER_ERROR' }, { status: 500 })
}

export function fromZod(error: ZodError): NextResponse<ApiError> {
  return NextResponse.json(
    {
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: error.flatten().fieldErrors,
    },
    { status: 422 },
  )
}

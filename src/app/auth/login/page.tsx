'use client'
import { Suspense, useState } from 'react'
import { useAuth } from '@/lib/contexts/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '@/lib/contexts/theme-context'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { theme, toggle } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const err = await login(email, password)
    if (err) setError(err)
    else router.push(searchParams.get('redirect') || '/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-wider" style={{ color: 'var(--text)' }}>ELITE</Link>
          <button onClick={toggle} className="p-2 rounded-lg transition-colors hover:bg-white/10" style={{ color: 'var(--text)' }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Welcome back</h1>
          <p className="mt-2" style={{ color: 'var(--text-muted)' }}>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm rounded-lg p-3" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>{error}</p>}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-4 py-3 rounded-xl outline-none transition-colors"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text)', border: '1px solid var(--border)' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-4 py-3 rounded-xl outline-none transition-colors"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text)', border: '1px solid var(--border)' }} />
          <button type="submit" className="w-full py-3 rounded-xl font-semibold transition-all"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
            Sign In
          </button>
        </form>
        <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" style={{ color: 'var(--text)' }} className="underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p style={{ color: 'var(--text-muted)' }}>Loading...</p></div>}><LoginForm /></Suspense>
}
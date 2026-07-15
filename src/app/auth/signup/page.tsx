'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/contexts/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '@/lib/contexts/theme-context'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const router = useRouter()
  const { theme, toggle } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const err = await signup(name, email, password)
    if (err) setError(err)
    else router.push('/')
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
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Create account</h1>
          <p className="mt-2" style={{ color: 'var(--text-muted)' }}>Join ELITE today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm rounded-lg p-3" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>{error}</p>}
          <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required
            className="w-full px-4 py-3 rounded-xl outline-none transition-colors"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text)', border: '1px solid var(--border)' }} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-4 py-3 rounded-xl outline-none transition-colors"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text)', border: '1px solid var(--border)' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-4 py-3 rounded-xl outline-none transition-colors"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text)', border: '1px solid var(--border)' }} />
          <button type="submit" className="w-full py-3 rounded-xl font-semibold transition-all"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
            Create Account
          </button>
        </form>
        <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link href="/auth/login" style={{ color: 'var(--text)' }} className="underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
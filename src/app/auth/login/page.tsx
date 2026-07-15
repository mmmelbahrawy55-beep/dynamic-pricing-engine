'use client'
import { Suspense, useState } from 'react'
import { useAuth } from '@/lib/contexts/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

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
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-zinc-500 mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-400 bg-red-500/10 rounded-lg p-3">{error}</p>}
          <input
            type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/10 focus:border-white/30 outline-none transition-colors"
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-white/10 focus:border-white/30 outline-none transition-colors"
          />
          <button type="submit" className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-zinc-500">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-white underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-zinc-500">Loading...</p></div>}>
      <LoginForm />
    </Suspense>
  )
}
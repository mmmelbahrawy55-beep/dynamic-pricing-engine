'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User { id: string; name: string; email: string }
interface Auth { user: User | null; login: (email: string, password: string) => Promise<string | null>; signup: (name: string, email: string, password: string) => Promise<string | null>; logout: () => void }

const AuthContext = createContext<Auth>({ user: null, login: async () => null, signup: async () => null, logout: () => {} })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const login = async (email: string, password: string): Promise<string | null> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as { name: string; email: string; password: string }[]
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) return 'Invalid email or password'
    const user = { id: crypto.randomUUID(), name: found.name, email: found.email }
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
    return null
  }

  const signup = async (name: string, email: string, password: string): Promise<string | null> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]') as { name: string; email: string; password: string }[]
    if (users.find((u) => u.email === email)) return 'Email already registered'
    users.push({ name, email, password })
    localStorage.setItem('users', JSON.stringify(users))
    const user = { id: crypto.randomUUID(), name, email }
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
    return null
  }

  const logout = () => { setUser(null); localStorage.removeItem('user') }

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
'use client'
import type { ReactNode } from 'react'
import { ScrollReveal } from '../ScrollReveal'
import { useLocale } from '@/lib/contexts/locale-context'

export function SectionHeader({ tag, title, accent, desc }: { tag: string; title: string; accent: string; desc: string }) {
  const { dir } = useLocale()
  return (
    <div className="text-center mb-14 max-w-2xl mx-auto">
      <span className="inline-block text-[10px] tracking-[0.3em] uppercase font-semibold mb-4 px-4 py-1.5 rounded-full"
        style={{ color: 'var(--accent)', background: 'var(--accent-muted)', border: '1px solid var(--border)' }}>
        <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse ml-1.5" style={{ background: 'var(--accent)' }} />
        {tag}
      </span>
      <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] ${dir === 'rtl' ? 'font-sans' : ''}`} style={{ color: 'var(--text)' }}>
        {title}{' '}
        <span className="italic font-serif" style={{ color: 'var(--accent)' }}>{accent}</span>
      </h2>
      <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{desc}</p>
    </div>
  )
}

export function SectionWrapper({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <ScrollReveal>
      <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 ${className}`}>
        {children}
      </section>
    </ScrollReveal>
  )
}
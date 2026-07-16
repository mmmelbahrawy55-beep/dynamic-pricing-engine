'use client'
import { useEffect, useRef } from 'react'
import { useLocale } from '@/lib/contexts/locale-context'

export function Hero() {
  const { t, dir } = useLocale()
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = () => {
      if (!parallaxRef.current) return
      parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" dir={dir}>
      <div ref={parallaxRef} className="absolute inset-0 transition-transform duration-100 ease-out">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--bg) 0%, #0a0a0a 40%, #1a0f0a 70%, var(--bg) 100%)' }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(212,163,115,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(212,163,115,0.04) 0%, transparent 50%)' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase"
          style={{ background: 'var(--accent-muted)', color: 'var(--accent)', border: '1px solid var(--border)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
          {t.hero.badge}
        </div>

        <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-8">
          <span className="block" style={{ color: 'var(--text)' }}>{t.hero.title1}</span>
          <span className={`block italic font-serif font-normal ${dir === 'rtl' ? 'font-sans not-italic' : ''}`} style={{ color: 'var(--accent)' }}>
            {t.hero.title2}
          </span>
          <span className="block" style={{ color: 'var(--text)' }}>{t.hero.title3}</span>
        </h1>

        <p className="text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t.hero.desc}
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a href="#products"
            className="group relative px-8 py-4 rounded-xl font-semibold text-sm tracking-wider uppercase overflow-hidden transition-all duration-300"
            style={{ background: 'var(--accent)', color: '#000' }}>
            <span className="relative z-10">{t.hero.cta}</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, var(--accent-hover), var(--accent))' }} />
          </a>
          <a href="#products"
            className="px-8 py-4 rounded-xl text-sm tracking-wider uppercase font-medium transition-all duration-300 hover:scale-105"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            {t.hero.lookbook}
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 sm:gap-16 mt-16">
          {[t.hero.freeShipping, t.hero.returns, t.hero.premium].map((badge) => (
            <div key={badge} className="text-center">
              <p className="text-xs tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>{badge}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
        <div className="w-[1px] h-8 overflow-hidden" style={{ background: 'var(--border)' }}>
          <div className="w-full h-full animate-[shimmer_2s_ease-in-out_infinite]"
            style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
        </div>
      </div>
    </section>
  )
}
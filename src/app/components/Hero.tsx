'use client'
import { useEffect, useRef } from 'react'
import { useLocale } from '@/lib/contexts/locale-context'
import { useTheme } from '@/lib/contexts/theme-context'

function MarqueeTicker() {
  const items = ['FREE SHIPPING OVER $150', '30-DAY RETURNS', 'HAND-FINISHED QUALITY', 'NEW SUMMER DROP', 'SUSTAINABLE FABRICS', 'LIMITED EDITION']
  return (
    <div className="w-full overflow-hidden py-3" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="marquee-track">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-6 whitespace-nowrap text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  const { t, dir } = useLocale()
  const { theme } = useTheme()
  const parallaxRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = () => {
      if (!parallaxRef.current) return
      const scroll = window.scrollY
      parallaxRef.current.style.transform = `translateY(${scroll * 0.2}px)`
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scroll * 0.1}px)`
        textRef.current.style.opacity = `${1 - scroll / 800}`
      }
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const isDark = theme === 'dark'

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden" dir={dir}>
      {/* Animated background */}
      <div ref={parallaxRef} className="absolute inset-0">
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'linear-gradient(135deg, #000000 0%, #0a0a0a 30%, #1a0f0a 60%, #000000 100%)'
            : 'linear-gradient(135deg, #f8f6f3 0%, #f0ece6 30%, #e8dfd4 60%, #f8f6f3 100%)'
        }} />
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          opacity: isDark ? 0.03 : 0.04,
          backgroundImage: isDark
            ? 'linear-gradient(rgba(212,163,115,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,163,115,0.5) 1px, transparent 1px)'
            : 'linear-gradient(rgba(184,134,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,134,11,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        {/* Radial glows */}
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'radial-gradient(ellipse 800px 600px at 25% 40%, rgba(212,163,115,0.07) 0%, transparent 70%), radial-gradient(ellipse 600px 400px at 75% 60%, rgba(212,163,115,0.04) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 800px 600px at 25% 40%, rgba(184,134,11,0.06) 0%, transparent 70%), radial-gradient(ellipse 600px 400px at 75% 60%, rgba(184,134,11,0.03) 0%, transparent 70%)'
        }} />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase"
          style={{ background: 'var(--accent-muted)', color: 'var(--accent)', border: '1px solid var(--border)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
          {t.hero.badge}
        </div>

        <h1 className="text-7xl sm:text-[8rem] lg:text-[12rem] font-black tracking-tighter leading-[0.8] mb-8">
          <span className="block" style={{ color: 'var(--text)', animation: 'hero-text-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}>
            {t.hero.title1}
          </span>
          <span className={`block italic font-serif font-normal ${dir === 'rtl' ? 'font-sans not-italic' : ''}`}
            style={{
              color: 'var(--accent)',
              animation: 'hero-text-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
              textShadow: isDark ? '0 0 80px rgba(212,163,115,0.3)' : '0 0 80px rgba(184,134,11,0.2)',
            }}>
            {t.hero.title2}
          </span>
          <span className="block" style={{ color: 'var(--text)', animation: 'hero-text-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' }}>
            {t.hero.title3}
          </span>
        </h1>

        <p className="text-base sm:text-lg max-w-xl mx-auto mb-12 leading-relaxed" style={{ color: 'var(--text-secondary)', animation: 'blur-in 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both' }}>
          {t.hero.desc}
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap" style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s both' }}>
          <a href="#products"
            className="group relative px-10 py-4 rounded-xl font-semibold text-sm tracking-wider uppercase overflow-hidden transition-all duration-300 hover:scale-105"
            style={{ background: 'var(--accent)', color: '#000' }}>
            <span className="relative z-10">{t.hero.cta}</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, var(--accent-hover), var(--accent))' }} />
          </a>
          <a href="#products"
            className="px-10 py-4 rounded-xl text-sm tracking-wider uppercase font-medium transition-all duration-300 hover:scale-105"
            style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: isDark ? 'transparent' : 'rgba(255,255,255,0.5)' }}>
            {t.hero.lookbook}
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 sm:gap-16 mt-16" style={{ animation: 'blur-in 1s cubic-bezier(0.16, 1, 0.3, 1) 1.1s both' }}>
          {[t.hero.freeShipping, t.hero.returns, t.hero.premium].map((badge) => (
            <div key={badge} className="text-center">
              <p className="text-xs tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>{badge}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.3s both' }}>
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
        <div className="w-[1px] h-10 overflow-hidden" style={{ background: 'var(--border)' }}>
          <div className="w-full h-full" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)', animation: 'shimmer 2s ease-in-out infinite' }} />
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <MarqueeTicker />
      </div>
    </section>
  )
}
'use client'
import { ScrollReveal } from './ScrollReveal'

export function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--card), var(--bg), var(--card))' }} />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 25% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)`
      }} />
      <ScrollReveal>
        <div className="relative text-center px-4 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-medium tracking-wider mb-6" style={{ color: 'var(--text)' }}>
            PREMIUM FASHION
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6">
            <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
              Define Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-zinc-400 via-white to-zinc-400 bg-clip-text text-transparent">
              Style
            </span>
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed opacity-60" style={{ color: 'var(--text)' }}>
            Premium streetwear crafted for those who refuse to blend in. Bold designs, uncompromising quality.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#products"
              className="px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all"
            >
              Shop Collection
            </a>
            <a
              href="#products"
              className="px-8 py-3.5 rounded-xl text-sm font-medium transition-all hover:bg-white/10"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
            >
              Explore
            </a>
          </div>
        </div>
      </ScrollReveal>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 rounded-full border-2 opacity-30 flex justify-center pt-1.5" style={{ borderColor: 'var(--text)' }}>
          <div className="w-1 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--text)' }} />
        </div>
      </div>
    </section>
  )
}
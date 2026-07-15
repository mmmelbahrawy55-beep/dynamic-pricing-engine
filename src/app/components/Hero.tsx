'use client'
import { ScrollReveal } from './ScrollReveal'

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-card) 50%, var(--bg) 100%)' }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 50%, #fff 0%, transparent 50%)',
      }} />
      <ScrollReveal>
        <div className="relative text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-8 uppercase"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
            Premium Fashion
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
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Premium streetwear crafted for those who refuse to blend in.
            Bold designs, uncompromising quality.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#products"
              className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
              Shop Collection
            </a>
            <a href="#products"
              className="px-8 py-3.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ border: '1px solid var(--border)', color: 'var(--text)' }}>
              Explore
            </a>
          </div>
        </div>
      </ScrollReveal>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 rounded-full flex justify-center pt-1.5" style={{ border: '2px solid var(--border)' }}>
          <div className="w-1 h-2 rounded-full animate-pulse" style={{ background: 'var(--text-muted)' }} />
        </div>
      </div>
    </section>
  )
}
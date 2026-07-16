'use client'
import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let frame = 0
    let animating = true

    const animate = () => {
      if (!animating || !svgRef.current) return
      frame += 0.3
      const paths = svgRef.current.querySelectorAll('path')
      paths.forEach((path, i) => {
        const offset = i * 0.5
        const y = Math.sin((frame + offset) * 0.02) * 15
        const amp = Math.sin((frame + offset) * 0.01) * 10
        const d = `M0,${180 + y} C320,${220 + amp} 640,${120 - amp} 960,${160 + y} C1280,${200 - amp} 1600,${140 + amp} 1920,${180 + y} L1920,320 L0,320 Z`
        path.setAttribute('d', d)
      })
      requestAnimationFrame(animate)
    }

    animate()
    return () => { animating = false }
  }, [])

  return (
    <div className="terrain-ground">
      <svg ref={svgRef} viewBox="0 0 1920 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
        <path d="M0,180 C320,220 640,120 960,160 C1280,200 1600,140 1920,180 L1920,320 L0,320 Z"
          fill="url(#terrain-gradient)" className="terrain-wave" />
        <path d="M0,200 C320,240 640,160 960,200 C1280,240 1600,180 1920,220 L1920,320 L0,320 Z"
          fill="url(#terrain-gradient-2)" className="terrain-wave" style={{ animationDelay: '-2s' }} />
        <defs>
          <linearGradient id="terrain-gradient" x1="0" y1="160" x2="1920" y2="160">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="terrain-gradient-2" x1="0" y1="200" x2="1920" y2="200">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.05" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'var(--accent)',
            opacity: Math.random() * 0.15 + 0.05,
            animation: `float ${Math.random() * 6 + 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}
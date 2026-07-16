'use client'
import { useEffect, useRef, type ReactNode } from 'react'

type Animation = 'up' | 'scale' | 'left' | 'right' | 'blur'

export function ScrollReveal({
  children,
  className = '',
  animation = 'up',
  delay = 0,
  threshold = 0.1,
}: {
  children: ReactNode
  className?: string
  animation?: Animation
  delay?: number
  threshold?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold])

  const classMap: Record<Animation, string> = {
    up: 'scroll-reveal',
    scale: 'scroll-reveal-scale',
    left: 'scroll-reveal-left',
    right: 'scroll-reveal-right',
    blur: 'scroll-reveal-blur',
  }

  return (
    <div ref={ref} className={`${classMap[animation]} ${className}`}>
      {children}
    </div>
  )
}

export function StaggerReveal({
  children,
  className = '',
  threshold = 0.05,
}: {
  children: ReactNode
  className?: string
  threshold?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={`scroll-reveal stagger ${className}`}>
      {children}
    </div>
  )
}
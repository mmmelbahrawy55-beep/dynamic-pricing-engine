'use client'
import { SectionWrapper, SectionHeader } from './SectionHeader'
import { useLocale } from '@/lib/contexts/locale-context'
import { useTheme } from '@/lib/contexts/theme-context'

export function BrandStory({ t }: { t: any }) {
  const { dir } = useLocale()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <SectionWrapper className="!py-0 !max-w-full !px-0">
      <div className="relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div className="absolute inset-0" style={{
          opacity: isDark ? 0.02 : 0.03,
          backgroundImage: isDark
            ? 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            : 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={`space-y-6 ${dir === 'rtl' ? 'lg:order-2' : ''}`}>
              <span className="inline-block text-[10px] tracking-[0.3em] uppercase font-semibold px-4 py-1.5 rounded-full"
                style={{ color: 'var(--accent)', background: 'var(--accent-muted)', border: '1px solid var(--border)' }}>
                {t.tag}
              </span>
              <h2 className={`text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] ${dir === 'rtl' ? 'font-sans' : ''}`} style={{ color: 'var(--text)' }}>
                {t.title}{' '}
                <span className="italic font-serif block" style={{ color: 'var(--accent)' }}>{t.accent}</span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t.desc}</p>
              <button
                className="px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all hover:scale-[1.02]"
                style={{ background: 'var(--accent)', color: '#000' }}>
                {t.cta}
              </button>
            </div>
            <div className={`grid grid-cols-2 gap-4 ${dir === 'rtl' ? 'lg:order-1' : ''}`}>
              {[
                { label: 'Premium Fabrics', value: '100%' },
                { label: 'Hand Finished', value: '95%' },
                { label: 'Sustainable', value: '100%' },
                { label: 'Satisfaction', value: '99%' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl p-6 text-center transition-all hover:-translate-y-0.5"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <p className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--accent)' }}>{stat.value}</p>
                  <p className="text-xs mt-1 tracking-wider" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
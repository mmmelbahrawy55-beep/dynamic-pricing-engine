'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Locale = 'en' | 'ar'

const translations = {
  en: {
    nav: { collection: 'Collection', arrivals: 'New Arrivals', sale: 'Sale', signIn: 'Sign In', signOut: 'Sign Out', dashboard: 'Dashboard', shop: 'Shop' },
    hero: { badge: 'Summer 2026 Collection', title1: 'DEFINE', title2: 'Your', title3: 'EDGE', desc: 'Where raw craftsmanship meets contemporary design. Every piece is forged for those who demand more than the ordinary.', cta: 'Explore Collection', lookbook: 'View Lookbook', freeShipping: 'Free Shipping', returns: '30-Day Returns', premium: 'Premium Quality' },
    sections: {
      featured: { tag: 'The Icons', title: 'Statement', accent: 'Pieces', desc: 'The cornerstone of every wardrobe. Crafted without compromise.' },
      newArrivals: { tag: 'Fresh Drop', title: 'New', accent: 'Arrivals', desc: 'The latest additions to the family. Ready for the spotlight.' },
      bestsellers: { tag: 'Most Wanted', title: 'Best', accent: 'Sellers', desc: 'The pieces everyone is talking about. Join the movement.' },
      hoodies: { tag: 'The Edit', title: 'Hoodie', accent: 'Collection', desc: 'From oversized to cropped. Find your perfect fit.' },
      accessories: { tag: 'Final Touch', title: 'Accessory', accent: 'Edit', desc: 'Complete the look. Details make the difference.' },
      story: { tag: 'Our Ethos', title: 'Crafted for the', accent: 'Bold', desc: 'Born from a passion for raw aesthetics and uncompromising quality. Every stitch tells a story of dedication, every fabric is chosen with intention. ELITE is more than clothing — it is a mindset.', cta: 'Our Story' },
    },
    product: { color: 'Color', size: 'Size', quantity: 'Quantity', addToBag: 'Add to Bag', added: 'Added to Bag', continue: 'Continue Shopping', sizeGuide: 'Size Guide', subtotal: 'Subtotal', checkout: 'Checkout', emptyBag: 'Your bag is empty', emptyHint: 'Add some pieces to get started', shoppingBag: 'Shopping Bag', items: 'items', item: 'item', freeShipping: 'Free shipping on orders over $150' },
    footer: { tag: 'Join the Elite', desc: 'Subscribe for exclusive drops and early access.', subscribe: 'Subscribe', placeholder: 'Enter your email', rights: 'All rights reserved.', brand: 'Redefining contemporary fashion with uncompromising quality and bold design since 2020.' },
    loadMore: 'Show More',
    categories: { all: 'All', hoodies: 'Hoodies', tshirts: 'T-Shirts', jackets: 'Jackets', accessories: 'Accessories' },
  },
  ar: {
    nav: { collection: 'المجموعة', arrivals: 'الجديد', sale: 'التخفيضات', signIn: 'تسجيل دخول', signOut: 'تسجيل خروج', dashboard: 'لوحة التحكم', shop: 'تسوق' },
    hero: { badge: 'مجموعة صيف 2026', title1: 'حدد', title2: 'أناقتك', title3: 'الخاصة', desc: 'حيث تلتقي الحرفية الخام مع التصميم المعاصر. كل قطعة صُممت لأولئك الذين يطالبون بأكثر من المعتاد.', cta: 'استكشف المجموعة', lookbook: 'شاهد الكتالوج', freeShipping: 'شحن مجاني', returns: 'إرجاع 30 يوم', premium: 'جودة عالية' },
    sections: {
      featured: { tag: 'الأيقونات', title: 'قطعة', accent: 'فارقة', desc: 'حجر الزاوية في كل خزانة. مصنوعة بدون تنازلات.' },
      newArrivals: { tag: 'وصل حديثاً', title: 'إصدارات', accent: 'جديدة', desc: 'أحدث الإضافات للعائلة. جاهزة للأضواء.' },
      bestsellers: { tag: 'الأكثر طلباً', title: 'الأكثر', accent: 'مبيعاً', desc: 'القطع التي يتحدث عنها الجميع. انضم إلى الحركة.' },
      hoodies: { tag: 'التشكيلة', title: 'مجموعة', accent: 'الهوديز', desc: 'من الواسع إلى القصير. ابحث عن المقاس المثالي لك.' },
      accessories: { tag: 'اللمسة الأخيرة', title: 'تشكيلة', accent: 'الإكسسوارات', desc: 'أكمل الإطلالة. التفاصيل تصنع الفارق.' },
      story: { tag: 'فلسفتنا', title: 'مصمم لـ', accent: 'الأقوياء', desc: 'وُلدت من شغف بالجماليات الخام والجودة غير القابلة للمساومة. كل غرزة تحكي قصة تفاني، كل قماش يُختار بعناية. ELITE أكثر من مجرد ملابس — إنها عقلية.', cta: 'قصتنا' },
    },
    product: { color: 'اللون', size: 'المقاس', quantity: 'الكمية', addToBag: 'أضف إلى الحقيبة', added: 'تمت الإضافة', continue: 'مواصلة التسوق', sizeGuide: 'دليل المقاسات', subtotal: 'المجموع', checkout: 'إتمام الشراء', emptyBag: 'حقيبتك فارغة', emptyHint: 'أضف بعض القطع للبدء', shoppingBag: 'حقيبة التسوق', items: 'قطع', item: 'قطعة', freeShipping: 'شحن مجاني للطلبات فوق 150 دولار' },
    footer: { tag: 'انضم للنخبة', desc: 'اشترك للحصول على إصدارات حصرية ووصول مبكر.', subscribe: 'اشتراك', placeholder: 'أدخل بريدك الإلكتروني', rights: 'جميع الحقوق محفوظة.', brand: 'نعيد تعريف الموضة المعاصرة بجودة لا مثيل لها وتصميم جريء منذ 2020.' },
    loadMore: 'عرض المزيد',
    categories: { all: 'الكل', hoodies: 'هوديز', tshirts: 'تيشرتات', jackets: 'جواكت', accessories: 'إكسسوارات' },
  },
}

type TranslationKeys = typeof translations.en

const LocaleContext = createContext<{
  locale: Locale
  t: TranslationKeys
  dir: 'ltr' | 'rtl'
  toggle: () => void
}>({ locale: 'en', t: translations.en, dir: 'ltr', toggle: () => {} })

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored) setLocale(stored)
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('locale', locale)
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }, [locale, mounted])

  const toggle = () => setLocale((l) => (l === 'en' ? 'ar' : 'en'))
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  const t = translations[locale]

  return <LocaleContext.Provider value={{ locale, t, dir, toggle }}>{children}</LocaleContext.Provider>
}

export const useLocale = () => useContext(LocaleContext)
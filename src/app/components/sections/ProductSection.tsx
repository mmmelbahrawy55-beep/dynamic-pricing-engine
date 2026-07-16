'use client'
import type { Product } from '@/lib/store-data'
import { SectionWrapper, SectionHeader } from './SectionHeader'
import { SectionGrid } from './SectionGrid'

export function ProductSection({
  products,
  tag,
  title,
  accent,
  desc,
  filter,
  limit = 4,
}: {
  products: Product[]
  tag: string
  title: string
  accent: string
  desc: string
  filter?: (p: Product) => boolean
  limit?: number
}) {
  const filtered = filter ? products.filter(filter) : products
  return (
    <SectionWrapper>
      <SectionHeader tag={tag} title={title} accent={accent} desc={desc} />
      <SectionGrid products={filtered} visible={limit} />
    </SectionWrapper>
  )
}
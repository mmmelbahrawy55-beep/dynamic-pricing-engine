export interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  description: string
  images: string[]
  sizes: string[]
  colors: { name: string; hex: string }[]
  featured: boolean
  badge?: string
}

export const categories = [
  { id: 'all', name: 'All', label: 'كل المنتجات' },
  { id: 'hoodies', name: 'Hoodies', label: 'هوديز' },
  { id: 't-shirts', name: 'T-Shirts', label: 'تيشرتات' },
  { id: 'jackets', name: 'Jackets', label: 'جواكت' },
  { id: 'accessories', name: 'Accessories', label: 'إكسسوارات' },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Oversized Premium Hoodie',
    category: 'hoodies',
    price: 89.99,
    originalPrice: 129.99,
    description: 'Ultra-comfortable oversized fit hoodie crafted from heavyweight 400GSM cotton fleece. Dropped shoulders, ribbed cuffs, and a kangaroo pocket complete the look.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Black', hex: '#0a0a0a' }, { name: 'Cream', hex: '#f5f0e8' }, { name: 'Olive', hex: '#4a5d4e' }],
    featured: true,
    badge: 'Sale',
  },
  {
    id: '2',
    name: 'Classic Fit Heavyweight Tee',
    category: 't-shirts',
    price: 39.99,
    description: 'Essential heavyweight t-shirt made from 260GSM organic cotton. Relaxed fit with a reinforced neckline. Pre-shrunk for lasting fit.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'White', hex: '#ffffff' }, { name: 'Black', hex: '#0a0a0a' }, { name: 'Grey', hex: '#6b7280' }],
    featured: true,
  },
  {
    id: '3',
    name: 'Vintage Wash Denim Jacket',
    category: 'jackets',
    price: 149.99,
    originalPrice: 199.99,
    description: 'Vintage-inspired denim jacket with a modern slim fit. Distressed details, corduroy collar, and brass hardware. A timeless layering piece.',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Indigo', hex: '#1a365d' }, { name: 'Black', hex: '#0a0a0a' }],
    featured: true,
    badge: 'Best Seller',
  },
  {
    id: '4',
    name: 'Minimalist Leather Crossbody',
    category: 'accessories',
    price: 59.99,
    description: 'Sleek minimalist crossbody bag in full-grain leather. Adjustable strap, multiple compartments, and a magnetic closure. Fits all essentials.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
    ],
    sizes: ['One Size'],
    colors: [{ name: 'Tan', hex: '#d4a574' }, { name: 'Black', hex: '#0a0a0a' }],
    featured: true,
  },
  {
    id: '5',
    name: 'Boxy Fit Graphic Tee',
    category: 't-shirts',
    price: 44.99,
    description: 'Bold graphic tee with a boxy, cropped fit. Screen-printed artwork on heavyweight 280GSM fabric. A statement piece for any wardrobe.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Black', hex: '#0a0a0a' }, { name: 'Navy', hex: '#1e3a5f' }],
    featured: false,
  },
  {
    id: '6',
    name: 'Wool Blend Overcoat',
    category: 'jackets',
    price: 249.99,
    description: 'Luxurious wool-blend overcoat with a tailored fit. Notch lapels, double-breasted closure, and a satin lining. Peak sophistication.',
    images: [
      'https://images.unsplash.com/photo-1539533113208-f6dbc8c74bc1?w=800',
      'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Camel', hex: '#c19a6b' }, { name: 'Charcoal', hex: '#36454f' }],
    featured: false,
    badge: 'New',
  },
  {
    id: '7',
    name: 'Relaxed Fleece Sweatpants',
    category: 'hoodies',
    price: 69.99,
    description: 'Ultra-soft fleece sweatpants with a relaxed straight-leg fit. Elastic waistband with drawstring, side pockets, and ribbed cuffs.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
      'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Grey', hex: '#6b7280' }, { name: 'Black', hex: '#0a0a0a' }, { name: 'Green', hex: '#2f4f2f' }],
    featured: false,
  },
  {
    id: '8',
    name: 'Signature Logo Cap',
    category: 'accessories',
    price: 34.99,
    description: 'Structured 6-panel cap with embroidered logo. Adjustable snapback closure, pre-curved brim, and breathable eyelets.',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800',
    ],
    sizes: ['One Size'],
    colors: [{ name: 'Black', hex: '#0a0a0a' }, { name: 'White', hex: '#ffffff' }, { name: 'Red', hex: '#991b1b' }],
    featured: false,
  },
  {
    id: '9',
    name: 'Cropped Zip-Up Hoodie',
    category: 'hoodies',
    price: 79.99,
    description: 'Cropped zip-up hoodie in heavyweight fleece. Oversized fit with a shorter hem, dropped shoulders, and a chunky zipper.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [{ name: 'Black', hex: '#0a0a0a' }, { name: 'Pink', hex: '#d4858f' }],
    featured: false,
    badge: 'Trending',
  },
  {
    id: '10',
    name: 'Linen Blend Relaxed Shirt',
    category: 't-shirts',
    price: 54.99,
    description: 'Breathable linen-blend shirt perfect for warm days. Relaxed fit with a camp collar, chest pocket, and mother-of-pearl buttons.',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'White', hex: '#ffffff' }, { name: 'Blue Stripe', hex: '#3b5998' }],
    featured: false,
  },
  {
    id: '11',
    name: 'Tech Pack — Utility Vest',
    category: 'jackets',
    price: 129.99,
    description: 'Modern utility vest with technical fabric and multiple pockets. Lightweight, water-resistant, and perfect for layering.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Olive', hex: '#4a5d4e' }, { name: 'Black', hex: '#0a0a0a' }],
    featured: false,
    badge: 'New',
  },
  {
    id: '12',
    name: 'Wool Beanie & Scarf Set',
    category: 'accessories',
    price: 44.99,
    originalPrice: 59.99,
    description: 'Premium wool beanie and scarf set. Ribbed knit beanie with matching fringed scarf. Keeps you warm in style.',
    images: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800',
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c2?w=800',
    ],
    sizes: ['One Size'],
    colors: [{ name: 'Charcoal', hex: '#36454f' }, { name: 'Cream', hex: '#f5f0e8' }],
    featured: false,
  },
]

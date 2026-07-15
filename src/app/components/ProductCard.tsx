import { useState } from 'react'
import type { Product } from '@/lib/store-data'

export default function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product, size: string, color: string) => void }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedColor, setSelectedColor] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div className="group bg-dark-900/50 rounded-xl border border-dark-800 overflow-hidden hover:border-dark-600 transition-all duration-500">
      <div className="relative aspect-[3/4] overflow-hidden bg-dark-800">
        {!imgLoaded && <div className="absolute inset-0 bg-dark-800 animate-pulse" />}
        <img
          src={product.images[0]}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {product.badge && (
          <span className="absolute top-2 left-2 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-white text-dark-950 rounded">
            {product.badge}
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-2 right-2 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-red-500 text-white rounded">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      <div className="p-3 md:p-4">
        <p className="text-xs text-dark-400 uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="text-sm font-medium text-white truncate">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-white">${product.price}</span>
          {product.originalPrice && <span className="text-xs text-dark-500 line-through">${product.originalPrice}</span>}
        </div>

        <div className="flex gap-1.5 mt-2">
          {product.colors.map((c, i) => (
            <button key={c.name} onClick={() => setSelectedColor(i)}
              className={`w-4 h-4 rounded-full border-2 transition-all ${selectedColor === i ? 'border-white scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: c.hex }} title={c.name} />
          ))}
        </div>

        <div className="flex gap-1.5 mt-2">
          {product.sizes.slice(0, 4).map((s) => (
            <button key={s} onClick={() => setSelectedSize(s)}
              className={`px-2 py-0.5 text-[10px] rounded border transition-colors ${selectedSize === s ? 'bg-white text-dark-950 border-white' : 'border-dark-700 text-dark-400 hover:border-dark-500'}`}>
              {s}
            </button>
          ))}
        </div>

        <button onClick={() => onAddToCart(product, selectedSize, product.colors[selectedColor].name)}
          className="w-full mt-3 py-2 text-xs font-semibold tracking-wider uppercase bg-white text-dark-950 rounded-lg hover:bg-dark-100 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  )
}
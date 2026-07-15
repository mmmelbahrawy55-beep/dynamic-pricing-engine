import type { Product } from '@/lib/store-data'

interface CartItem { product: Product; size: string; color: string; quantity: number }

export default function CartDrawer({ open, onClose, cart, onUpdateQty, total }: {
  open: boolean; onClose: () => void; cart: CartItem[]; onUpdateQty: (i: number, q: number) => void; total: number
}) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-dark-950 border-l border-dark-800 z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-dark-800">
          <h2 className="text-lg font-semibold text-white">Cart ({cart.length})</h2>
          <button onClick={onClose} className="p-2 text-dark-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100% - 140px)' }}>
          {cart.length === 0 ? (
            <p className="text-dark-500 text-sm text-center mt-8">Your cart is empty</p>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex gap-3 bg-dark-900 rounded-lg p-3 border border-dark-800">
                <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-20 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{item.product.name}</p>
                  <p className="text-xs text-dark-400">{item.size} · {item.color}</p>
                  <p className="text-sm font-semibold text-white mt-1">${item.product.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => onUpdateQty(i, item.quantity - 1)} className="w-6 h-6 rounded border border-dark-700 text-dark-400 hover:text-white text-xs">−</button>
                    <span className="text-sm text-white w-6 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(i, item.quantity + 1)} className="w-6 h-6 rounded border border-dark-700 text-dark-400 hover:text-white text-xs">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-800 bg-dark-950">
          <div className="flex justify-between items-center mb-3">
            <span className="text-dark-400 text-sm">Total</span>
            <span className="text-lg font-bold text-white">${total.toFixed(2)}</span>
          </div>
          <button className="w-full py-3 text-sm font-semibold tracking-wider uppercase bg-white text-dark-950 rounded-lg hover:bg-dark-100 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </>
  )
}
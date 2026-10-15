import React, { useState, useEffect } from 'react';
import { useBrand } from '../../context/BrandContext';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, cartCount, cartTotal, formatPrice } = useBrand();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#cart') {
        setIsOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const closeCart = () => {
    setIsOpen(false);
    if (window.location.hash === '#cart') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-300"
      onClick={closeCart}
    >
      <div
        className="w-full max-w-md bg-stage-surface text-ink-primary h-full shadow-2xl border-l border-hairline flex flex-col justify-between p-6 sm:p-8 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-hairline mb-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-metal-primary" />
              <h2 className="font-display text-2xl text-ink-primary font-normal">
                Acquisition Portfolio
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-ink-muted hover:text-ink-primary rounded-full hover:bg-stage-sunken transition-colors"
              aria-label="Close Portfolio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          {cart.length === 0 ? (
            <div className="py-16 text-center text-ink-muted">
              <p className="text-sm font-body mb-4">Your acquisition portfolio is currently empty.</p>
              <button
                onClick={closeCart}
                className="text-xs uppercase tracking-widest font-mono text-metal-primary hover:underline"
              >
                Browse Master Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 bg-stage-sunken/50 border border-hairline rounded-sm items-center"
                >
                  <div className="w-16 h-20 bg-stage-sunken rounded-sm overflow-hidden shrink-0 border border-hairline">
                    <img
                      src={item.product.media.hero}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm text-ink-primary truncate">
                      {item.product.name}
                    </h3>
                    <span className="text-[10px] font-mono text-ink-muted block uppercase">
                      {item.product.specs.metal} · {item.product.specs.carat}
                    </span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium font-body text-ink-primary">
                        {formatPrice(item.product.price)}
                      </span>
                      <span className="text-xs text-ink-muted font-mono">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-ink-muted hover:text-red-500 transition-colors"
                    title="Remove from portfolio"
                    aria-label={`Remove ${item.product.name} from portfolio`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        <div className="pt-6 border-t border-hairline">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">
              Portfolio Total
            </span>
            <span className="font-display text-2xl text-ink-primary">
              {formatPrice({ amount: cartTotal, currency: 'USD' })}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-ink-muted mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-metal-primary shrink-0" />
            <span>Includes White-Glove Armored Courier & GIA Registry Dossier</span>
          </div>

          <button
            onClick={() => alert(`Portfolio Acquisition Initiated for ${formatPrice({ amount: cartTotal, currency: 'USD' })}. A private concierge has been assigned.`)}
            disabled={cart.length === 0}
            className="w-full py-4 rounded-full bg-ink-primary text-stage-surface hover:bg-metal-primary hover:text-black font-body text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Proceed to Private Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

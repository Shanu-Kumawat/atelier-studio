import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, VerticalType } from '../data/types';
import { PRODUCTS, VERTICAL_TAXONOMIES } from '../data/products';

export type SiteView = 'site-a' | 'site-b' | 'site-c';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface BrandContextType {
  brandName: string;
  setBrandName: (name: string) => void;
  vertical: VerticalType;
  setVertical: (v: VerticalType) => void;
  currentSite: SiteView;
  setCurrentSite: (site: SiteView) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  cartCount: number;
  cartTotal: number;
  activePdpProduct: Product | null;
  openPdp: (product: Product) => void;
  closePdp: () => void;
  formatPrice: (price: { amount: number; currency: 'USD' }) => string;
  replaceTokens: (text: string) => string;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brandName, setBrandName] = useState<string>('MAISON VENDÔME');
  const [vertical, setVertical] = useState<VerticalType>('jewelry');
  const [currentSite, setCurrentSite] = useState<SiteView>('site-a');
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
  ]);
  const [activePdpProduct, setActivePdpProduct] = useState<Product | null>(null);

  // Sync stage data attribute on body/html based on current site
  useEffect(() => {
    const isLightStage = currentSite === 'site-a';
    document.documentElement.setAttribute('data-stage', isLightStage ? 'light' : 'dark');
    document.body.className = isLightStage
      ? 'bg-stage-base text-text-primary antialiased selection:bg-metal-primary selection:text-stage-surface'
      : 'bg-stage-base text-text-primary antialiased selection:bg-metal-primary selection:text-stage-base';
  }, [currentSite]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price.amount * item.quantity, 0);

  const openPdp = (product: Product) => {
    setActivePdpProduct(product);
  };

  const closePdp = () => {
    setActivePdpProduct(null);
  };

  const formatPrice = (price: { amount: number; currency: 'USD' }) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      maximumFractionDigits: 0,
    }).format(price.amount);
  };

  const replaceTokens = (text: string) => {
    return text.replace(/\{\{BRAND\}\}/g, brandName);
  };

  return (
    <BrandContext.Provider
      value={{
        brandName,
        setBrandName,
        vertical,
        setVertical,
        currentSite,
        setCurrentSite,
        cart,
        addToCart,
        removeFromCart,
        cartCount,
        cartTotal,
        activePdpProduct,
        openPdp,
        closePdp,
        formatPrice,
        replaceTokens,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

/**
 * Section 3: Data Model — The Unified Product Record
 * Spine of the system. Designed to survive vertical change without refactoring.
 */

export type Specs = {
  carat: string;          // e.g. "1.20ct"
  metal: string;          // e.g. "18K Yellow Gold"
  setting: string;        // e.g. "Six-Prong Solitaire"
  certificate: string;    // e.g. "GIA Certified"
};

export type Product = {
  id: string;
  category: string;              // L1: Rings | Necklaces | Earrings | High Jewelry
  subcategory: string;           // L2: Solitaire | Eternity | Tennis | Chandelier
  name: string;
  story: string;                 // 40-60 words, editorial voice
  price: { amount: number; currency: 'USD' };
  compareAt?: { amount: number; currency: 'USD' };
  media: {
    cutout: string;              // transparent PNG, 1:1 — grid + collection switcher
    hero: string;                // 3:4 — PDP primary
    gallery: string[];           // 3:4 and 4:5 — lightbox
  };
  specs: Specs;                  // → the 2x2 detail grid
  collectionId: string;
};

export type Collection = {
  id: string;
  number: string;
  name: string;
  headline: string;
  description: string;
  heroProduct: Product;
  bgColor: string;               // Deep tone for background morphing
  accentHex: string;
};

export type VerticalType = 'jewelry' | 'couture';

export interface VerticalTaxonomy {
  id: VerticalType;
  label: string;
  categories: {
    l1: string;
    l2: string[];
  }[];
}

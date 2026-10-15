import { Collection } from './types';
import { PRODUCTS } from './products';

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-01',
    number: '01',
    name: 'Symphonie Solaire',
    headline: 'Undulating Solar Ribbons in 18K Antique Gold',
    description: 'Sculpted in pure eighteen-karat warm yellow gold, Symphonie Solaire investigates celestial fluidity. Each piece captures kinetic warmth through hand-beveled contours and hidden micro-pavé settings that only reveal themselves under raking directional light.',
    heroProduct: PRODUCTS[0],
    bgColor: '#0C0A06',
    accentHex: '#D4A017',
  },
  {
    id: 'col-02',
    number: '02',
    name: 'Géométrie Céleste',
    headline: 'Architectural Tensile Links & Micro Pavé',
    description: 'A study in Parisian architectural tension. Hand-calibrated links interlock with mathematical precision, devoid of solder seams or visible joints. The collection balances masculine chain heft with feminine diamond-cut cable transitions.',
    heroProduct: PRODUCTS[2],
    bgColor: '#08080A',
    accentHex: '#C8A45C',
  },
  {
    id: 'col-03',
    number: '03',
    name: 'Cascade d’Étoiles',
    headline: 'Haute Joaillerie Articulated Diamond Drops',
    description: 'Articulated brilliant-cut diamonds engineered to float across the skin with absolute weightlessness. Hand-set micro-wire mounts eliminate metal shadows, releasing crystalline brilliance calibrated to low-key candlelit environments.',
    heroProduct: PRODUCTS[6],
    bgColor: '#0A080A',
    accentHex: '#FDE68A',
  },
  {
    id: 'col-04',
    number: '04',
    name: 'Palais Brutaliste',
    headline: 'Monolithic Heavy-Gauge Statement Forms',
    description: 'Drawing inspiration from Hôtel de Ville brutalist monuments, this capsule collection embraces volumetric mass and negative void geometry. Mirror finishes contrast against rough chisel textures in unlacquered champagne gold.',
    heroProduct: PRODUCTS[5],
    bgColor: '#070908',
    accentHex: '#D4A017',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-01',
    title: 'Coco Twist Macro Solitaire',
    aspect: '3:4',
    img: '/assets/b-gallery-01.webp',
    caption: '18K Yellow Gold with 1.20ct VS1 pavé ribbon band',
  },
  {
    id: 'gal-02',
    title: 'Étoile Cascade Diamond Suite',
    aspect: '4:5',
    img: '/assets/b-gallery-02.webp',
    caption: 'Haute Joaillerie articulated chandelier drops in micro-wire prongs',
  },
  {
    id: 'gal-03',
    title: 'Sovereign Curb Link Precision',
    aspect: '3:4',
    img: '/assets/b-gallery-03.webp',
    caption: 'Hand-beveled hollow links with invisible tension closure',
  },
  {
    id: 'gal-04',
    title: 'Aurelia Sculptural Satin Hoops',
    aspect: '4:5',
    img: '/assets/b-gallery-04.webp',
    caption: '18K satin-brushed gold with flush bezel diamond accents',
  },
  {
    id: 'gal-05',
    title: 'Palais Brutalist Negative Space',
    aspect: '3:4',
    img: '/assets/b-gallery-05.webp',
    caption: 'Monolithic open-work geometric frame in antique warm gold',
  },
];

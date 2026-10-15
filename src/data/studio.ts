export interface FeatureCell {
  id: string;
  number: string;
  title: string;
  desc: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
  subtext: string;
}

export interface StudioPricingTier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  featured?: boolean;
  features: string[];
  cta: string;
}

export const TRUST_CLIENTS = [
  { name: 'MAISON VENDÔME', city: 'Paris' },
  { name: 'ATELIER ÉCLAT', city: 'Geneva' },
  { name: 'KAUFMANN & SÖHNE', city: 'Zürich' },
  { name: 'DE LA ROCHE', city: 'Monaco' },
  { name: 'AURUM NEW YORK', city: 'New York' },
];

export const FEATURES: FeatureCell[] = [
  {
    id: 'feat-01',
    number: '01',
    title: 'Catalogue Generation',
    desc: 'Transform raw engineering CAD or iPhone photos into photorealistic 3:4 studio sweep renders. Physically accurate metal refraction and zero chromatic distortion.',
  },
  {
    id: 'feat-02',
    number: '02',
    title: 'Ad Creative Synthesis',
    desc: 'Editorial campaign spreads crafted in dramatic low-key raking light. Perfectly proportioned 16:9 hero headers, 4:5 vertical reels, and 1:1 feed tiles.',
  },
  {
    id: 'feat-03',
    number: '03',
    title: 'Variant Testing Engine',
    desc: 'Switch pedestals, drape backgrounds, and lighting color temperatures instantly. Test Black Silk against Charcoal Slate and Hand-Worn contextual sets.',
  },
  {
    id: 'feat-04',
    number: '04',
    title: 'Brand Consistency Matrix',
    desc: 'Locked prompt physics guarantee identical antique gold alloys and champagne highlights across hundreds of SKUs without color temperature drift.',
  },
  {
    id: 'feat-05',
    number: '05',
    title: 'Bulk Export Pipeline',
    desc: 'Automated 2× retina WebP, 300 DPI CMYK print TIFFs, and alpha-clean transparent PNG-32 cutouts that blend without halos on both dark and light stages.',
  },
  {
    id: 'feat-06',
    number: '06',
    title: 'Channel-Ready Formats',
    desc: 'Single-click generation for Meta Ads Manager, Google Shopping feeds, Pinterest collections, and interactive wholesale line-sheets.',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Brief Intake',
    desc: 'Upload reference pieces, stone specifications, target collection story, and brand metal guidelines.',
    subtext: 'Asset intake form & CAD ingest',
  },
  {
    step: '02',
    title: 'Product Data Ingestion',
    desc: 'Normalize specs into the unified schema: Carat, Metal alloy, Setting, and GIA certification records.',
    subtext: 'Vertical-agnostic schema validation',
  },
  {
    step: '03',
    title: 'Image Generation',
    desc: 'Inject locked RIG-STUDIO-CG or RIG-EDITORIAL prompt matrices with strict negative control blocks.',
    subtext: 'Physics-accurate metal raytracing',
  },
  {
    step: '04',
    title: 'Catalogue Staging',
    desc: 'Deploy seamless light stage storefronts with hover zoom wells and wheel-hijacked horizontal browse rails.',
    subtext: 'Site A light stage compilation',
  },
  {
    step: '05',
    title: 'Campaign Ad Suites',
    desc: 'Render high-contrast dark stage lookbooks with Lenis-pinned scroll runways and interactive spec grids.',
    subtext: 'Site B editorial deployment',
  },
  {
    step: '06',
    title: 'Omnichannel Export',
    desc: 'Deliver print-ready 300 DPI lookbooks, high-speed WebP bundles, and calibrated social ad creative.',
    subtext: 'Full commercial copyright buyout',
  },
];

export const STUDIO_STATS = [
  { value: '4×', label: 'Catalogue Turnaround', detail: 'From 6 weeks to 48 hours' },
  { value: '120+', label: 'SKUs Per Batch', detail: 'Unwavering gold tone consistency' },
  { value: '30+', label: 'Ad Variants', detail: 'Multiple crops & backdrop angles' },
  { value: '3', label: 'Ecosystem Channels', detail: 'Storefront, Editorial, Paid Ads' },
];

export const STUDIO_PRICING: StudioPricingTier[] = [
  {
    id: 'tier-pilot',
    name: 'Flagship Pilot',
    subtitle: 'For launching or testing your iconic hero piece',
    price: '$2,400',
    period: 'per collection (up to 5 SKUs)',
    features: [
      '5 Master SKUs rendered under RIG-STUDIO-CG',
      '15 Editorial ad stills (16:9, 4:5, 1:1)',
      '1:1 Transparent PNG-32 cutouts verified for dark & light stages',
      'Unified 2×2 detail spec grid integration',
      'Full commercial rights buyout & raw WebP delivery',
      '48-hour delivery timeline',
    ],
    cta: 'Commission Pilot',
  },
  {
    id: 'tier-atelier',
    name: 'Atelier Seasonal',
    subtitle: 'The complete seasonal launch architecture',
    price: '$6,800',
    period: 'per seasonal drop (up to 20 SKUs)',
    featured: true,
    features: [
      '20 Master SKUs with complete multi-angle gallery renders',
      '60 Multi-channel campaign ad variants with copy testing',
      'Interactive Site A Storefront + Site B Editorial Collection',
      'Custom gold alloy lock (18K Yellow, Rose, Champagne, or White)',
      'Wholesale digital line-sheet & interactive PDF lookbook',
      'Dedicated art director & 2 revision cycles',
      'Priority 72-hour turnaround',
    ],
    cta: 'Initiate Atelier Drop',
  },
  {
    id: 'tier-maison',
    name: 'Maison Enterprise',
    subtitle: 'Continuous luxury drops and omnichannel ad pipelines',
    price: '$14,500',
    period: 'monthly retainer (unlimited SKUs)',
    features: [
      'Unlimited SKU throughput across seasonal capsules',
      'Instant Phase 2 vertical swap (Jewelry to Couture / Accessories)',
      'Custom fine-tuned lighting presets matching your brand heritage',
      'Dedicated Slack pipeline with direct prompt engineer access',
      'Weekly automated Meta / TikTok ad variant drops',
      'Raw layered PSDs + 300 DPI CMYK print certification',
      'Custom headless CMS or Shopify Hydrogen API connector',
    ],
    cta: 'Engage Enterprise',
  },
];

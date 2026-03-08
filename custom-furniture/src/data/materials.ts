import type { Material } from '../types';

// Note: For GitHub Pages, assets must include the repo base path at runtime.
// We build URLs relative to import.meta.env.BASE_URL so they work locally and on Pages.
const base = import.meta.env.BASE_URL;

export const MATERIALS: Material[] = [
  {
    id: 'oak-natural',
    name: 'Oak  Natural',
    category: 'wood',
    imageUrl: `${base}materials/oak-natural.svg`,
    properties: {
      durability: 'high',
      priceTier: 2,
      notes: 'Warm tone, good for tabletops.',
    },
  },
  {
    id: 'walnut-dark',
    name: 'Walnut  Dark',
    category: 'wood',
    imageUrl: `${base}materials/walnut-dark.svg`,
    properties: {
      durability: 'high',
      priceTier: 3,
      notes: 'Rich, deep tone; premium look.',
    },
  },
  {
    id: 'steel-brushed',
    name: 'Steel  Brushed',
    category: 'metal',
    imageUrl: `${base}materials/steel-brushed.svg`,
    properties: {
      durability: 'high',
      priceTier: 2,
      notes: 'Good for legs / frames.',
    },
  },
];

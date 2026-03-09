import type { Material } from '../types';

const base = import.meta.env.BASE_URL;

export const MATERIALS: Material[] = [
  {
    id: 'oak-natural',
    name: 'Natural Oak',
    category: 'wood',
    imageUrl: `${base}images/materials/oak-natural.jpg`,
    properties: {
      durability: 'high',
      priceTier: 2,
      notes: 'Warm golden tones, excellent for tabletops and shelving.',
    },
  },
  {
    id: 'walnut-dark',
    name: 'Dark Walnut',
    category: 'wood',
    imageUrl: `${base}images/materials/walnut-dark.jpg`,
    properties: {
      durability: 'high',
      priceTier: 3,
      notes: 'Rich chocolate brown with beautiful grain patterns.',
    },
  },
  {
    id: 'steel-brushed',
    name: 'Brushed Steel',
    category: 'metal',
    imageUrl: `${base}images/materials/steel-brushed.jpg`,
    properties: {
      durability: 'high',
      priceTier: 2,
      notes: 'Modern industrial look, ideal for frames and legs.',
    },
  },
  {
    id: 'marble-white',
    name: 'White Marble',
    category: 'stone',
    imageUrl: `${base}images/materials/marble-white.jpg`,
    properties: {
      durability: 'medium',
      priceTier: 3,
      notes: 'Luxurious natural stone with unique veining patterns.',
    },
  },
  {
    id: 'leather-black',
    name: 'Black Leather',
    category: 'fabric',
    imageUrl: `${base}images/materials/leather-black.jpg`,
    properties: {
      durability: 'high',
      priceTier: 3,
      notes: 'Premium full-grain leather for upholstery and accents.',
    },
  },
  {
    id: 'brass-polished',
    name: 'Polished Brass',
    category: 'metal',
    imageUrl: `${base}images/materials/brass-polished.jpg`,
    properties: {
      durability: 'medium',
      priceTier: 3,
      notes: 'Warm metallic finish, perfect for hardware and accents.',
    },
  },
];

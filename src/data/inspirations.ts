import type { InspirationExample } from '../types';

const base = import.meta.env.BASE_URL;

export const INSPIRATIONS: InspirationExample[] = [
  {
    id: 'modern-desk',
    title: 'Modern Floating Desk',
    description: 'Clean lines with wall-mounted design, perfect for home offices.',
    tags: ['desk', 'modern', 'wall-mounted', 'minimal'],
    heroImageUrl: `${base}images/inspirations/modern-desk.jpg`,
    defaultPrompt: 'Modern floating desk with clean lines, integrated cable management, and minimalist aesthetic.',
    suggestedMaterialIds: ['oak-natural', 'steel-brushed'],
  },
  {
    id: 'coffee-table',
    title: 'Scandinavian Coffee Table',
    description: 'Rounded edges with warm wood tones and tapered legs.',
    tags: ['table', 'scandinavian', 'living-room', 'rounded'],
    heroImageUrl: `${base}images/inspirations/coffee-table.jpg`,
    defaultPrompt: 'Scandinavian style coffee table with rounded corners, tapered wooden legs, and warm oak finish.',
    suggestedMaterialIds: ['walnut-dark', 'brass-polished'],
  },
  {
    id: 'bookshelf',
    title: 'Industrial Bookshelf',
    description: 'Open shelving with metal frame and reclaimed wood.',
    tags: ['storage', 'industrial', 'bookshelf', 'open'],
    heroImageUrl: `${base}images/inspirations/bookshelf.jpg`,
    defaultPrompt: 'Industrial style open bookshelf with black metal frame and natural wood shelves.',
    suggestedMaterialIds: ['steel-brushed', 'oak-natural'],
  },
  {
    id: 'dining-table',
    title: 'Farmhouse Dining Table',
    description: 'Solid wood construction with rustic charm, seats 6-8.',
    tags: ['table', 'dining', 'farmhouse', 'rustic'],
    heroImageUrl: `${base}images/inspirations/dining-table.jpg`,
    defaultPrompt: 'Farmhouse dining table with solid wood top, trestle base, and natural wood grain.',
    suggestedMaterialIds: ['walnut-dark', 'oak-natural'],
  },
  {
    id: 'console-table',
    title: 'Mid-Century Console',
    description: 'Elegant entryway piece with storage and display.',
    tags: ['console', 'mid-century', 'entryway', 'storage'],
    heroImageUrl: `${base}images/inspirations/console-table.jpg`,
    defaultPrompt: 'Mid-century modern console table with tapered legs, two drawers, and walnut finish.',
    suggestedMaterialIds: ['walnut-dark', 'brass-polished'],
  },
  {
    id: 'side-table',
    title: 'Marble Side Table',
    description: 'Luxurious accent table with marble top and brass base.',
    tags: ['table', 'accent', 'marble', 'luxury'],
    heroImageUrl: `${base}images/inspirations/side-table.jpg`,
    defaultPrompt: 'Elegant side table with white marble top and polished brass geometric base.',
    suggestedMaterialIds: ['marble-white', 'brass-polished'],
  },
];

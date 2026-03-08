import type { InspirationExample } from '../types';

const base = import.meta.env.BASE_URL;

export const INSPIRATIONS: InspirationExample[] = [
  {
    id: 'minimal-desk-01',
    title: 'Minimal floating desk',
    description: 'Slim profile with hidden brackets.',
    tags: ['desk', 'minimal', 'wall-mounted'],
    heroImageUrl: `${base}inspirations/minimal-desk-01.svg`,
    defaultPrompt: 'Slim floating desk with hidden cable management.',
    suggestedMaterialIds: ['oak-natural', 'steel-brushed'],
  },
  {
    id: 'coffee-table-01',
    title: 'Rounded coffee table',
    description: 'Soft edges, sturdy central base.',
    tags: ['table', 'rounded', 'living-room'],
    heroImageUrl: `${base}inspirations/coffee-table-01.svg`,
    defaultPrompt: 'Rounded coffee table with chamfered edge and sturdy base.',
    suggestedMaterialIds: ['walnut-dark'],
  },
];

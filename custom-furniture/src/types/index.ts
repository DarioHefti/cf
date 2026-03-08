export type Material = {
  id: string;
  name: string;
  category: 'wood' | 'metal' | 'stone' | 'fabric' | 'other';
  imageUrl: string;
  properties: {
    durability: 'low' | 'medium' | 'high';
    priceTier: 1 | 2 | 3;
    notes?: string;
  };
};

export type InspirationExample = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  heroImageUrl: string;
  defaultPrompt: string;
  suggestedMaterialIds: string[];
};

export type Message = {
  id: string;
  role: 'user' | 'system';
  text: string;
  createdAt: number;
};

export type ConceptVersion = {
  id: string;
  parentVersionId?: string;
  promptText: string;
  outputImageUrl: string;
  createdAt: number;
};

export type ThreeDAsset = {
  id: string;
  modelUrl: string;
  previewImageUrl: string;
  status: 'processing' | 'ready' | 'error';
};

export type ProjectState = {
  id: string;
  title: string;
  messages: Message[];
  conceptVersions: ConceptVersion[];
  selectedVersionId?: string;
  selectedMaterials: string[];
  threeDAsset?: ThreeDAsset;
};

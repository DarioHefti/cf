import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import type { ConceptVersion, Message, ProjectState, ThreeDAsset } from '../types';
import { hitem3DService, nanoBananProService } from '../services';

export type WorkflowStep = 1 | 2 | 3;

interface ProjectStore {
  project: ProjectState;
  isProcessing: boolean;
  currentStep: WorkflowStep;
  setStep: (step: WorkflowStep) => void;
  sendUserMessage: (text: string) => Promise<void>;
  selectVersion: (id: string) => void;
  generate3D: () => Promise<void>;
  seedFromInspiration: (params: {
    title: string;
    prompt: string;
    imageUrl: string;
    suggestedMaterialIds: string[];
  }) => void;
  seedFromUpload: (imageDataUrl: string) => void;
  toggleMaterial: (id: string) => void;
  reset: () => void;
}

const initialProject: ProjectState = {
  id: uuid(),
  title: 'New custom furniture concept',
  messages: [],
  conceptVersions: [],
  selectedVersionId: undefined,
  selectedMaterials: [],
  threeDAsset: undefined,
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  project: initialProject,
  isProcessing: false,
  currentStep: 1,

  setStep: (step: WorkflowStep) => {
    set({ currentStep: step });
  },

  reset: () => {
    set({
      project: {
        ...initialProject,
        id: uuid(),
      },
      currentStep: 1,
      isProcessing: false,
    });
  },

  seedFromInspiration: ({ title, prompt, imageUrl, suggestedMaterialIds }) => {
    const state = get().project;
    const version: ConceptVersion = {
      id: uuid(),
      promptText: prompt,
      outputImageUrl: imageUrl,
      createdAt: Date.now(),
    };

    const msg: Message = {
      id: uuid(),
      role: 'system',
      text: `✨ Loaded "${title}" as your starting design. Feel free to describe any modifications you'd like!`,
      createdAt: Date.now(),
    };

    set({
      project: {
        ...state,
        messages: [msg],
        conceptVersions: [version],
        selectedVersionId: version.id,
        selectedMaterials: suggestedMaterialIds,
        threeDAsset: undefined,
      },
      currentStep: 2,
    });
  },

  seedFromUpload: (imageDataUrl: string) => {
    const state = get().project;
    const version: ConceptVersion = {
      id: uuid(),
      promptText: 'Uploaded image',
      outputImageUrl: imageDataUrl,
      createdAt: Date.now(),
    };

    const msg: Message = {
      id: uuid(),
      role: 'system',
      text: `✨ I've loaded your uploaded image as the starting design. Describe what changes you'd like to make!`,
      createdAt: Date.now(),
    };

    set({
      project: {
        ...state,
        messages: [msg],
        conceptVersions: [version],
        selectedVersionId: version.id,
        selectedMaterials: [],
        threeDAsset: undefined,
      },
      currentStep: 2,
    });
  },

  toggleMaterial: (id: string) => {
    const state = get().project;
    const selected = new Set(state.selectedMaterials);
    if (selected.has(id)) selected.delete(id);
    else selected.add(id);
    set({ project: { ...state, selectedMaterials: Array.from(selected) } });
  },

  sendUserMessage: async (text: string) => {
    const state = get().project;

    const userMsg: Message = {
      id: uuid(),
      role: 'user',
      text,
      createdAt: Date.now(),
    };

    set({ 
      project: { ...state, messages: [...state.messages, userMsg] },
      isProcessing: true 
    });

    try {
      const { newVersion, systemMessage } = await nanoBananProService.editImage({
        project: get().project,
        userText: text,
      });

      const systemMsg: Message = {
        id: uuid(),
        role: 'system',
        text: systemMessage,
        createdAt: Date.now(),
      };

      const updated = get().project;

      set({
        project: {
          ...updated,
          messages: [...updated.messages, systemMsg],
          conceptVersions: [...updated.conceptVersions, newVersion],
          selectedVersionId: newVersion.id,
          threeDAsset: undefined,
        },
        isProcessing: false,
      });
    } catch (error) {
      const errorMsg: Message = {
        id: uuid(),
        role: 'system',
        text: '❌ Something went wrong. Please try again.',
        createdAt: Date.now(),
      };
      
      const updated = get().project;
      set({
        project: {
          ...updated,
          messages: [...updated.messages, errorMsg],
        },
        isProcessing: false,
      });
    }
  },

  selectVersion: (id: string) => {
    const state = get().project;
    set({ project: { ...state, selectedVersionId: id, threeDAsset: undefined } });
  },

  generate3D: async () => {
    const state = get().project;
    const version = state.conceptVersions.find(
      (v) => v.id === state.selectedVersionId,
    );
    if (!version) return;

    const tempAsset: ThreeDAsset = {
      id: 'pending',
      modelUrl: '',
      previewImageUrl: version.outputImageUrl,
      status: 'processing',
    };

    set({ 
      project: { ...state, threeDAsset: tempAsset },
      currentStep: 3,
    });

    try {
      const asset = await hitem3DService.createModel({
        project: get().project,
        version,
      });

      set({ project: { ...get().project, threeDAsset: asset } });
    } catch {
      set({
        project: {
          ...get().project,
          threeDAsset: {
            id: uuid(),
            modelUrl: '',
            previewImageUrl: version.outputImageUrl,
            status: 'error',
          },
        },
      });
    }
  },
}));

import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import type { ConceptVersion, Message, ProjectState, ThreeDAsset } from '../types';
import { hitem3DService, nanoBananProService } from '../services';

interface ProjectStore {
  project: ProjectState;
  sendUserMessage: (text: string) => Promise<void>;
  selectVersion: (id: string) => void;
  generate3D: () => Promise<void>;
  seedFromInspiration: (params: {
    title: string;
    prompt: string;
    imageUrl: string;
    suggestedMaterialIds: string[];
  }) => void;
  toggleMaterial: (id: string) => void;
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
      text: `Loaded inspiration: ${title}`,
      createdAt: Date.now(),
    };

    set({
      project: {
        ...state,
        messages: [...state.messages, msg],
        conceptVersions: [...state.conceptVersions, version],
        selectedVersionId: version.id,
        selectedMaterials: Array.from(
          new Set([...state.selectedMaterials, ...suggestedMaterialIds]),
        ),
      },
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

    set({ project: { ...state, messages: [...state.messages, userMsg] } });

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
    });
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

    set({ project: { ...state, threeDAsset: tempAsset } });

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

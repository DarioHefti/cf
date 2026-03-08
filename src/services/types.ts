import type { ConceptVersion, ProjectState, ThreeDAsset } from '../types';

export interface INanoBananProService {
  editImage(params: {
    project: ProjectState;
    userText: string;
  }): Promise<{ newVersion: ConceptVersion; systemMessage: string }>;
}

export interface IHitem3DService {
  createModel(params: {
    project: ProjectState;
    version: ConceptVersion;
  }): Promise<ThreeDAsset>;
}

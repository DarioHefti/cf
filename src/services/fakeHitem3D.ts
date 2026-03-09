import { v4 as uuid } from 'uuid';
import type { IHitem3DService } from './types';
import type { ConceptVersion, ProjectState, ThreeDAsset } from '../types';

const base = import.meta.env.BASE_URL;

export class FakeHitem3DService implements IHitem3DService {
  async createModel(params: {
    project: ProjectState;
    version: ConceptVersion;
  }): Promise<ThreeDAsset> {
    void params;

    // Simulate realistic 3D model generation time (3-5 seconds)
    const delay = 3000 + Math.random() * 2000;
    await new Promise((res) => setTimeout(res, delay));

    return {
      id: uuid(),
      modelUrl: `${base}models/demo-cube.gltf`,
      previewImageUrl: params.version.outputImageUrl,
      status: 'ready',
    };
  }
}

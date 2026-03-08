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

    await new Promise((res) => setTimeout(res, 1400));

    return {
      id: uuid(),
      modelUrl: `${base}models/demo-cube.gltf`,
      previewImageUrl: params.version.outputImageUrl,
      status: 'ready',
    };
  }
}

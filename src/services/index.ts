import type { IHitem3DService, INanoBananProService } from './types';
import { FakeNanoBananProService } from './fakeNanoBananPro';
import { FakeHitem3DService } from './fakeHitem3D';

export const nanoBananProService: INanoBananProService =
  new FakeNanoBananProService();

export const hitem3DService: IHitem3DService = new FakeHitem3DService();

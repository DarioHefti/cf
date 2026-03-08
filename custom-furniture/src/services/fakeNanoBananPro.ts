import { v4 as uuid } from 'uuid';
import type { INanoBananProService } from './types';
import type { ConceptVersion, ProjectState } from '../types';

const base = import.meta.env.BASE_URL;

const MOCK_OUTPUT_IMAGES = [
  `${base}inspirations/variation-1.svg`,
  `${base}inspirations/variation-2.svg`,
  `${base}inspirations/variation-3.svg`,
];

export class FakeNanoBananProService implements INanoBananProService {
  async editImage(params: {
    project: ProjectState;
    userText: string;
  }): Promise<{ newVersion: ConceptVersion; systemMessage: string }> {
    const { project, userText } = params;

    const outputImageUrl =
      MOCK_OUTPUT_IMAGES[project.conceptVersions.length % MOCK_OUTPUT_IMAGES.length];

    await new Promise((res) => setTimeout(res, 900));

    const newVersion: ConceptVersion = {
      id: uuid(),
      parentVersionId: project.selectedVersionId,
      promptText: userText,
      outputImageUrl,
      createdAt: Date.now(),
    };

    const systemMessage = `I adjusted the design based on: "${userText}". Proportions and materials have been refined.`;

    return { newVersion, systemMessage };
  }
}

import { v4 as uuid } from 'uuid';
import type { INanoBananProService } from './types';
import type { ConceptVersion, ProjectState } from '../types';

const base = import.meta.env.BASE_URL;

const MOCK_OUTPUT_IMAGES = [
  `${base}images/variations/variation-1.jpg`,
  `${base}images/variations/variation-2.jpg`,
  `${base}images/variations/variation-3.jpg`,
  `${base}images/variations/variation-4.jpg`,
  `${base}images/variations/variation-5.jpg`,
];

const AI_RESPONSES = [
  "I've updated the design based on your feedback. The proportions have been refined for better balance.",
  "Great suggestion! I've modified the piece with those changes. Notice the improved visual harmony.",
  "Done! The adjustments create a more cohesive look while maintaining the original character.",
  "I've incorporated your ideas. The new version has cleaner lines and better proportions.",
  "Perfect, I've made those modifications. The design now feels more polished and intentional.",
];

export class FakeNanoBananProService implements INanoBananProService {
  async editImage(params: {
    project: ProjectState;
    userText: string;
  }): Promise<{ newVersion: ConceptVersion; systemMessage: string }> {
    const { project, userText } = params;

    const versionIndex = project.conceptVersions.length;
    const outputImageUrl = MOCK_OUTPUT_IMAGES[versionIndex % MOCK_OUTPUT_IMAGES.length];
    const responseText = AI_RESPONSES[versionIndex % AI_RESPONSES.length];

    // Simulate realistic AI processing time (2-4 seconds)
    const delay = 2000 + Math.random() * 2000;
    await new Promise((res) => setTimeout(res, delay));

    const newVersion: ConceptVersion = {
      id: uuid(),
      parentVersionId: project.selectedVersionId,
      promptText: userText,
      outputImageUrl,
      createdAt: Date.now(),
    };

    const systemMessage = responseText;

    return { newVersion, systemMessage };
  }
}

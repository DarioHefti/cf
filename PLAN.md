Here’s how to adapt this plan so it actually runs as a static React SPA on `github.io`, with fake-data services that can be swapped later.

---

## 1. Project setup for GitHub Pages

Use Vite + React (simpler static export than Next for GitHub Pages):

```bash
npm create vite@latest custom-furniture -- --template react-ts
cd custom-furniture
npm install
```

In `vite.config.ts`, set the base path to match your GitHub Pages URL:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/<repo-name>/', // e.g. '/custom-furniture/'
})
```

Use hash routing to avoid 404 issues on GitHub Pages:

```bash
npm install react-router-dom
```

In `main.tsx`:

```tsx
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
```

---

## 2. Folder structure

```text
src/
  App.tsx
  components/
  data/
    materials.ts
    inspirations.ts
  services/
    fakeNanoBananPro.ts
    fakeHitem3D.ts
  state/
    projectStore.ts
public/
  materials/
  inspirations/
  models/
```

---

## 3. Fake data via abstraction/services

### 3.1 Data files (easily swappable)

`src/data/materials.ts`:

```ts
import { Material } from '../types';

export const MATERIALS: Material[] = [
  {
    id: 'oak-natural',
    name: 'Oak – Natural',
    category: 'wood',
    imageUrl: '/<repo-name>/materials/oak-natural.jpg',
    properties: {
      durability: 'high',
      priceTier: 2,
      notes: 'Warm tone, good for tabletops.',
    },
  },
  // more…
];
```

`src/data/inspirations.ts`:

```ts
import { InspirationExample } from '../types';

export const INSPIRATIONS: InspirationExample[] = [
  {
    id: 'minimal-desk-01',
    title: 'Minimal floating desk',
    description: 'Slim profile with hidden brackets.',
    tags: ['desk', 'minimal', 'wall-mounted'],
    heroImageUrl: '/<repo-name>/inspirations/minimal-desk-01.jpg',
    defaultPrompt: 'Slim floating desk with hidden cable management.',
    suggestedMaterialIds: ['oak-natural'],
  },
  // more…
];
```

Note the `/<repo-name>/` prefix so assets work on GitHub Pages.

---

### 3.2 Service interfaces (abstraction)

`src/services/types.ts`:

```ts
import { ConceptVersion, ThreeDAsset, ProjectState } from '../types';

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
```

#### Fake implementations (browser-only)

`src/services/fakeNanoBananPro.ts`:

```ts
import { INanoBananProService } from './types';
import { ConceptVersion, ProjectState } from '../types';
import { v4 as uuid } from 'uuid';

const MOCK_OUTPUT_IMAGES = [
  '/<repo-name>/inspirations/variation-1.jpg',
  '/<repo-name>/inspirations/variation-2.jpg',
  '/<repo-name>/inspirations/variation-3.jpg',
];

export class FakeNanoBananProService implements INanoBananProService {
  async editImage(params: {
    project: ProjectState;
    userText: string;
  }): Promise<{ newVersion: ConceptVersion; systemMessage: string }> {
    const { project, userText } = params;

    const outputImageUrl =
      MOCK_OUTPUT_IMAGES[project.conceptVersions.length % MOCK_OUTPUT_IMAGES.length];

    await new Promise((res) => setTimeout(res, 1200)); // simulate latency

    const newVersion: ConceptVersion = {
      id: uuid(),
      parentVersionId: project.selectedVersionId,
      promptText: userText,
      outputImageUrl,
      createdAt: Date.now(),
    };

    const systemMessage = `I adjusted the design based on: "${userText}". The proportions and materials have been refined.`;

    return { newVersion, systemMessage };
  }
}
```

`src/services/fakeHitem3D.ts`:

```ts
import { IHitem3DService } from './types';
import { ConceptVersion, ProjectState, ThreeDAsset } from '../types';
import { v4 as uuid } from 'uuid';

export class FakeHitem3DService implements IHitem3DService {
  async createModel(params: {
    project: ProjectState;
    version: ConceptVersion;
  }): Promise<ThreeDAsset> {
    await new Promise((res) => setTimeout(res, 2000)); // simulate processing

    return {
      id: uuid(),
      modelUrl: '/<repo-name>/models/demo-table.glb',
      previewImageUrl: params.version.outputImageUrl,
      status: 'ready',
    };
  }
}
```

#### Service factory (easy swap later)

`src/services/index.ts`:

```ts
import { INanoBananProService, IHitem3DService } from './types';
import { FakeNanoBananProService } from './fakeNanoBananPro';
import { FakeHitem3DService } from './fakeHitem3D';

export const nanoBananProService: INanoBananProService =
  new FakeNanoBananProService();

export const hitem3DService: IHitem3DService = new FakeHitem3DService();
```

Later you just replace these with real implementations without touching UI code.

---

## 4. Central project state (in-memory + optional localStorage)

`src/state/projectStore.ts` (simple React context or Zustand; example with Zustand):

```bash
npm install zustand
```

```ts
import { create } from 'zustand';
import { ProjectState, Message, ConceptVersion, ThreeDAsset } from '../types';
import { nanoBananProService, hitem3DService } from '../services';
import { v4 as uuid } from 'uuid';

interface ProjectStore {
  project: ProjectState;
  sendUserMessage: (text: string) => Promise<void>;
  selectVersion: (id: string) => void;
  generate3D: () => Promise<void>;
}

const initialProject: ProjectState = {
  id: uuid(),
  title: 'New custom furniture concept',
  messages: [],
  conceptVersions: [],
  selectedVersionId: undefined,
  selectedMaterials: [],
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  project: initialProject,

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
      },
    });
  },

  selectVersion: (id: string) => {
    const state = get().project;
    set({ project: { ...state, selectedVersionId: id } });
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

    const asset = await hitem3DService.createModel({
      project: get().project,
      version,
    });

    set({ project: { ...get().project, threeDAsset: asset } });
  },
}));
```

Optional: hydrate/save `project` to `localStorage` in this store.

---

## 5. UI integration

### 5.1 Chat panel

Use the store only; no direct service calls in components.

```tsx
// src/components/ChatPanel.tsx
import { useState } from 'react';
import { useProjectStore } from '../state/projectStore';

export function ChatPanel() {
  const [text, setText] = useState('');
  const { project, sendUserMessage } = useProjectStore();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await sendUserMessage(text.trim());
    setText('');
  };

  return (
    <div className="chat-panel">
      <div className="messages">
        {project.messages.map((m) => (
          <div key={m.id} className={`msg msg-${m.role}`}>
            {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe changes you want..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

### 5.2 Version history

```tsx
// src/components/VersionHistorySidebar.tsx
import { useProjectStore } from '../state/projectStore';

export function VersionHistorySidebar() {
  const { project, selectVersion } = useProjectStore();
  return (
    <aside>
      {project.conceptVersions.map((v) => (
        <button
          key={v.id}
          onClick={() => selectVersion(v.id)}
          style={{
            border:
              v.id === project.selectedVersionId ? '2px solid blue' : '1px solid #ccc',
          }}
        >
          <img src={v.outputImageUrl} alt="" width={80} />
        </button>
      ))}
    </aside>
  );
}
```

### 5.3 3D viewer + AR (`model-viewer`)

Install `@google/model-viewer` by script tag in `index.html`:

```html
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
```

Component:

```tsx
// src/components/ThreeDViewer.tsx
import { useProjectStore } from '../state/projectStore';

export function ThreeDViewer() {
  const { project, generate3D } = useProjectStore();
  const asset = project.threeDAsset;

  if (!asset) {
    const disabled = project.conceptVersions.length === 0;
    return (
      <button disabled={disabled} onClick={generate3D}>
        Generate 3D
      </button>
    );
  }

  if (asset.status === 'processing') {
    return <div>Generating 3D model…</div>;
  }

  return (
    <div>
      <model-viewer
        src={asset.modelUrl}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        style={{ width: '100%', height: '400px' }}
      ></model-viewer>
    </div>
  );
}
```

---

## 6. App shell

`App.tsx` (single-page layout):

```tsx
import { ChatPanel } from './components/ChatPanel';
import { VersionHistorySidebar } from './components/VersionHistorySidebar';
import { ThreeDViewer } from './components/ThreeDViewer';
// + InspirationGallery, MaterialsLibrary, etc.

export default function App() {
  return (
    <div className="app-shell">
      <header>Custom Furniture from Sketch (Prototype)</header>
      <main className="layout">
        <section className="left">
          {/* InspirationGallery, MaterialsLibrary */}
        </section>
        <section className="center">
          {/* ConceptImageViewer */}
          <ChatPanel />
        </section>
        <section className="right">
          <VersionHistorySidebar />
          <ThreeDViewer />
        </section>
      </main>
    </div>
  );
}
```

---

## 7. GitHub Pages deployment

In `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  }
}
```

```bash
npm install gh-pages --save-dev
```

Add GitHub Action `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Enable GitHub Pages in repo settings, branch `gh-pages`, folder `/`.

---

This gives you:

- Pure static React app deployable to `github.io`.
- All data via `data/*.ts` and fake services (`services/*.ts`).
- Clear interfaces to swap in real nano banan pro / HITEM3D later without changing UI.

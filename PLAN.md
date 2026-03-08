# Plan: From sketch/image to custom-made furniture (end-to-end product)

This document is a thorough implementation plan for a product that takes a user’s idea (text and/or images), iteratively refines a concept image via an image-edit model ("nano banan pro"), then generates a textured 3D model and previews it in the user’s living room via WebAR (MindAR + Three.js), and finally supports quoting/hand-off to a carpenter.

---

## 0) Goals, non-goals, and assumptions

### Goals
- Accept initial user input as:
  - **Text-only** (e.g., “oak coffee table, rounded corners, 120x60cm, mid-century legs”).
  - **Image + text** (sketch/photo + instructions).
- Provide **materials library images** (wood types, finishes, fabrics, metals) and an **inspiration/examples collection** that users can start from.
- On each user “Enter” / “Send”:
  1. Call **nano banan pro** in the background to adjust the current concept image according to the user’s text instructions.
  2. Show the updated image to the user and allow iterative refinement.
- When the user confirms (“Generate 3D”):
  1. Call an **image → textured 3D model** API.
  2. Show the 3D result in **WebAR** in the user’s living room using **MindAR + Three.js**.
- Track progress and store versions (images, prompts, assets) for reproducibility.
- Prepare structured output (dimensions, materials, joinery notes, cut list suggestions) for quoting/production.

### Non-goals (for first release)
- Full CAD-grade parametric modeling.
- Automatic structural engineering validation.
- Real-time multi-user collaboration.

### Assumptions to confirm early
- What exactly “nano banan pro” refers to:
  - Provider, API base URL, auth scheme (API key/OAuth), rate limits, image input/output format.
  - Whether it supports **image editing** (instruct-pix2pix style) vs generation from scratch.
- The chosen **image→3D** vendor/API:
  - Output formats (glb/usdz/obj/fbx), PBR texture sets, scale units.
  - Turnaround time (sync vs async jobs), pricing.
- Target platforms:
  - Mobile Safari (iOS) and Android Chrome are critical for AR.

---

## 1) Product experience (user journey)

### 1.1 Entry points
1) **Start from inspiration**
- User selects an example (image + short description, tags, approximate dimensions, materials).
- System preloads:
  - a base image
  - default prompt
  - optional constraints (dimensions/material family)

2) **Start from materials**
- User chooses materials (wood species, fabric, metal) from a visual catalog.
- System sets constraints and suggests matching inspirations.

3) **Start from scratch**
- User enters text and optionally uploads:
  - sketch (paper drawing)
  - reference photo (existing furniture)
  - room photo (style context)

### 1.2 Iteration loop (core)
- Chat-like interface.
- User types a change request and hits Enter.
- Background:
  - nano banan pro edits the current concept image.
  - The app shows a progress indicator.
- Output:
  - Updated concept image.
  - Optional “diff”/before-after slider.
  - Quick actions: “Make it taller”, “Change wood to walnut”, “More minimalist”, etc.
- User can iterate until satisfied.

### 1.3 Transition to 3D
- User clicks **“Generate 3D”**.
- System:
  - Validates prerequisites (final concept image chosen, basic dimensions/materials set).
  - Calls image→3D API.
- On completion:
  - Shows interactive 3D viewer (non-AR) first.
  - Then **“View in your room (AR)”**.

### 1.4 AR placement
- WebAR session:
  - Detect plane/anchor (or image target if using MindAR image tracking).
  - Place model, allow scale/rotate/translate.
  - Provide scale calibration UI (e.g., set known dimension).
- Optional:
  - Snapshot capture for sharing.

### 1.5 Quote + handoff
- Collect:
  - dimensions
  - materials
  - finish
  - quantity
  - location (for shipping)
- Produce:
  - PDF brief + asset bundle (final image, GLB, textures, notes).
- Send to carpenter/partner network.

---

## 2) Requirements & acceptance criteria

### 2.1 Functional requirements
- Inputs:
  - Text prompt (required).
  - Image upload (optional): jpg/png, max size constraints.
- Inspiration gallery:
  - Filter by category (chair, table, shelf), style, material, budget range.
- Materials library:
  - Visual swatches with metadata (species, finish, durability, price tier).
- Iterative image editing:
  - Each message produces a new concept image version.
  - Users can revert to any previous version.
- 3D generation:
  - async job handling with status updates.
  - stores resulting asset(s) and metadata.
- 3D viewing:
  - web-based viewer for GLB.
  - AR placement in living room.
- Persistence:
  - store sessions, assets, and prompts.

### 2.2 Non-functional requirements
- Performance:
  - show responsive UI while jobs run.
  - progressive loading for 3D assets.
- Reliability:
  - job retries, idempotency keys.
- Security:
  - signed upload URLs, server-side API key protection.
- Observability:
  - logs/traces of job lifecycle, cost metrics.

### 2.3 MVP acceptance tests
- Text-only prompt leads to a concept image within X seconds.
- Image+text edit results reflect instruction (manual QA rubric).
- User can iterate 5+ times with version history.
- 3D job produces a viewable GLB with textures.
- AR view displays model anchored and manipulable on a phone.

---

## 3) System architecture

### 3.1 High-level components
- **Web app (frontend)**
  - Chat UI
  - Inspiration/material selectors
  - Image viewer + history
  - 3D viewer (Three.js)
  - AR module (MindAR + Three.js)

- **Backend API**
  - Auth (optional for MVP)
  - Asset storage (S3/R2)
  - Job orchestration (queue)
  - Calls to nano banan pro + image→3D provider
  - Session state/versioning

- **Worker(s)**
  - Run long jobs (image edits, 3D generation polling)
  - Post-process assets (compression, texture resizing)

- **Database**
  - sessions, messages
  - versions
  - asset metadata
  - job records

### 3.2 Suggested tech choices (adjust as desired)
- Frontend: Next.js / React + TypeScript
- Backend: Next.js API routes or separate Node service (Fastify/Nest)
- Queue: BullMQ + Redis (or managed queue)
- Storage: S3-compatible
- DB: Postgres (Prisma)
- 3D: Three.js + @google/model-viewer (optional for fallback)
- AR: MindAR (image/face tracking) + WebXR where available

---

## 4) Data model (proposed)

### 4.1 Entities
- **User**
  - id
  - email (optional)

- **Project**
  - id, userId
  - title
  - createdAt

- **Message** (chat log)
  - id, projectId
  - role: user|system
  - text
  - createdAt

- **ConceptVersion**
  - id, projectId
  - parentVersionId (for branching)
  - promptText
  - inputImageAssetId (optional)
  - outputImageAssetId
  - createdAt

- **Asset**
  - id
  - type: image|model|texture|pdf
  - url
  - mime
  - width/height (images)
  - fileSize
  - metadata json

- **Job**
  - id
  - type: image_edit|image_to_3d
  - status: queued|running|succeeded|failed
  - providerJobId
  - input json
  - output json
  - error
  - createdAt/updatedAt

- **Material**
  - id
  - name
  - category: wood|metal|fabric|stone
  - images[]
  - properties json (durability, price tier, etc.)

- **InspirationExample**
  - id
  - title, description, tags
  - heroImageAssetId
  - defaultPrompt
  - suggestedMaterials[]

---

## 5) Detailed workflow specs

### 5.1 Concept image editing loop (nano banan pro)

**Inputs**
- current image (if any)
- user instruction text
- optional constraints:
  - materials
  - dimensions
  - style tags

**Process**
1. Normalize user instruction:
   - keep a running “design brief” summary (system-generated) to reduce prompt drift.
2. Build provider request:
   - base image + instruction
   - recommended settings (strength, guidance, seed)
3. Submit async job (preferred) or sync call.
4. Save:
   - job record
   - output image asset
   - new ConceptVersion pointing to parent

**UX details**
- Show intermediate status.
- Provide “try again” and “adjust strength” if results are off.
- Allow “lock” certain elements (e.g., keep legs unchanged) if supported.

### 5.2 3D generation (image → textured model)

**Inputs**
- final selected concept image
- optionally: material choices to influence textures
- optionally: desired scale (e.g., 120cm width)

**Process**
1. Submit job to provider.
2. Poll status or receive webhook callback.
3. Download result assets.
4. Post-process:
   - ensure GLB is optimized (Draco, mesh simplification if necessary)
   - limit texture resolution for mobile AR
   - embed textures properly for GLB
   - compute bounding box, suggested scale
5. Persist to storage and attach to project.

**Outputs**
- GLB (preferred)
- texture maps (if separate)
- metadata: scale units, approximate dimensions

### 5.3 AR viewing (MindAR + Three.js)

**Options**
- **Plane-based placement** (WebXR hit-test) when supported.
- **MindAR image-target** fallback if you want deterministic tracking.

**Minimum features**
- Load GLB.
- Place object at anchor.
- Gestures:
  - one-finger rotate
  - two-finger pan
  - pinch scale
- “Reset placement” button.

**Important constraints**
- Mobile performance: keep triangles/texture sizes within budgets.
- Lighting: use environment map + simple shadow plane.

---

## 6) Content: materials + inspiration library

### 6.1 Materials library
- For each material:
  - high-quality swatch image
  - name, category
  - finish options (matte, satin, gloss)
  - notes (care instructions)
- UX:
  - grid gallery
  - quick compare
  - “apply to concept” instruction builder

### 6.2 Inspiration examples collection
- Curate 20–50 examples for MVP.
- Each example includes:
  - one or more images
  - short prompt text describing style and key features
  - tags
  - typical dimensions range
- Allow user to “Use as starting point” (creates a project seeded with that example).

---

## 7) Prompting strategy (practical)

### 7.1 Maintain a structured “Design Brief”
Maintain a JSON-like summary updated after each user message:
- type (chair/table/etc.)
- dimensions
- materials/finish
- style adjectives
- constraints (“rounded corners”, “no drawers”)

Use it to build consistent edit instructions for nano banan pro.

### 7.2 Avoid drift
- Always reference previous concept image as the base.
- Keep key constraints in every edit request.
- Provide a “lock constraints” UI so the user can pin things.

---

## 8) API design (backend)

### 8.1 REST endpoints (example)
- `POST /api/projects` create project
- `GET /api/projects/:id` fetch project state
- `POST /api/projects/:id/messages` add user message and enqueue image edit job
- `GET /api/jobs/:id` job status
- `POST /api/projects/:id/generate-3d` enqueue 3D job
- `GET /api/projects/:id/assets` list assets

### 8.2 Webhooks
- `POST /api/webhooks/image-to-3d` provider callback

### 8.3 Storage
- `POST /api/uploads/sign` get signed URL for direct upload

---

## 9) Error handling & edge cases

- Unsupported image type → friendly validation message.
- Provider errors/timeouts → retry + show actionable error.
- User spams Enter → debounce and queue; prevent parallel edits on same base version unless explicitly branching.
- 3D output too heavy for mobile → auto-optimize; if still heavy, provide “low poly” toggle.
- AR not supported → fallback to 3D viewer + allow screenshot overlay.

---

## 10) Security and privacy

- Keep provider API keys server-side only.
- Use signed URLs for uploads/downloads.
- If storing user room images, clearly disclose and allow deletion.
- Add per-user/project access control.

---

## 11) Observability, analytics, and cost control

- Track:
  - number of image edits per project
  - conversion to 3D
  - provider costs per job
  - average job latency
- Add alerts for:
  - job failure rate spikes
  - cost anomalies

---

## 12) Implementation phases (recommended)

### Phase 0 — Discovery & API validation
- Confirm nano banan pro API:
  - request/response schema
  - auth
  - image edit capabilities
- Confirm image→3D provider:
  - output quality
  - speed
  - formats
- Define performance budgets for AR.

### Phase 1 — MVP “Concept iteration”
- Build web UI:
  - upload image
  - chat input
  - concept image display + version history
- Build backend job orchestration for nano banan pro.
- Persist assets + versions.

### Phase 2 — 3D generation + viewer
- Add “Generate 3D” button.
- Implement job pipeline for image→3D.
- Integrate GLB viewer.

### Phase 3 — AR placement
- Integrate MindAR + Three.js AR mode.
- Add gesture controls and scale calibration.
- Add fallback for unsupported devices.

### Phase 4 — Materials + inspiration library
- Seed materials swatches.
- Build inspiration gallery.
- Connect to concept iteration flow.

### Phase 5 — Quote & handoff
- Build structured export.
- Quote request flow.
- Admin/carpenter portal (optional).

---

## 13) Testing plan

### 13.1 Unit tests
- prompt builder (design brief → provider request)
- job state transitions

### 13.2 Integration tests
- simulate provider calls with mocks
- storage uploads

### 13.3 E2E tests
- create project → iterate image → generate 3d → open AR

### 13.4 Manual QA checklist
- iOS Safari AR performance
- low bandwidth behavior

---

## 14) Deployment plan

- Environments: dev/staging/prod
- Secrets management for provider keys
- CDN for assets
- Background workers on separate dynos/containers

---

## 15) Open questions (must decide)

1) nano banan pro:
- Provider link + docs?
- Does it accept image+text edit, and does it support masks?

2) image→3D provider:
- Which API (and costs/limits)?
- Output GLB with embedded textures?

3) MindAR mode:
- image target tracking vs plane placement (WebXR)?

4) Dimension capture:
- do we ask for explicit dimensions early?
- or infer scale from typical furniture defaults?

5) Legal:
- licensing for inspiration images/material textures.

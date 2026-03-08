import { useProjectStore } from '../state/projectStore';

export function ThreeDViewer() {
  const { project, generate3D } = useProjectStore();
  const asset = project.threeDAsset;

  const hasVersion = project.conceptVersions.length > 0;
  const disabled = !hasVersion || !project.selectedVersionId;

  if (!asset) {
    return (
      <div className="panel">
        <h2>3D + AR</h2>
        <button disabled={disabled} onClick={generate3D}>
          Generate 3D
        </button>
        <div className="hint">
          Uses a fake service for now; replace later with real Hitem3D integration.
        </div>
      </div>
    );
  }

  if (asset.status === 'processing') {
    return (
      <div className="panel">
        <h2>3D + AR</h2>
        <div>Generating 3D model</div>
      </div>
    );
  }

  if (asset.status === 'error') {
    return (
      <div className="panel">
        <h2>3D + AR</h2>
        <div className="error">Failed to generate 3D.</div>
        <button onClick={generate3D}>Try again</button>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>3D + AR</h2>
      {/* model-viewer is provided by a script tag in index.html */}
      <model-viewer
        src={asset.modelUrl}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        style={{ width: '100%', height: 360, background: '#111' }}
      />
      <div className="hint">Tip: on mobile, tap AR when available.</div>
    </div>
  );
}

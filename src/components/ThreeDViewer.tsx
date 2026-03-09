import { useProjectStore } from '../state/projectStore';
import { Spinner } from './Spinner';

export function ThreeDViewer() {
  const { project, generate3D, isProcessing } = useProjectStore();
  const asset = project.threeDAsset;

  const hasVersion = project.conceptVersions.length > 0;
  const disabled = !hasVersion || !project.selectedVersionId || isProcessing;

  if (!asset) {
    return (
      <div className="panel">
        <h2>🧊 3D Preview & AR</h2>
        <div className="empty-state">
          <div className="empty-state-icon">🔮</div>
          <div className="empty-state-text">
            Generate a 3D model from your design to preview in augmented reality.
          </div>
        </div>
        <button 
          disabled={disabled} 
          onClick={generate3D}
          style={{ width: '100%', marginTop: 16 }}
        >
          {!hasVersion ? 'Select a design first' : 'Generate 3D Model'}
        </button>
      </div>
    );
  }

  if (asset.status === 'processing') {
    return (
      <div className="panel">
        <h2>🧊 3D Preview & AR</h2>
        <Spinner size="large" text="Generating 3D model..." />
        <div className="hint" style={{ textAlign: 'center', marginTop: 12 }}>
          This typically takes 3-5 seconds
        </div>
      </div>
    );
  }

  if (asset.status === 'error') {
    return (
      <div className="panel">
        <h2>🧊 3D Preview & AR</h2>
        <div className="error" style={{ textAlign: 'center', padding: 20 }}>
          Failed to generate 3D model. Please try again.
        </div>
        <button onClick={generate3D} style={{ width: '100%' }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>🧊 3D Preview & AR</h2>
      {/* model-viewer is provided by a script tag in index.html */}
      <model-viewer
        src={asset.modelUrl}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        style={{ width: '100%', height: 280, background: '#f3f4f6', borderRadius: 12 }}
      />
      <div className="hint" style={{ marginTop: 12 }}>
        💡 Drag to rotate • Pinch to zoom • On mobile, tap AR to view in your space
      </div>
    </div>
  );
}

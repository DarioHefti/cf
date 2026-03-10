import { useRef, useState, useCallback } from 'react';
import { useProjectStore } from '../state/projectStore';
import { Spinner } from './Spinner';
import type { ModelViewerElement } from '../model-viewer.d';

export function ThreeDViewer() {
  const { project, generate3D, isProcessing } = useProjectStore();
  const asset = project.threeDAsset;
  const modelViewerRef = useRef<HTMLElement>(null);
  const [arNotSupported, setArNotSupported] = useState(false);

  const hasVersion = project.conceptVersions.length > 0;
  const disabled = !hasVersion || !project.selectedVersionId || isProcessing;

  const handleViewAR = useCallback(() => {
    const mv = modelViewerRef.current as ModelViewerElement | null;
    if (!mv) return;
    if (!mv.canActivateAR) {
      setArNotSupported(true);
      setTimeout(() => setArNotSupported(false), 3000);
      return;
    }
    mv.activateAR();
  }, []);

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
        ref={modelViewerRef}
        src={asset.modelUrl}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: '100%', height: 280, background: '#f3f4f6', borderRadius: 12 }}
      />
      <div className="hint" style={{ marginTop: 12 }}>
        💡 Drag to rotate • Pinch to zoom
      </div>
      <button
        onClick={handleViewAR}
        style={{ width: '100%', marginTop: 8 }}
        title={arNotSupported ? 'AR is not supported on this device' : 'View in AR'}
      >
        {arNotSupported ? '⚠️ AR not supported on this device' : '📱 View in AR'}
      </button>
    </div>
  );
}

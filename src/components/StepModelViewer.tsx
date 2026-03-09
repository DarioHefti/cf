import { useProjectStore } from '../state/projectStore';
import { Spinner } from './Spinner';

export function StepModelViewer() {
  const { project, setStep, reset, generate3D } = useProjectStore();
  const asset = project.threeDAsset;

  const selectedVersion = project.conceptVersions.find(
    (v) => v.id === project.selectedVersionId
  );

  return (
    <div className="step-container model-viewer-step">
      <div className="step-header">
        <div className="step-header-row">
          <button className="back-button" onClick={() => setStep(2)}>
            ← Back to Design
          </button>
          <div>
            <h1>3D Model Preview</h1>
            <p>View your furniture in 3D and AR</p>
          </div>
          <button className="proceed-button" onClick={reset}>
            Start New Design
          </button>
        </div>
      </div>

      <div className="model-layout">
        {/* Left: 3D Viewer */}
        <div className="model-viewer-container">
          {!asset || asset.status === 'processing' ? (
            <div className="model-loading">
              <Spinner size="large" text="Generating 3D model..." />
              <p className="loading-hint">This typically takes 3-5 seconds</p>
            </div>
          ) : asset.status === 'error' ? (
            <div className="model-error">
              <div className="error-icon">⚠️</div>
              <p>Failed to generate 3D model</p>
              <button onClick={generate3D}>Try Again</button>
            </div>
          ) : (
            <model-viewer
              src={asset.modelUrl}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              style={{ width: '100%', height: '100%', minHeight: '500px', background: '#f3f4f6', borderRadius: '12px' }}
            />
          )}
        </div>

        {/* Right: Reference Image & Actions */}
        <div className="model-sidebar">
          <div className="reference-card">
            <h3>Reference Design</h3>
            {selectedVersion && (
              <img 
                src={selectedVersion.outputImageUrl} 
                alt="Reference design"
              />
            )}
          </div>

          <div className="model-actions">
            <h3>Actions</h3>
            <div className="action-buttons">
              <button className="action-btn">
                📱 View in AR
              </button>
              <button className="action-btn secondary">
                💾 Download 3D Model
              </button>
              <button className="action-btn secondary">
                🔗 Share Design
              </button>
            </div>
          </div>

          <div className="model-tips">
            <h3>Tips</h3>
            <ul>
              <li>🖱️ Drag to rotate the model</li>
              <li>🔍 Scroll to zoom in/out</li>
              <li>📱 On mobile, tap "View in AR" to place it in your space</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRef, useState, useCallback } from 'react';
import { useProjectStore } from '../state/projectStore';
import { Spinner } from './Spinner';
import { useLanguage } from '../i18n/LanguageContext';
import type { ModelViewerElement } from '../model-viewer.d';

export function StepModelViewer() {
  const { project, setStep, reset, generate3D } = useProjectStore();
  const { t } = useLanguage();
  const asset = project.threeDAsset;
  const modelViewerRef = useRef<HTMLElement>(null);
  const [arNotSupported, setArNotSupported] = useState(false);

  const selectedVersion = project.conceptVersions.find(
    (v) => v.id === project.selectedVersionId
  );

  const handleViewAR = useCallback(() => {
    const mv = modelViewerRef.current as ModelViewerElement | null;
    if (!mv) return;

    // canActivateAR is true on AR-capable devices (Android with Scene Viewer /
    // WebXR, iOS with Quick Look). If false we warn instead of silently failing.
    if (!mv.canActivateAR) {
      setArNotSupported(true);
      setTimeout(() => setArNotSupported(false), 3000);
      return;
    }

    mv.activateAR();
  }, []);

  return (
    <div className="step-container model-viewer-step">
      <div className="step-header">
        <div className="step-header-row">
          <button className="back-button" onClick={() => setStep(2)}>
            {t('backToDesign')}
          </button>
          <div>
            <h1>{t('modelTitle')}</h1>
            <p>{t('modelSubtitle')}</p>
          </div>
          <button className="proceed-button" onClick={reset}>
            {t('startNew')}
          </button>
        </div>
      </div>

      <div className="model-layout">
        {/* Left: 3D Viewer */}
        <div className="model-viewer-container">
          {!asset || asset.status === 'processing' ? (
            <div className="model-loading">
              <Spinner size="large" text={t('generatingModel')} />
              <p className="loading-hint">{t('loadingHint')}</p>
            </div>
          ) : asset.status === 'error' ? (
            <div className="model-error">
              <div className="error-icon">⚠️</div>
              <p>{t('modelFailed')}</p>
              <button onClick={generate3D}>{t('tryAgain')}</button>
            </div>
          ) : (
            <model-viewer
              ref={modelViewerRef}
              src={asset.modelUrl}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              shadow-intensity="1"
              style={{ width: '100%', height: '100%', minHeight: '500px', background: '#f3f4f6', borderRadius: '12px' }}
            >
              {/* 
                The default model-viewer AR button appears as an overlay on
                the canvas. We keep it so users can tap it directly on mobile,
                but we also wire our own sidebar button (handleViewAR) so it
                works from the actions panel too.
              */}
            </model-viewer>
          )}
        </div>

        {/* Right: Reference Image & Actions */}
        <div className="model-sidebar">
          <div className="reference-card">
            <h3>{t('referenceDesign')}</h3>
            {selectedVersion && (
              <img 
                src={selectedVersion.outputImageUrl} 
                alt={t('referenceDesign')}
              />
            )}
          </div>

          <div className="model-actions">
            <h3>{t('actions')}</h3>
            <div className="action-buttons">
              <button
                className="action-btn"
                onClick={handleViewAR}
                disabled={!asset || asset.status !== 'ready'}
                title={arNotSupported ? t('arNotSupported') : t('viewAR')}
              >
                {arNotSupported ? t('arNotSupported') : t('viewAR')}
              </button>
              <button className="action-btn secondary">
                {t('download3D')}
              </button>
              <button className="action-btn secondary">
                {t('shareDesign')}
              </button>
            </div>
          </div>

          <div className="model-tips">
            <h3>{t('tipsTitle')}</h3>
            <ul>
              <li>{t('tip1')}</li>
              <li>{t('tip2')}</li>
              <li>{t('tip3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useProjectStore } from '../state/projectStore';
import { Spinner } from './Spinner';
import { useLanguage } from '../i18n/LanguageContext';

export function StepModelViewer() {
  const { project, setStep, reset, generate3D } = useProjectStore();
  const { t } = useLanguage();
  const asset = project.threeDAsset;

  const selectedVersion = project.conceptVersions.find(
    (v) => v.id === project.selectedVersionId
  );

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
              <button className="action-btn">
                {t('viewAR')}
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

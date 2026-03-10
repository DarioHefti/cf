import { useState } from 'react';
import { useProjectStore } from '../state/projectStore';
import { Skeleton } from './Spinner';
import { useLanguage } from '../i18n/LanguageContext';

export function VersionHistorySidebar() {
  const { project, selectVersion, isProcessing } = useProjectStore();
  const { t } = useLanguage();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  return (
    <div className="panel">
      <h2>{t('versionHistoryTitle')}</h2>
      {project.conceptVersions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📁</div>
          <div className="empty-state-text">
            {t('versionEmpty')}
          </div>
        </div>
      ) : (
        <div className="versionGrid">
          {project.conceptVersions
            .slice()
            .reverse()
            .map((v, index) => (
              <button
                key={v.id}
                className={
                  v.id === project.selectedVersionId
                    ? 'versionButton selected'
                    : 'versionButton'
                }
                onClick={() => selectVersion(v.id)}
                title={`Version ${project.conceptVersions.length - index}: ${v.promptText}`}
                disabled={isProcessing}
              >
                {!loadedImages.has(v.id) && <Skeleton height={70} />}
                <img 
                  src={v.outputImageUrl} 
                  alt={`Version ${project.conceptVersions.length - index}`}
                  style={{ display: loadedImages.has(v.id) ? 'block' : 'none' }}
                  onLoad={() => handleImageLoad(v.id)}
                />
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

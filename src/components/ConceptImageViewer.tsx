import { useMemo, useState, useEffect } from 'react';
import { useProjectStore } from '../state/projectStore';
import { Skeleton } from './Spinner';

export function ConceptImageViewer() {
  const { project, isProcessing } = useProjectStore();
  const [imageLoading, setImageLoading] = useState(false);

  const selected = useMemo(() => {
    if (!project.selectedVersionId) return undefined;
    return project.conceptVersions.find((v) => v.id === project.selectedVersionId);
  }, [project.conceptVersions, project.selectedVersionId]);

  // Reset loading state when selected version changes
  useEffect(() => {
    if (selected) {
      setImageLoading(true);
    }
  }, [selected?.id]);

  return (
    <div className="panel">
      <h2>🎨 Current Design</h2>
      {isProcessing ? (
        <div className="concept">
          <Skeleton height={300} borderRadius="12px" />
          <div className="hint" style={{ marginTop: 12 }}>
            <Skeleton width={200} height={16} />
          </div>
        </div>
      ) : selected ? (
        <div className="concept">
          {imageLoading && <Skeleton height={300} borderRadius="12px" />}
          <img 
            src={selected.outputImageUrl} 
            alt="Selected concept" 
            style={{ display: imageLoading ? 'none' : 'block' }}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
          {!imageLoading && (
            <div className="hint">
              <strong>Prompt:</strong> {selected.promptText}
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🪑</div>
          <div className="empty-state-text">
            Select an inspiration from the gallery to start designing your custom furniture.
          </div>
        </div>
      )}
    </div>
  );
}

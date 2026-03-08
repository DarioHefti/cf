import { useMemo } from 'react';
import { useProjectStore } from '../state/projectStore';

export function ConceptImageViewer() {
  const { project } = useProjectStore();

  const selected = useMemo(() => {
    if (!project.selectedVersionId) return undefined;
    return project.conceptVersions.find((v) => v.id === project.selectedVersionId);
  }, [project.conceptVersions, project.selectedVersionId]);

  return (
    <div className="panel">
      <h2>Concept</h2>
      {selected ? (
        <div className="concept">
          <img src={selected.outputImageUrl} alt="Selected concept" />
          <div className="hint">Prompt: {selected.promptText}</div>
        </div>
      ) : (
        <div className="hint">Pick an inspiration to start.</div>
      )}
    </div>
  );
}

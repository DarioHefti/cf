import { useProjectStore } from '../state/projectStore';

export function VersionHistorySidebar() {
  const { project, selectVersion } = useProjectStore();

  return (
    <div className="panel">
      <h2>Versions</h2>
      {project.conceptVersions.length === 0 ? (
        <div className="hint">No versions yet.</div>
      ) : (
        <div className="versionGrid">
          {project.conceptVersions
            .slice()
            .reverse()
            .map((v) => (
              <button
                key={v.id}
                className={
                  v.id === project.selectedVersionId
                    ? 'versionButton selected'
                    : 'versionButton'
                }
                onClick={() => selectVersion(v.id)}
                title={v.promptText}
              >
                <img src={v.outputImageUrl} alt="" />
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

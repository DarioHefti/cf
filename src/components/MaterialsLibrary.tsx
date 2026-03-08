import { MATERIALS } from '../data/materials';
import { useProjectStore } from '../state/projectStore';

export function MaterialsLibrary() {
  const { project, toggleMaterial } = useProjectStore();
  const selected = new Set(project.selectedMaterials);

  return (
    <div className="panel">
      <h2>Materials</h2>
      <div className="materialsGrid">
        {MATERIALS.map((m) => (
          <button
            key={m.id}
            className={selected.has(m.id) ? 'material selected' : 'material'}
            onClick={() => toggleMaterial(m.id)}
            title={m.properties.notes}
          >
            <img src={m.imageUrl} alt={m.name} />
            <div className="materialName">{m.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

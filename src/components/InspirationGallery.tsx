import { INSPIRATIONS } from '../data/inspirations';
import { useProjectStore } from '../state/projectStore';

export function InspirationGallery() {
  const { seedFromInspiration } = useProjectStore();

  return (
    <div className="panel">
      <h2>Inspirations</h2>
      <div className="cardGrid">
        {INSPIRATIONS.map((i) => (
          <button
            key={i.id}
            className="card"
            onClick={() =>
              seedFromInspiration({
                title: i.title,
                prompt: i.defaultPrompt,
                imageUrl: i.heroImageUrl,
                suggestedMaterialIds: i.suggestedMaterialIds,
              })
            }
          >
            <img src={i.heroImageUrl} alt={i.title} />
            <div className="cardBody">
              <div className="cardTitle">{i.title}</div>
              <div className="cardDesc">{i.description}</div>
              <div className="tagRow">
                {i.tags.slice(0, 3).map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

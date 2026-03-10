import { useState, useEffect } from 'react';
import { INSPIRATIONS } from '../data/inspirations';
import { useProjectStore } from '../state/projectStore';
import { Skeleton } from './Spinner';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';

const inspirationTitleKey: Record<string, TranslationKey> = {
  'modern-desk': 'inspirationModernDeskTitle',
  'coffee-table': 'inspirationCoffeeTableTitle',
  'bookshelf': 'inspirationBookshelfTitle',
  'dining-table': 'inspirationDiningTableTitle',
  'console-table': 'inspirationConsoleTableTitle',
  'side-table': 'inspirationSideTableTitle',
};

const inspirationDescKey: Record<string, TranslationKey> = {
  'modern-desk': 'inspirationModernDeskDesc',
  'coffee-table': 'inspirationCoffeeTableDesc',
  'bookshelf': 'inspirationBookshelfDesc',
  'dining-table': 'inspirationDiningTableDesc',
  'console-table': 'inspirationConsoleTableDesc',
  'side-table': 'inspirationSideTableDesc',
};

export function InspirationGallery() {
  const { seedFromInspiration, isProcessing } = useProjectStore();
  const { t } = useLanguage();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  if (isInitialLoading) {
    return (
      <div className="panel">
        <h2>{t('inspirationsTitle')}</h2>
        <div className="cardGrid">
          {[1, 2, 3].map(i => (
            <div key={i} className="card" style={{ cursor: 'default' }}>
              <Skeleton width={100} height={80} />
              <div className="cardBody">
                <Skeleton width="80%" height={16} />
                <Skeleton width="60%" height={14} />
                <Skeleton width="40%" height={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>{t('inspirationsTitle')}</h2>
      <div className="cardGrid">
        {INSPIRATIONS.map((i) => (
          <button
            key={i.id}
            className="card"
            disabled={isProcessing}
            onClick={() =>
              seedFromInspiration({
                title: i.title,
                prompt: i.defaultPrompt,
                imageUrl: i.heroImageUrl,
                suggestedMaterialIds: i.suggestedMaterialIds,
              })
            }
          >
            {!loadedImages.has(i.id) && <Skeleton width={100} height={80} />}
            <img 
              src={i.heroImageUrl} 
              alt={t(inspirationTitleKey[i.id] ?? 'inspirationModernDeskTitle')}
              style={{ display: loadedImages.has(i.id) ? 'block' : 'none' }}
              onLoad={() => handleImageLoad(i.id)}
            />
            <div className="cardBody">
              <div className="cardTitle">{t(inspirationTitleKey[i.id] ?? 'inspirationModernDeskTitle')}</div>
              <div className="cardDesc">{t(inspirationDescKey[i.id] ?? 'inspirationModernDeskDesc')}</div>
              <div className="tagRow">
                {i.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
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

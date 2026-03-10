import { useState, useEffect } from 'react';
import { MATERIALS } from '../data/materials';
import { useProjectStore } from '../state/projectStore';
import { Skeleton } from './Spinner';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';

const materialNameKey: Record<string, TranslationKey> = {
  'oak-natural': 'materialOakNatural',
  'walnut-dark': 'materialWalnutDark',
  'steel-brushed': 'materialSteelBrushed',
  'marble-white': 'materialMarbleWhite',
  'leather-black': 'materialLeatherBlack',
  'brass-polished': 'materialBrassPolished',
};

export function MaterialsLibrary() {
  const { project, toggleMaterial, isProcessing } = useProjectStore();
  const { t } = useLanguage();
  const selected = new Set(project.selectedMaterials);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  if (isInitialLoading) {
    return (
      <div className="panel">
        <h2>{t('materialsTitle')}</h2>
        <div className="materialsGrid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="material" style={{ cursor: 'default' }}>
              <Skeleton height={70} />
              <div style={{ marginTop: 8 }}>
                <Skeleton width="70%" height={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>{t('materialsTitle')}</h2>
      <div className="materialsGrid">
        {MATERIALS.map((m) => (
          <button
            key={m.id}
            className={selected.has(m.id) ? 'material selected' : 'material'}
            onClick={() => toggleMaterial(m.id)}
            title={m.properties.notes}
            disabled={isProcessing}
          >
            {!loadedImages.has(m.id) && <Skeleton height={70} />}
            <img 
              src={m.imageUrl} 
              alt={t(materialNameKey[m.id] ?? 'materialOakNatural')}
              style={{ display: loadedImages.has(m.id) ? 'block' : 'none' }}
              onLoad={() => handleImageLoad(m.id)}
            />
            <div className="materialName">{t(materialNameKey[m.id] ?? 'materialOakNatural')}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

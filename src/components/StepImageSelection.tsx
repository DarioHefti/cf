import { useRef, useState } from 'react';
import { INSPIRATIONS } from '../data/inspirations';
import { useProjectStore } from '../state/projectStore';
import { useLanguage } from '../i18n/LanguageContext';

// Map inspiration id → translation keys
const inspirationTitleKey: Record<string, 'inspirationModernDeskTitle' | 'inspirationCoffeeTableTitle' | 'inspirationBookshelfTitle' | 'inspirationDiningTableTitle' | 'inspirationConsoleTableTitle' | 'inspirationSideTableTitle'> = {
  'modern-desk': 'inspirationModernDeskTitle',
  'coffee-table': 'inspirationCoffeeTableTitle',
  'bookshelf': 'inspirationBookshelfTitle',
  'dining-table': 'inspirationDiningTableTitle',
  'console-table': 'inspirationConsoleTableTitle',
  'side-table': 'inspirationSideTableTitle',
};

const inspirationDescKey: Record<string, 'inspirationModernDeskDesc' | 'inspirationCoffeeTableDesc' | 'inspirationBookshelfDesc' | 'inspirationDiningTableDesc' | 'inspirationConsoleTableDesc' | 'inspirationSideTableDesc'> = {
  'modern-desk': 'inspirationModernDeskDesc',
  'coffee-table': 'inspirationCoffeeTableDesc',
  'bookshelf': 'inspirationBookshelfDesc',
  'dining-table': 'inspirationDiningTableDesc',
  'console-table': 'inspirationConsoleTableDesc',
  'side-table': 'inspirationSideTableDesc',
};

export function StepImageSelection() {
  const { seedFromInspiration, seedFromUpload } = useProjectStore();
  const { t } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t('uploadError'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      seedFromUpload(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1>{t('chooseTitle')}</h1>
        <p>{t('chooseSubtitle')}</p>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <div
          className={`upload-zone ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-icon">📤</div>
          <div className="upload-text">
            <strong>{t('uploadDrop')}</strong>
            <span>{t('uploadOr')}</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="divider">
        <span>{t('orChoose')}</span>
      </div>

      {/* Example Gallery */}
      <div className="examples-grid">
        {INSPIRATIONS.map((item) => (
          <button
            key={item.id}
            className="example-card"
            onClick={() =>
              seedFromInspiration({
                title: item.title,
                prompt: item.defaultPrompt,
                imageUrl: item.heroImageUrl,
                suggestedMaterialIds: item.suggestedMaterialIds,
              })
            }
          >
            <img src={item.heroImageUrl} alt={t(inspirationTitleKey[item.id])} />
            <div className="example-info">
              <div className="example-title">{t(inspirationTitleKey[item.id])}</div>
              <div className="example-desc">{t(inspirationDescKey[item.id])}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

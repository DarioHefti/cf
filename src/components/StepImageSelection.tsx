import { useRef, useState } from 'react';
import { INSPIRATIONS } from '../data/inspirations';
import { useProjectStore } from '../state/projectStore';

export function StepImageSelection() {
  const { seedFromInspiration, seedFromUpload } = useProjectStore();
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
      alert('Please upload an image file');
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
        <h1>Choose Your Starting Image</h1>
        <p>Upload your own design or select from our curated examples</p>
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
            <strong>Drop your image here</strong>
            <span>or click to browse</span>
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
        <span>or choose an example</span>
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
            <img src={item.heroImageUrl} alt={item.title} />
            <div className="example-info">
              <div className="example-title">{item.title}</div>
              <div className="example-desc">{item.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

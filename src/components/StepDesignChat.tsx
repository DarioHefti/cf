import { useState, useMemo, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { useProjectStore } from '../state/projectStore';
import { ProcessingIndicator, Skeleton } from './Spinner';
import { useLanguage } from '../i18n/LanguageContext';

export function StepDesignChat() {
  const { 
    project, 
    sendUserMessage, 
    selectVersion, 
    generate3D, 
    setStep,
    isProcessing 
  } = useProjectStore();
  const { t } = useLanguage();
  
  const [text, setText] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(() => {
    if (!project.selectedVersionId) return undefined;
    return project.conceptVersions.find((v) => v.id === project.selectedVersionId);
  }, [project.conceptVersions, project.selectedVersionId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [project.messages]);

  // Reset loading state when selected version changes
  useEffect(() => {
    if (selected) {
      setImageLoading(true);
    }
  }, [selected?.id]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isProcessing) return;
    setText('');
    await sendUserMessage(trimmed);
  };

  const handleProceedTo3D = () => {
    generate3D();
  };

  return (
    <div className="step-container design-chat-step">
      <div className="step-header">
        <div className="step-header-row">
          <button className="back-button" onClick={() => setStep(1)}>
            {t('back')}
          </button>
          <div>
            <h1>{t('refineTitel')}</h1>
            <p>{t('refineSubtitle')}</p>
          </div>
          <button 
            className="proceed-button"
            onClick={handleProceedTo3D}
            disabled={isProcessing || !project.selectedVersionId}
          >
            {t('generate3D')}
          </button>
        </div>
      </div>

      <div className="design-layout">
        {/* Left: Current Design Image */}
        <div className="design-preview">
          <div className="preview-card">
            {isProcessing ? (
              <Skeleton height={400} borderRadius="12px" />
            ) : selected ? (
              <>
                {imageLoading && <Skeleton height={400} borderRadius="12px" />}
                <img 
                  src={selected.outputImageUrl} 
                  alt={t('referenceDesign')}
                  style={{ display: imageLoading ? 'none' : 'block' }}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />
              </>
            ) : (
              <div className="empty-preview">
                <span>{t('noDesignSelected')}</span>
              </div>
            )}
          </div>

          {/* Version History */}
          {project.conceptVersions.length > 1 && (
            <div className="version-strip">
              <span className="version-label">{t('versionsLabel')}</span>
              <div className="version-thumbnails">
                {project.conceptVersions.map((v, index) => (
                  <button
                    key={v.id}
                    className={`version-thumb ${v.id === project.selectedVersionId ? 'selected' : ''}`}
                    onClick={() => selectVersion(v.id)}
                    disabled={isProcessing}
                    title={`Version ${index + 1}`}
                  >
                    <img src={v.outputImageUrl} alt={`Version ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Chat Panel */}
        <div className="chat-panel-container">
          <div className="chat-messages">
            {project.messages.map((m) => (
              <div key={m.id} className={`chat-msg chat-msg-${m.role}`}>
                {m.text}
              </div>
            ))}
            {isProcessing && (
              <ProcessingIndicator text={t('aiDesigning')} />
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={onSubmit} className="chat-input-form">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('chatPlaceholder')}
              disabled={isProcessing}
            />
            <button type="submit" disabled={!text.trim() || isProcessing}>
              {isProcessing ? t('sending') : t('send')}
            </button>
          </form>

          <div className="chat-suggestions">
            <span>{t('tryLabel')}</span>
            <button 
              onClick={() => setText('Make it more modern')} 
              disabled={isProcessing}
              className="suggestion-chip"
            >
              {t('suggestionModern')}
            </button>
            <button 
              onClick={() => setText('Add a drawer')} 
              disabled={isProcessing}
              className="suggestion-chip"
            >
              {t('suggestionDrawer')}
            </button>
            <button 
              onClick={() => setText('Make legs thinner')} 
              disabled={isProcessing}
              className="suggestion-chip"
            >
              {t('suggestionLegs')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

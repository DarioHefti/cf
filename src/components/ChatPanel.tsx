import { useState } from 'react';
import type { FormEvent } from 'react';
import { useProjectStore } from '../state/projectStore';
import { ProcessingIndicator } from './Spinner';
import { useLanguage } from '../i18n/LanguageContext';

export function ChatPanel() {
  const [text, setText] = useState('');
  const { project, sendUserMessage, isProcessing } = useProjectStore();
  const { t } = useLanguage();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isProcessing) return;
    setText('');
    await sendUserMessage(trimmed);
  };

  return (
    <div className="panel">
      <h2>💬 {t('step2Label')}</h2>
      <div className="messages">
        {project.messages.length === 0 ? (
          <div className="hint">
            {t('chatHint')}
          </div>
        ) : null}
        {project.messages.map((m) => (
          <div key={m.id} className={`msg msg-${m.role}`}>
            {m.text}
          </div>
        ))}
        {isProcessing && (
          <ProcessingIndicator text={t('aiDesigning')} />
        )}
      </div>
      <form onSubmit={onSubmit} className="chatForm">
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
    </div>
  );
}

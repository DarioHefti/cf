import { useState } from 'react';
import type { FormEvent } from 'react';
import { useProjectStore } from '../state/projectStore';
import { ProcessingIndicator } from './Spinner';

export function ChatPanel() {
  const [text, setText] = useState('');
  const { project, sendUserMessage, isProcessing } = useProjectStore();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || isProcessing) return;
    setText('');
    await sendUserMessage(trimmed);
  };

  return (
    <div className="panel">
      <h2>💬 Design Chat</h2>
      <div className="messages">
        {project.messages.length === 0 ? (
          <div className="hint">
            Pick an inspiration above, then describe changes you'd like — adjust dimensions, materials, style, or any details.
          </div>
        ) : null}
        {project.messages.map((m) => (
          <div key={m.id} className={`msg msg-${m.role}`}>
            {m.text}
          </div>
        ))}
        {isProcessing && (
          <ProcessingIndicator text="AI is designing your changes..." />
        )}
      </div>
      <form onSubmit={onSubmit} className="chatForm">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., 'Make the legs thinner' or 'Add a drawer'"
          disabled={isProcessing}
        />
        <button type="submit" disabled={!text.trim() || isProcessing}>
          {isProcessing ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

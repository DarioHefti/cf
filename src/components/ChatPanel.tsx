import { useState } from 'react';
import type { FormEvent } from 'react';
import { useProjectStore } from '../state/projectStore';

export function ChatPanel() {
  const [text, setText] = useState('');
  const { project, sendUserMessage } = useProjectStore();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    await sendUserMessage(trimmed);
    setText('');
  };

  const last = project.messages[project.messages.length - 1];
  const isBusy = last?.role === 'user';

  return (
    <div className="panel">
      <h2>Chat</h2>
      <div className="messages">
        {project.messages.length === 0 ? (
          <div className="hint">
            Pick an inspiration, then describe changes (size, shape, materials, etc.).
          </div>
        ) : null}
        {project.messages.map((m) => (
          <div key={m.id} className={`msg msg-${m.role}`}>
            {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="chatForm">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe changes you want e.g. 'make the legs thinner'"
        />
        <button type="submit" disabled={!text.trim() || isBusy}>
          Send
        </button>
      </form>
    </div>
  );
}

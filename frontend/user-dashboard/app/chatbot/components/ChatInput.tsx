'use client';

import { useState } from 'react';
import { MAX_MESSAGE_LENGTH } from '../constants';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [value, setValue] = useState('');

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) return;

    onSend(trimmed);
    setValue('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type your message…"
        rows={2}
        style={{
          flex: 1,
          resize: 'none',
          padding: '0.5rem',
          borderRadius: 4,
          border: '1px solid #cbd5e1',
          fontSize: 14,
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={disabled}
        style={{
          padding: '0 0.75rem',
          borderRadius: 4,
          border: '1px solid #cbd5e1',
          background: disabled ? '#e2e8f0' : '#2563eb',
          color: disabled ? '#64748b' : '#ffffff',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontWeight: 500,
        }}
      >
        Send
      </button>
    </div>
  );
}

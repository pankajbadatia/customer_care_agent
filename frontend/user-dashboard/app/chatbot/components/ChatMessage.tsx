'use client';

import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '0.75rem',
      }}
    >
      <div
        style={{
          maxWidth: '75%',
          padding: '0.6rem 0.75rem',
          borderRadius: 8,
          fontSize: 14,
          lineHeight: 1.4,
          whiteSpace: 'pre-wrap',
          backgroundColor: isUser ? '#2563eb' : '#f1f5f9',
          color: isUser ? '#ffffff' : '#0f172a',
        }}
      >
        {message.content}
      </div>
    </div>
  );
}

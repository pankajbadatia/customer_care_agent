'use client';

import ChatMessage from './ChatMessage';
import { ChatMessage as ChatMessageType } from '../types';

interface MessageListProps {
  messages: ChatMessageType[];
}

export default function MessageList({ messages }: MessageListProps) {
  if (!messages.length) {
    return (
      <div
        style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: 14,
          marginTop: '2rem',
        }}
      >
        Start a conversation by typing a message.
      </div>
    );
  }

  return (
    <>
      {messages.map((msg, idx) => (
        <ChatMessage key={msg.id ?? idx} message={msg} />
      ))}
    </>
  );
}

'use client';

import MessageList from './MessageList';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import ChatError from './ChatError';

import { useChat } from '../hooks/useChat';

export default function ChatWindow() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
  } = useChat();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: 900,
        margin: '0 auto',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
      }}
    >
      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
        }}
      >
        <MessageList messages={messages} />

        {isLoading && <TypingIndicator />}

        {error && <ChatError message={error} />}
      </div>

      {/* Input */}
      <div
        style={{
          borderTop: '1px solid #e2e8f0',
          padding: '0.75rem',
        }}
      >
        <ChatInput
          disabled={isLoading}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
}

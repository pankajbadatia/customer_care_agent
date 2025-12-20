'use client';

import React, { useEffect, useRef, useState } from 'react';
import Button from '../../shared-ui/Button';
import Modal from '../../shared-ui/Modal';
import { withAuthHeaders } from '@auth/auth';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatWindowProps {
  conversationId?: string;
}

/**
 * ChatWindow
 *
 * User-facing chatbot UI.
 * - Stateless backend (conversationId optional)
 * - Agent / RAG compatible
 * - Tool-call friendly
 */
export default function ChatWindow({ conversationId }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        ...withAuthHeaders({
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            conversationId,
            message: userMessage.content,
          }),
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed (${response.status})`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.reply ?? 'No response',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        backgroundColor: '#ffffff',
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
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              marginBottom: '0.75rem',
              display: 'flex',
              justifyContent:
                m.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                backgroundColor:
                  m.role === 'user' ? '#2563eb' : '#f1f5f9',
                color: m.role === 'user' ? '#ffffff' : '#0f172a',
                whiteSpace: 'pre-wrap',
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          borderTop: '1px solid #e2e8f0',
          padding: '0.75rem',
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <input
          type="text"
          value={input}
          placeholder="Ask about your ticket, SLA, or issue…"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '1px solid #cbd5f5',
            borderRadius: '0.375rem',
          }}
          disabled={loading}
        />

        <Button onClick={sendMessage} loading={loading}>
          Send
        </Button>
      </div>

      {/* Error */}
      {error && (
        <Modal
          isOpen={true}
          title="Chat Error"
          onClose={() => setError(null)}
        >
          <p style={{ color: '#dc2626' }}>{error}</p>
        </Modal>
      )}
    </div>
  );
}

'use client';

import { withAuthHeaders } from '../../auth/auth';
import { ChatRequest, ChatResponse } from './types';

const CHATBOT_API_BASE =
  process.env.NEXT_PUBLIC_CHATBOT_API_BASE || 'http://localhost:8010';

/**
 * Send a message to the chatbot service.
 */
export async function sendChatMessage(
  payload: ChatRequest
): Promise<ChatResponse> {
  const res = await fetch(`${CHATBOT_API_BASE}/chatbot/chat`, {
    method: 'POST',
    ...withAuthHeaders({
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to send chat message');
  }

  return res.json();
}

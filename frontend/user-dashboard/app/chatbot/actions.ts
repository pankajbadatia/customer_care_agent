'use client';

import { withAuthHeaders } from '@auth/auth';
import { ChatMessage, ChatResponse } from './types';

const CHAT_API_ENDPOINT = '/api/chat';
const CHAT_HISTORY_ENDPOINT = '/api/chat/history';

/**
 * Low-level fetch wrapper with timeout & auth
 */
async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit = {},
  timeoutMs = 15_000
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(input, {
      ...withAuthHeaders(init),
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

/**
 * Send a user message to the chatbot
 *
 * This hits the API Gateway which:
 * - invokes agent-service
 * - may call tools
 * - may run RAG
 * - returns final assistant reply
 */
export async function sendChatMessage(params: {
  conversationId?: string;
  message: string;
}): Promise<ChatResponse> {
  const response = await fetchWithTimeout(
    CHAT_API_ENDPOINT,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Chat request failed (${response.status}): ${text}`);
  }

  return response.json();
}

/**
 * Load previous conversation messages
 *
 * Used for:
 * - page refresh
 * - returning users
 * - multi-turn conversations
 */
export async function loadChatHistory(
  conversationId: string
): Promise<ChatMessage[]> {
  const response = await fetchWithTimeout(
    `${CHAT_HISTORY_ENDPOINT}?conversationId=${encodeURIComponent(conversationId)}`,
    { method: 'GET' }
  );

  if (!response.ok) {
    throw new Error(`Failed to load chat history (${response.status})`);
  }

  return response.json();
}

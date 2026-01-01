'use client';

import { useCallback, useState } from 'react';

import { sendChatMessage } from '../actions';
import {
  ChatMessage,
  ChatState,
} from '../types';
import { DEFAULT_ERROR_MESSAGE } from '../constants';

/**
 * Core chat hook.
 */
export function useChat() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
  });

  const sendMessage = useCallback(async (message: string) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: undefined,
      messages: [
        ...prev.messages,
        {
          role: 'user',
          content: message,
          timestamp: Date.now(),
        } as ChatMessage,
      ],
    }));

    try {
      const res = await sendChatMessage({
        conversation_id: state.conversationId,
        message,
      });

      setState((prev) => ({
        conversationId: res.conversation_id,
        messages: [
          ...prev.messages,
          ...res.messages.map((m) => ({
            ...m,
            timestamp: m.timestamp ?? Date.now(),
          })),
        ],
        isLoading: false,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err?.message || DEFAULT_ERROR_MESSAGE,
      }));
    }
  }, [state.conversationId]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
  };
}

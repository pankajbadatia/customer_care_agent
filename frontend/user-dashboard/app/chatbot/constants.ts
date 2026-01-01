/**
 * =========================================================
 * Chat UI limits
 * =========================================================
 */

export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_MESSAGES_IN_VIEW = 100;
export const TYPING_INDICATOR_DELAY_MS = 400;

/**
 * =========================================================
 * Chat roles (UI-facing)
 * =========================================================
 */

export const CHAT_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
  TOOL: 'tool',
} as const;

/**
 * =========================================================
 * Defaults
 * =========================================================
 */

export const DEFAULT_CONVERSATION_TITLE = 'New conversation';

export const DEFAULT_ERROR_MESSAGE =
  'Something went wrong. Please try again.';

/**
 * =========================================================
 * Retry / resiliency
 * =========================================================
 */

export const CHAT_RETRY_ATTEMPTS = 2;
export const CHAT_RETRY_BACKOFF_MS = 500;

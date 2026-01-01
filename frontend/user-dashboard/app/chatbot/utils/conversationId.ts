const STORAGE_KEY = 'csacp_chat_conversation_id';

/**
 * Get or create a conversation ID for the current session.
 */
export function getConversationId(): string {
  if (typeof window === 'undefined') {
    // SSR safety – return ephemeral id
    return generateId();
  }

  const existing = sessionStorage.getItem(STORAGE_KEY);
  if (existing) return existing;

  const id = generateId();
  sessionStorage.setItem(STORAGE_KEY, id);
  return id;
}

/**
 * Clear conversation ID (start fresh chat).
 */
export function clearConversationId(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(STORAGE_KEY);
}

/**
 * Generate a simple unique ID.
 */
function generateId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

import { ChatMessage, ChatRole } from '../types';

/**
 * Map a raw backend message into a ChatMessage
 * that the UI can safely render.
 */
export function mapBackendMessage(raw: any): ChatMessage {
  return {
    id: raw.id ?? undefined,
    role: normalizeRole(raw.role),
    content: String(raw.content ?? ''),
    timestamp: raw.timestamp
      ? Number(raw.timestamp)
      : Date.now(),
  };
}

/**
 * Map an array of backend messages.
 */
export function mapBackendMessages(rawMessages: any[]): ChatMessage[] {
  if (!Array.isArray(rawMessages)) return [];
  return rawMessages.map(mapBackendMessage);
}

/**
 * Normalize unknown roles safely.
 */
function normalizeRole(role: any): ChatRole {
  switch (role) {
    case 'user':
    case 'assistant':
    case 'system':
    case 'tool':
      return role;
    default:
      return 'assistant';
  }
}

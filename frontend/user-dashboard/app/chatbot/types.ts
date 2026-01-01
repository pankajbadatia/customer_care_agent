/**
 * =========================================================
 * Chat roles
 * =========================================================
 */

export type ChatRole = 'user' | 'assistant' | 'system' | 'tool';

/**
 * =========================================================
 * Core message types
 * =========================================================
 */

export interface ChatMessage {
  id?: string;
  role: ChatRole;
  content: string;
  timestamp?: number;
}

/**
 * =========================================================
 * Tool / agent metadata (future-ready)
 * =========================================================
 */

export interface ToolCall {
  tool_name: string;
  arguments?: Record<string, unknown>;
  result?: unknown;
}

export interface AgentMetadata {
  agent_name?: string;
  reasoning?: string;
  tool_calls?: ToolCall[];
}

/**
 * =========================================================
 * Request / response contracts
 * =========================================================
 */

export interface ChatRequest {
  conversation_id?: string;
  message: string;
}

export interface ChatResponse {
  conversation_id: string;
  messages: ChatMessage[];
  agent?: AgentMetadata;
}

/**
 * =========================================================
 * UI state helpers
 * =========================================================
 */

export interface ChatState {
  conversationId?: string;
  messages: ChatMessage[];
  isLoading: boolean;
  error?: string;
}

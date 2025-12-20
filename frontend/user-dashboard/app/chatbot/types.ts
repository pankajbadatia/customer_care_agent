/**
 * Core chat message type
 *
 * Used across:
 * - UI
 * - actions.ts
 * - API responses
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

/**
 * Tool invocation information
 * (important for agent transparency & debugging)
 */
export interface ToolInvocation {
  toolName: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  durationMs?: number;
  success?: boolean;
}

/**
 * Agent reasoning step
 * (maps to LangGraph / LangChain internal steps)
 */
export interface AgentStep {
  stepId: string;
  type: 'reasoning' | 'tool' | 'decision';
  description: string;
  toolInvocation?: ToolInvocation;
  timestamp: number;
}

/**
 * Chat response from backend
 *
 * Backend may include:
 * - final answer
 * - tool usage
 * - agent trace id
 */
export interface ChatResponse {
  conversationId: string;
  reply: string;
  messages?: ChatMessage[];
  agentSteps?: AgentStep[];
  traceId?: string;
}

/**
 * User feedback on chatbot response
 */
export interface ChatFeedback {
  conversationId: string;
  messageId: string;
  rating: 'positive' | 'negative';
  comment?: string;
}

'use client';

import { useEffect, useRef } from 'react';

/**
 * Auto-scroll hook for chat views.
 *
 * Usage:
 * const { containerRef, bottomRef } = useChatScroll(messages.length);
 */
export function useChatScroll(dependency: number) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Prefer scrolling to an explicit bottom anchor if provided
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Fallback: scroll container to bottom
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [dependency]);

  return {
    containerRef,
    bottomRef,
  };
}

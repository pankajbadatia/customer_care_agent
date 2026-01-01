/**
 * Retry an async operation with exponential backoff.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  attempts: number,
  backoffMs: number
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      if (i === attempts) break;

      await sleep(backoffMs * Math.pow(2, i));
    }
  }

  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

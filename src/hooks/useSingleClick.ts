import { useRef, useCallback } from "react";

// for API Calls | Buttons
export default function useSingleClick<
  T extends (...args: any[]) => Promise<void>
>(asyncFn: T): (...args: Parameters<T>) => void {
  const clickedRef = useRef(false);

  return useCallback(
    async (...args: Parameters<T>) => {
      if (clickedRef.current) return;
      clickedRef.current = true;

      try {
        await asyncFn(...args);
      } catch (err) {
        throw err;
      } finally {
        clickedRef.current = false;
      }
    },
    [asyncFn]
  );
}

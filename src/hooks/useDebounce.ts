// hooks/useDebouncedCallback.ts
import { useRef, useEffect } from "react";
import debounce from "lodash/debounce";

/**
 * Custom hook that returns a debounced callback
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): T {
  const callbackRef = useRef<T>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useRef(
    debounce((...args: any[]) => {
      callbackRef.current(...args);
    }, delay),
  ).current;

  // cancel on unmount
  useEffect(() => {
    return () => {
      debouncedFn.cancel();
    };
  }, [debouncedFn]);

  return debouncedFn as unknown as T;
}

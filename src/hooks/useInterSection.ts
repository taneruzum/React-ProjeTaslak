import { useState, useEffect, useRef, useCallback } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  once?: boolean;
}

interface UseIntersectionObserverReturn<T extends HTMLElement> {
  ref: React.RefObject<T>;
  isVisible: boolean;
}

export default function useIntersectionObserver<T extends HTMLElement>({
  threshold = 0.2,
  root = null,
  rootMargin = "0px",
  once = true,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn<T> {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null) as React.RefObject<T>;

  const callbackFunction = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once) observer.unobserve(entry.target);
      }
    },
    [once]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, {
      threshold,
      root,
      rootMargin,
    });

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [callbackFunction, threshold, root, rootMargin]);

  return { ref, isVisible };
}

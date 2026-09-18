import { useState, useEffect, useRef, useCallback } from 'react';

function useScrollAnimation(threshold = 0.15, rootMargin = '0px') {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersect = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    },
    []
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [handleIntersect, threshold, rootMargin]);

  return [ref, isVisible];
}

export default useScrollAnimation;
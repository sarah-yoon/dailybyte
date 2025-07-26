import { useEffect, useState } from 'react';

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    let timeoutId: number;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      
      // Calculate scroll velocity (pixels per millisecond)
      const velocity = timeDiff > 0 ? scrollDiff / timeDiff : 0;
      setScrollVelocity(velocity);
      
      const newDirection = currentScrollY > lastScrollY ? 'down' : 'up';

      if (currentScrollY !== lastScrollY) {
        setDirection(newDirection);
        setScrolling(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setScrolling(false);
          setScrollVelocity(0);
        }, 100); // small delay to detect scroll stop
      }

      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { direction, scrolling, scrollVelocity };
} 
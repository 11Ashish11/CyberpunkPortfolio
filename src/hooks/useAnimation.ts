import { useEffect, useState, useRef } from 'react';
// import { useInView } from 'framer-motion';

export const useScrollAnimation = (options?: IntersectionObserverInit) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-100px",
        ...options
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
};

export const useTypingEffect = (text: string, speed: number = 100, startDelay: number = 0) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    setDisplayedText('');
    setIsComplete(false);

    const startTimer = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(timer);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
};

export const useGlitchEffect = (trigger: boolean = false, duration: number = 2000) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    setIsGlitching(true);
    const timer = setTimeout(() => {
      setIsGlitching(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [trigger, duration]);

  return isGlitching;
};
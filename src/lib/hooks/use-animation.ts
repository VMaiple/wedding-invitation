'use client';

import { useEffect, useState, createRef } from 'react';

// Хук для последовательных анимаций с задержкой
export const useSequenceAnimation = (
  sequence: boolean[],
  delays: number[]
): boolean[] => {
  const [states, setStates] = useState<boolean[]>(sequence);

  useEffect(() => {
    // Для каждого состояния установим таймаут на основе задержки
    sequence.forEach((shouldAnimate, index) => {
      if (shouldAnimate) {
        const timer = setTimeout(() => {
          setStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = true;
            return newStates;
          });
        }, delays[index]);

        return () => clearTimeout(timer);
      }
    });
  }, [sequence, delays]);

  return states;
};

// Хук для отслеживания видимости элемента при скролле
export const useScrollAnimation = (
  threshold = 0.1
): [React.RefObject<HTMLElement>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = createRef<HTMLElement>();

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);

  return [ref, isVisible];
};

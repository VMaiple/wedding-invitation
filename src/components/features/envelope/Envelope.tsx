'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import {
  envelopeVariants,
  envelopeFlapVariants,
  envelopeContentVariants,
} from '@/lib/animations';
import { useAnimation } from '@/context/animation-context';

interface EnvelopeProps {
  className?: string;
  onYesClick?: () => void;
  onNoClick?: () => void;
}

export function Envelope({
  className,
  onYesClick,
  onNoClick,
}: EnvelopeProps) {
  const { state, openEnvelope, showContent } = useAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleYesClick = () => {
    openEnvelope();
    setTimeout(() => {
      showContent();
      onYesClick?.();
    }, 1000); // Задержка для анимации открытия конверта
  };

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          'relative flex h-[300px] w-[400px] max-w-full flex-col items-center',
          className
        )}
        variants={envelopeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Задний фон конверта */}
        <div className="absolute h-full w-full rounded-lg bg-beige shadow-lg" />

        {/* Клапан конверта */}
        <motion.div
          className="absolute top-0 z-10 h-[150px] w-full origin-top rounded-t-lg bg-blue-light"
          variants={envelopeFlapVariants}
          initial="closed"
          animate={state.envelopeOpened ? 'opened' : 'closed'}
          style={{ transformStyle: 'preserve-3d' }}
        />

        {/* Внутренняя часть конверта */}
        <AnimatePresence>
          {state.contentVisible && (
            <motion.div
              className="absolute inset-x-0 top-[50px] z-0 mx-auto flex h-[200px] w-[80%] flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-inner"
              variants={envelopeContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h2 className="mb-4 font-serif text-xl font-medium text-gray-800">
                Вы приглашены на нашу свадьбу!
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Мы были бы рады видеть вас на нашем особенном дне.
                Пожалуйста, подтвердите свое присутствие.
              </p>
              <div className="flex space-x-4">
                <Button onClick={handleYesClick}>Да, я приду</Button>
                <Button variant="outline" onClick={onNoClick}>
                  К сожалению, не смогу
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Боковые части конверта */}
        <div className="absolute bottom-0 h-[150px] w-full rounded-b-lg bg-blue-light/90" />
      </motion.div>
    </AnimatePresence>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { useAnimation } from '@/context/animation-context';

interface EnvelopeProps {
  className?: string;
  onYesClick?: () => void;
  onNoClick?: () => void;
}

export function Envelope({ className, onYesClick, onNoClick }: EnvelopeProps) {
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
    }, 1000);
  };

  return (
    <div className={cn('relative perspective w-full max-w-md mx-auto', className)}>
      {/* Конверт */}
      <motion.div
        className="relative preserve-3d"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 0.2
        }}
      >
        {/* Основа конверта */}
        <div className="relative h-[350px] w-full bg-gradient-to-r from-blue-light to-blue-light/90 rounded-lg shadow-xl overflow-hidden">
          {/* Декоративный узор на конверте */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-5 left-5 right-5 bottom-5 border-2 border-white rounded-md"></div>
            <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                  {i % 7 === 0 && <Heart size={12} className="text-white" />}
                </div>
              ))}
            </div>
          </div>

          {/* Клапан конверта */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-beige to-beige/90 rounded-t-lg origin-top"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ rotateX: 0 }}
            animate={{
              rotateX: state.envelopeOpened ? 180 : 0,
              zIndex: state.envelopeOpened ? 0 : 10
            }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 15
            }}
          >
            {/* Печать на клапане */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center opacity-90 shadow-md">
              <Heart size={24} className="text-white" fill="white" />
            </div>

            {/* Узор на клапане */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-3 left-3 right-3 bottom-3 border border-gray-700 rounded-md"></div>
            </div>
          </motion.div>

          {/* Боковые части конверта */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-light/95 rounded-b-lg border-t border-blue.light/50"></div>

          {/* Тень внутри конверта */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Содержимое конверта */}
        <AnimatePresence>
          {state.contentVisible && (
            <motion.div
              className="absolute inset-4 top-10 z-20 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -30, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.2
              }}
            >
              {/* Декоративный элемент */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Heart className="h-12 w-12 fill-red-500 text-red-500 drop-shadow-md" fill="currentColor" />
              </div>

              {/* Содержимое приглашения */}
              <div className="text-center pt-6">
                <h2 className="font-serif text-2xl font-medium text-gray-800 mb-2">
                  Вы приглашены на нашу свадьбу!
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-light to-beige mx-auto my-4"></div>
                <p className="mb-6 text-gray-600">
                  Мы были бы рады видеть вас на нашем особенном дне.
                  Пожалуйста, подтвердите свое присутствие.
                </p>

                {/* Кнопки подтверждения */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-4">
                  <Button onClick={handleYesClick} size="lg" className="min-w-[150px] shadow-md hover:shadow-lg transition-all">
                    Да, я приду
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onNoClick}
                    size="lg"
                    className="min-w-[150px] hover:bg-red-50 transition-all"
                  >
                    К сожалению, не смогу
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

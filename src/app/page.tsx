'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '@/components/layout';
import { Envelope } from '@/components/features/envelope';
import { Invitation } from '@/components/features/invitation';
import { RSVPForm } from '@/components/features/rsvp-form';
import { useAnimation } from '@/context/animation-context';
import { RsvpFormData } from '@/lib/utils/validation';

export default function HomePage() {
  const [step, setStep] = useState<'envelope' | 'rsvp' | 'confirmation'>('envelope');
  const [guestName, setGuestName] = useState<string>('');
  const { state, showEnvelope, openEnvelope, showContent } = useAnimation();
  const [mounted, setMounted] = useState(false);

  // Обработка успешной отправки формы
  const handleRsvpSubmit = async (data: RsvpFormData) => {
    try {
      // Отправка данных на сервер
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RSVP');
      }

      // Сохраняем имя гостя для персонализации приглашения
      setGuestName(data.guest.name);

      // Переходим к шагу подтверждения
      setStep('confirmation');
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз.');
    }
  };

  // Обработка выбора "Да" в конверте
  const handleYesClick = () => {
    setStep('rsvp');
  };

  // Обработка выбора "Нет" в конверте
  const handleNoClick = () => {
    alert('Очень жаль! Надеемся увидеть вас в следующий раз.');
  };

  // Эффект для инициализации анимации при загрузке страницы
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      showEnvelope();
      setTimeout(() => {
        openEnvelope();
        setTimeout(() => {
          showContent();
        }, 500);
      }, 1000);
    }, 500);

    return () => clearTimeout(timer);
  }, [showEnvelope, openEnvelope, showContent]);

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Фон */}
      <div className="envelope-background fixed inset-0 z-0" />

      {/* Градиентный оверлей */}
      <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm" />

      {/* Основной контент */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {step === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[80vh] flex-col items-center justify-center"
            >
              <Envelope
                onYesClick={handleYesClick}
                onNoClick={handleNoClick}
                className="mx-auto"
              />
            </motion.div>
          )}

          {step === 'rsvp' && (
            <motion.div
              key="rsvp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="my-10 w-full max-w-xl"
            >
              <h1 className="mb-6 text-center font-serif text-3xl font-medium text-gray-800">
                Мы будем рады видеть вас на нашей свадьбе!
              </h1>
              <RSVPForm
                onSubmit={handleRsvpSubmit}
                className="mx-auto"
              />
            </motion.div>
          )}

          {step === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[80vh] flex-col items-center justify-center"
            >
              <h1 className="mb-8 text-center font-serif text-3xl font-medium text-gray-800">
                Спасибо за подтверждение!
              </h1>
              <Invitation
                guestName={guestName}
                className="mx-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Футер */}
      <Footer className="relative z-20" />
    </div>
  );
}

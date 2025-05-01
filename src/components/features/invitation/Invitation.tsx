'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Calendar, Clock, MapPin } from 'lucide-react';

interface InvitationProps {
  className?: string;
  guestName?: string;
}

export function Invitation({ className, guestName = 'Дорогой гость' }: InvitationProps) {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Card
      className={cn(
        'max-w-xl border-none bg-white/90 backdrop-blur-sm',
        className
      )}
    >
      <CardHeader className="pb-2 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        >
          <Heart className="mx-auto mb-4 h-10 w-10 fill-blue-light text-blue-light" fill="currentColor" />
        </motion.div>
        <CardTitle className="font-serif text-3xl font-medium">
          {guestName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          className="mt-4 space-y-6 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariant}>
            <p className="text-lg leading-relaxed text-gray-700">
              С радостью приглашаем Вас на торжественное празднование нашего бракосочетания
            </p>
          </motion.div>

          <motion.div variants={itemVariant}>
            <p className="my-4 font-serif text-2xl font-semibold text-blue-light">
              Иван & Мария
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-4 rounded-lg bg-blue-light/10 p-4 text-left"
            variants={itemVariant}
          >
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-blue-light" />
              <span className="font-medium">15 июня 2025</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-blue-light" />
              <span className="font-medium">Начало в 15:00</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-light" />
              <span className="font-medium">
                Свадебный зал "Рай", ул. Цветочная, д. 7
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariant}>
            <p className="mt-6 text-sm text-gray-500">
              Пожалуйста, подтвердите своё присутствие до 1 июня 2025
            </p>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface HeaderProps {
  transparent?: boolean;
  className?: string;
}

export function Header({ transparent = false, className }: HeaderProps) {
  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 flex h-16 items-center px-4 md:px-6',
        transparent ? 'bg-transparent' : 'bg-white/90 backdrop-blur-sm',
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link href="/" passHref>
          <motion.div
            className="flex cursor-pointer items-center space-x-2 font-serif text-xl font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heart size={20} className="text-blue-light" />
            <span className="bg-gradient-to-r from-blue-light to-beige bg-clip-text text-transparent">
              Свадебное приглашение
            </span>
          </motion.div>
        </Link>

        <nav className="hidden items-center space-x-4 md:flex">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-light"
            >
              Главная
            </Link>
          </motion.div>
        </nav>
      </div>
    </header>
  );
}

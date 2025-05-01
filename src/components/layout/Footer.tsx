'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'mt-auto bg-white py-6 text-center text-gray-500',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-1 text-sm">
            <span>Создано с</span>
            <Heart
              size={14}
              className="fill-blue-light text-blue-light"
              fill="currentColor"
            />
            <span>для особенного дня</span>
          </div>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Свадебное приглашение
          </p>
        </div>
      </div>
    </footer>
  );
}

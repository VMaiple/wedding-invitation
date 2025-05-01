'use client';

import {
  InputHTMLAttributes,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  animated?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      fullWidth = false,
      animated = false,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

    // Объединяем ref от forwardRef и локальный ref
    useEffect(() => {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, [ref]);

    // Отслеживаем изменения value для обновления состояния hasValue
    useEffect(() => {
      setHasValue(!!props.value);
    }, [props.value]);

    return (
      <div
        className={cn(
          'flex flex-col space-y-1',
          fullWidth ? 'w-full' : 'w-auto',
          className
        )}
      >
        {label && (
          <label
            className={cn(
              'text-sm font-medium text-gray-700 transition-all',
              animated && focused ? 'text-blue-light' : '',
              error ? 'text-red-500' : ''
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={inputRef}
          className={cn(
            'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-all focus:border-blue-light focus:outline-none focus:ring-1 focus:ring-blue-light',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : '',
            fullWidth ? 'w-full' : 'w-auto'
          )}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(!!e.target.value);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            props.onChange?.(e);
          }}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

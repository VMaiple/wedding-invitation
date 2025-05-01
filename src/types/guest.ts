import { Guest, Companion } from '@prisma/client';

// Расширенный тип гостя с информацией о сопровождающих
export type GuestWithCompanions = Guest & {
  companions: Companion[];
};

// Типы для ответов API
export type GuestResponse = {
  success: boolean;
  data?: GuestWithCompanions;
  error?: string;
};

export type GuestsResponse = {
  success: boolean;
  data?: GuestWithCompanions[];
  error?: string;
};

// Экспорт базовых типов из Prisma
export type { Guest, Companion };

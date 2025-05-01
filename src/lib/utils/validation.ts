import { z } from 'zod';

// Схема валидации для гостей
export const guestSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Некорректный формат email').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  attendance: z.boolean().default(false),
  message: z.string().optional().or(z.literal('')),
  dietaryRestrictions: z.string().optional().or(z.literal('')),
  specialRequests: z.string().optional().or(z.literal('')),
});

// Схема валидации для сопровождающих
export const companionSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  relationship: z.string().optional().or(z.literal('')),
  dietaryRestrictions: z.string().optional().or(z.literal('')),
});

// Схема валидации для RSVP формы
export const rsvpFormSchema = z.object({
  guest: guestSchema,
  companions: z.array(companionSchema).optional().default([]),
});

// Тип данных RSVP формы
export type RsvpFormData = z.infer<typeof rsvpFormSchema>;
export type GuestData = z.infer<typeof guestSchema>;
export type CompanionData = z.infer<typeof companionSchema>;

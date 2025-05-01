import { z } from 'zod';

export const guestSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Некорректный email').nullable().optional(),
  phone: z.string().nullable().optional(),
  attendance: z.boolean().default(true),
  message: z.string().nullable().optional(),
  dietaryRestrictions: z.string().nullable().optional(),
  specialRequests: z.string().nullable().optional(),
});

export const companionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  relationship: z.string().nullable().optional(),
  dietaryRestrictions: z.string().nullable().optional(),
});

export const rsvpSchema = z.object({
  guest: guestSchema,
  companions: z.array(companionSchema).optional().default([]),
});

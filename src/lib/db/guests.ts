import { prisma } from './index';
import { type RsvpFormData } from '@/lib/utils/validation';
import { type GuestWithCompanions } from '@/types/guest';

/**
 * Создает нового гостя с сопровождающими
 */
export async function createGuest(data: RsvpFormData): Promise<GuestWithCompanions> {
  const { guest, companions } = data;

  return prisma.guest.create({
    data: {
      name: guest.name,
      email: guest.email || null,
      phone: guest.phone || null,
      attendance: true,
      message: guest.message || null,
      dietaryRestrictions: guest.dietaryRestrictions || null,
      specialRequests: guest.specialRequests || null,
      companions: {
        create: companions.map((companion) => ({
          name: companion.name,
          relationship: companion.relationship || null,
          dietaryRestrictions: companion.dietaryRestrictions || null,
        })),
      },
    },
    include: {
      companions: true,
    },
  });
}

/**
 * Получает всех гостей с их сопровождающими
 */
export async function getAllGuests(): Promise<GuestWithCompanions[]> {
  return prisma.guest.findMany({
    include: {
      companions: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Получает гостя по идентификатору
 */
export async function getGuestById(id: string): Promise<GuestWithCompanions | null> {
  return prisma.guest.findUnique({
    where: { id },
    include: {
      companions: true,
    },
  });
}

/**
 * Обновляет информацию о госте
 */
export async function updateGuest(
  id: string,
  data: RsvpFormData
): Promise<GuestWithCompanions> {
  const { guest, companions } = data;

  // Сначала удаляем всех существующих сопровождающих
  await prisma.companion.deleteMany({
    where: { guestId: id },
  });

  // Затем обновляем гостя и создаем новых сопровождающих
  return prisma.guest.update({
    where: { id },
    data: {
      name: guest.name,
      email: guest.email || null,
      phone: guest.phone || null,
      attendance: true,
      message: guest.message || null,
      dietaryRestrictions: guest.dietaryRestrictions || null,
      specialRequests: guest.specialRequests || null,
      companions: {
        create: companions.map((companion) => ({
          name: companion.name,
          relationship: companion.relationship || null,
          dietaryRestrictions: companion.dietaryRestrictions || null,
        })),
      },
    },
    include: {
      companions: true,
    },
  });
}

/**
 * Удаляет гостя и всех его сопровождающих
 */
export async function deleteGuest(id: string): Promise<void> {
  await prisma.guest.delete({
    where: { id },
  });
}

/**
 * Получает статистику по гостям
 */
export async function getGuestStats() {
  const totalGuests = await prisma.guest.count();
  const totalConfirmed = await prisma.guest.count({
    where: { attendance: true },
  });
  const totalCompanions = await prisma.companion.count();

  return {
    totalGuests,
    totalConfirmed,
    totalCompanions,
    totalAttendees: totalConfirmed + totalCompanions,
  };
}

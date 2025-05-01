import { NextResponse } from 'next/server';
import { rsvpSchema } from '@/lib/db/schema';
import { createGuest, updateGuest, getGuestById } from '@/lib/db/guests';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Валидация данных
    const validationResult = rsvpSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    // Создаем гостя
    const guest = await createGuest(validationResult.data);

    return NextResponse.json(
      {
        success: true,
        data: guest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating RSVP:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create RSVP',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Guest ID is required',
        },
        { status: 400 }
      );
    }

    // Проверяем существование гостя
    const existingGuest = await getGuestById(id);

    if (!existingGuest) {
      return NextResponse.json(
        {
          success: false,
          error: 'Guest not found',
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Валидация данных
    const validationResult = rsvpSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    // Обновляем гостя
    const updatedGuest = await updateGuest(id, validationResult.data);

    return NextResponse.json({
      success: true,
      data: updatedGuest,
    });
  } catch (error) {
    console.error('Error updating RSVP:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update RSVP',
      },
      { status: 500 }
    );
  }
}

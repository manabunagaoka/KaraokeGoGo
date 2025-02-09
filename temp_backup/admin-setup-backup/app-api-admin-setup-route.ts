import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const { userId } = auth();
    console.log('API: Received admin setup request for user:', userId);

    if (!userId) {
      console.log('API: No user ID found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedUser = await prisma.user.upsert({
      where: { id: userId },
      update: { isAdmin: true },
      create: { 
        id: userId,
        isAdmin: true,
      }
    });

    console.log('API: Updated user:', updatedUser);

    return NextResponse.json({ 
      success: true, 
      message: 'Admin user created successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
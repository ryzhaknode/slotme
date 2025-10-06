import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function seedBookings() {
  try {
    console.log('🌱 Seeding bookings...');

    // Получаем первого пользователя и первую услугу
    const user = await prisma.user.findFirst();
    const service = await prisma.service.findFirst();

    if (!user || !service) {
      console.log('❌ No user or service found. Please seed users and services first.');
      return;
    }

    // Создаем несколько тестовых бронирований
    const bookings = [
      {
        date: new Date('2025-10-01'),
        startTime: '12:00',
        endTime: '13:00',
        serviceId: service.id,
        userId: user.id,
      },
      {
        date: new Date('2025-10-01'),
        startTime: '14:00',
        endTime: '15:00',
        serviceId: service.id,
        userId: user.id,
      },
      {
        date: new Date('2025-10-01'),
        startTime: '16:00',
        endTime: '17:00',
        serviceId: service.id,
        userId: user.id,
      },
    ];

    for (const bookingData of bookings) {
      await prisma.booking.create({
        data: bookingData,
      });
    }

    console.log('✅ Bookings seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding bookings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedBookings();

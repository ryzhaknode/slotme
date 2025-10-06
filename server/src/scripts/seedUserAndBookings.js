import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedUserAndBookings() {
  try {
    console.log('🌱 Seeding user and bookings...');

    // Создаем тестового пользователя
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const user = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
      },
    });

    console.log('✅ User created:', user.email);

    // Получаем первую услугу
    const service = await prisma.service.findFirst();
    
    if (!service) {
      console.log('❌ No service found. Please seed services first.');
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
    console.error('❌ Error seeding user and bookings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedUserAndBookings();

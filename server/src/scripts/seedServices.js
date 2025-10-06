import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

const services = [
  {
    name: 'Jazz Funk',
    description: 'Енергійний та виразний танець, який поєднує елементи джазу та фанку. Ідеально підходить для розвитку координації, ритму та виразності.',
    duration: 'Пн-Пт, 18:00 - 20:00',
    price: '500 грн/місяць'
  },
  {
    name: 'Contemporary',
    description: 'Сучасний танець, який дозволяє висловити емоції через рух. Розвиває гнучкість, силу та артистизм.',
    duration: 'Вт-Чт, 19:00 - 21:00',
    price: '450 грн/місяць'
  },
  {
    name: 'Hip-Hop',
    description: 'Уличний танець з елементами брейк-дансу. Розвиває ритм, координацію та витривалість.',
    duration: 'Сб-Нд, 15:00 - 17:00',
    price: '400 грн/місяць'
  },
  {
    name: 'Стретчинг',
    description: 'Комплекс вправ для розвитку гнучкості, розслаблення м\'язів та покращення загального самопочуття.',
    duration: 'Пн-Ср-Пт, 17:00 - 18:00',
    price: '300 грн/місяць'
  },
  {
    name: 'Хореографія',
    description: 'Індивідуальні заняття з постановки танцю. Розробка унікальних хореографічних композицій.',
    duration: 'Індивідуальні заняття',
    price: '800 грн/заняття'
  },
  {
    name: 'Консультація',
    description: 'Індивідуальна консультація з вибору напрямку танцю, складання персонального плану тренувань.',
    duration: 'За домовленістю',
    price: '200 грн/консультація'
  }
];

async function seedServices() {
  try {
    console.log('🌱 Seeding services...');
    
    // Проверяем, есть ли уже услуги
    const existingServices = await prisma.service.count();
    if (existingServices > 0) {
      console.log('✅ Services already exist, skipping...');
      return;
    }
    
    for (const service of services) {
      await prisma.service.create({
        data: service
      });
      console.log(`✅ Created service: ${service.name}`);
    }
    
    console.log('🎉 All services seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding services:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedServices();

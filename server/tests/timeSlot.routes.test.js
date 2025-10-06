import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import { startServer } from '../src/server.js';
import prisma from '../prisma/prisma.js';

// Mock authenticate to inject user for protected endpoints
vi.mock('../src/middlewares/authenticate.js', () => ({
  authenticate: (req, _res, next) => {
    req.user = { id: 'test-user-id', name: 'Test User', email: 'test@example.com' };
    req.accessToken = 'test-access-token';
    next();
  },
}));

const app = startServer();

describe('TimeSlot routes', () => {
  let serviceId;
  let createdBookingId;
  let userId;

  beforeAll(async () => {
    await prisma.$connect();
    // Ensure user exists to satisfy FK
    const user = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: { name: 'Test User', email: 'test@example.com', password: 'hashed' },
    });
    userId = user.id;
    // Ensure at least one service exists for booking
    const service = await prisma.service.create({
      data: { name: 'Massage', description: 'Relax', duration: '60', price: '50' },
    });
    serviceId = service.id;
  });

  afterAll(async () => {
    if (createdBookingId) {
      try { await prisma.booking.delete({ where: { id: createdBookingId } }); } catch {}
    }
    if (serviceId) {
      try { await prisma.service.delete({ where: { id: serviceId } }); } catch {}
    }
    await prisma.$disconnect();
  });

  it('GET /api/time-slots/:date returns generated slots with availability', async () => {
    const today = new Date().toISOString().slice(0, 10);
    const res = await request(app).get(`/api/time-slots/${today}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data[0]).toHaveProperty('startTime');
    expect(res.body.data[0]).toHaveProperty('isAvailable');
  });

  it('POST /api/time-slots/bookings creates a booking if free', async () => {
    const today = new Date().toISOString().slice(0, 10);
    const slotId = `${today}-11:00`;
    const payload = { slotId, serviceId, userId, date: today };

    const res = await request(app)
      .post('/api/time-slots/bookings')
      .set('Authorization', 'Bearer test')
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('id');
    createdBookingId = res.body.data.id;
  });

  it('DELETE /api/time-slots/bookings/:bookingId cancels booking', async () => {
    const res = await request(app)
      .delete(`/api/time-slots/bookings/${createdBookingId}`)
      .set('Authorization', 'Bearer test');
    expect(res.status).toBe(200);
    createdBookingId = undefined;
  });
});



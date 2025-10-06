import { describe, it, expect, beforeAll, afterAll, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { startServer } from '../src/server.js';
import prisma from '../prisma/prisma.js';

// Mock authenticate to bypass auth and inject a fake user
vi.mock('../src/middlewares/authenticate.js', () => ({
  authenticate: (req, _res, next) => {
    req.user = { id: 'test-user-id', name: 'Test User', email: 'test@example.com' };
    req.accessToken = 'test-access-token';
    next();
  },
}));

const app = startServer();

describe('Service routes', () => {
  let createdServiceId;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    if (createdServiceId) {
      try { await prisma.service.delete({ where: { id: createdServiceId } }); } catch {}
    }
    await prisma.$disconnect();
  });

  it('GET /api/services should return array (public)', async () => {
    const res = await request(app).get('/api/services');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/services should create a service (auth mocked)', async () => {
    const payload = { name: 'Yoga', description: 'Yoga class', duration: '60', price: '20' };
    const res = await request(app)
      .post('/api/services')
      .send(payload)
      .set('Authorization', 'Bearer test');

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe(payload.name);
    createdServiceId = res.body.data.id;
  });

  it('GET /api/services/:id should return service by id', async () => {
    const res = await request(app).get(`/api/services/${createdServiceId}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(createdServiceId);
  });

  it('PUT /api/services/:id should update service (auth mocked)', async () => {
    const res = await request(app)
      .put(`/api/services/${createdServiceId}`)
      .send({ name: 'Yoga Updated', description: 'Updated description', duration: '90', price: '25', isActive: true })
      .set('Authorization', 'Bearer test');

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe('Yoga Updated');
  });

  it('DELETE /api/services/:id should delete service (auth mocked)', async () => {
    const res = await request(app)
      .delete(`/api/services/${createdServiceId}`)
      .set('Authorization', 'Bearer test');

    expect(res.status).toBe(200);
    createdServiceId = undefined;
  });
});



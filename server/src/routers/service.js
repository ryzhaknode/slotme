import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/service.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateParams } from '../middlewares/validateParams.js';
import { serviceValidation } from '../validation/service.js';

const router = express.Router();

// GET /api/services - получить все услуги
router.get('/', getAllServices);

// GET /api/services/:id - получить услугу по ID
router.get('/:id', validateParams, getServiceById);

// POST /api/services - создать услугу (только для админов)
router.post('/', authenticate, validateBody(serviceValidation), createService);

// PUT /api/services/:id - обновить услугу (только для админов)
router.put('/:id', authenticate, validateParams, validateBody(serviceValidation), updateService);

// DELETE /api/services/:id - удалить услугу (только для админов)
router.delete('/:id', authenticate, validateParams, deleteService);

export default router;

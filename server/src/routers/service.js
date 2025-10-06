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

// GET /api/services - get all active services
router.get('/', getAllServices);

// GET /api/services/:id - get service by ID
router.get('/:id', validateParams, getServiceById);

// POST /api/services - create a service (requires authentication)
router.post('/', authenticate, validateBody(serviceValidation), createService);

// PUT /api/services/:id - update a service (requires authentication)
router.put('/:id', authenticate, validateParams, validateBody(serviceValidation), updateService);

// DELETE /api/services/:id - delete a service (requires authentication)
router.delete('/:id', authenticate, validateParams, deleteService);

export default router;

import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getContactsController, getMeController, updateMeController } from '../controllers/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import Joi from 'joi';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getContactsController));
router.get('/me', authenticate, ctrlWrapper(getMeController));
router.patch(
  '/me',
  authenticate,
  validateBody(
    Joi.object({
      name: Joi.string().min(1).max(100).optional(),
      lastName: Joi.string().min(1).max(100).optional(),
      age: Joi.number().integer().min(0).max(120).optional(),
    })
  ),
  ctrlWrapper(updateMeController)
);

export default router;

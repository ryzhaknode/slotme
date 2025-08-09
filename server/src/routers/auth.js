import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshSessionController));

export default router;

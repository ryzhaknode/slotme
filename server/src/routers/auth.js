import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  logoutUserController,
  refreshSessionController,
  sendLoginCodeController,
  verifyLoginCodeController,
} from '../controllers/auth.js';
import { sendCodeSchema, verifyCodeSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post('/logout', authenticate, ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshSessionController));
router.post('/send-code', validateBody(sendCodeSchema), ctrlWrapper(sendLoginCodeController));
router.post('/verify-code', validateBody(verifyCodeSchema), ctrlWrapper(verifyLoginCodeController));

export default router;

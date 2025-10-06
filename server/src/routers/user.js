import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getContactsController } from '../controllers/user.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getContactsController));

export default router;

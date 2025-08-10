import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createChatController, getUserChatsController } from '../controllers/chat.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createChatSchema } from '../validation/chat.js';

const router = Router();

router.post('/create', authenticate, validateBody(createChatSchema), ctrlWrapper(createChatController));
router.get('/', authenticate, ctrlWrapper(getUserChatsController));

export default router;

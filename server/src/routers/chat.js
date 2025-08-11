import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createChatController, getMessagesController } from '../controllers/chat.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createChatSchema } from '../validation/chat.js';
import { validateParams } from '../middlewares/validateParams.js';
import { fetchMessagesSchema } from '../validation/message.js';

const router = Router();

router.post('/create', authenticate, validateBody(createChatSchema), ctrlWrapper(createChatController));
router.get('/:chatId/messages', authenticate, validateParams(fetchMessagesSchema), ctrlWrapper(getMessagesController));

export default router;

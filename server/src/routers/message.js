import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import {
  deleteMessageController,
  getMessagesController,
  sendMessageController,
  updateMessageController,
} from '../controllers/message.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/:chatId/messages', authenticate, ctrlWrapper(getMessagesController));
router.post('/create/:chatId', authenticate, ctrlWrapper(sendMessageController)); // Треба додати validateBody(sendMessageSchema) попередньо створивши відповідну схему
router.put('/:id', authenticate, ctrlWrapper(updateMessageController)); // Треба додати validateBody(updateMessageSchema) попередньо створивши відповідну схему
router.delete('/:id', authenticate, ctrlWrapper(deleteMessageController));

export default router;

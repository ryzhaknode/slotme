import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { deleteMessageController, sendMessageController, updateMessageController } from '../controllers/message.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateParams } from '../middlewares/validateParams.js';
import { fetchMessagesSchema } from '../validation/message.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.post(
  '/create/:chatId',
  authenticate,
  validateParams(fetchMessagesSchema),
  upload.array('files'),
  ctrlWrapper(sendMessageController),
);

router.put('/:id', authenticate, ctrlWrapper(updateMessageController)); // Треба додати validateBody(updateMessageSchema) попередньо створивши відповідну схему
router.delete('/:id', authenticate, ctrlWrapper(deleteMessageController));

export default router;

import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { deleteMessageController, sendMessageController, updateMessageController } from '../controllers/message.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateParams } from '../middlewares/validateParams.js';
import { fetchMessagesSchema, updateMessageSchema } from '../validation/message.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.post(
  '/create/:chatId',
  authenticate,
  validateParams,
  upload.array('files'),
  ctrlWrapper(sendMessageController),
);

router.put(
  '/update/:id',
  authenticate,
  validateParams,
  upload.array('files'),
  ctrlWrapper(updateMessageController),
);

router.delete('/delete/:messageId/chat/:chatId', authenticate, ctrlWrapper(deleteMessageController));

export default router;

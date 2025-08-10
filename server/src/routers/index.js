import { Router } from 'express';

import authRouter from './auth.js';
import chatRouter from './chat.js';
import messageRouter from './message.js';
import contactsRouter from './user.js';

const router = Router();

router.use('/user', authRouter);
router.use('/chat', chatRouter);
router.use('/message', messageRouter);
router.use('/contacts', contactsRouter);

export default router;

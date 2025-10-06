import { Router } from 'express';

import authRouter from './auth.js';
import contactsRouter from './user.js';
import serviceRouter from './service.js';
import timeSlotRouter from './timeSlot.js';

const router = Router();

router.use('/user', authRouter);
router.use('/contacts', contactsRouter);
router.use('/services', serviceRouter);
router.use('/time-slots', timeSlotRouter);

export default router;

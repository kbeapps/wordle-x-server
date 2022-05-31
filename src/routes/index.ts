import express from 'express';
import helmet from 'helmet';

import authRoutes from './auth.routes';
import homeRoutes from './home.routes';
import userRoutes from './user.routes';
import notificationRoutes from './notification.routes';

const router = express();

router.use(helmet());
router.use(express.json());

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/notification', notificationRoutes);

module.exports = router;
export default router;
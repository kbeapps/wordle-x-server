import express from 'express';
import helmet from 'helmet';

import homeRoutes from './home.routes';
import authRoutes from './auth.routes';
import gameRoutes from './game.routes';
// import groupRoutes from './group.routes';
import notificationRoutes from './notification.routes';
import userRoutes from './user.routes';

const router = express();

router.use(helmet());
router.use(express.json());

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/game', gameRoutes);
// router.use('/group', groupRoutes);
router.use('/notification', notificationRoutes);
router.use('/user', userRoutes);

module.exports = router;
export default router;
import express from 'express';
import helmet from 'helmet';

import authRoutes from './auth.routes';
import homeRoutes from './home.routes';

const router = express();

router.use(helmet());
router.use(express.json());

router.use('/', homeRoutes);
router.use('/auth', authRoutes);


export default router;
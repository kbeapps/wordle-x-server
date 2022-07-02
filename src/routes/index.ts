import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './home.routes';
import authRoutes from './auth.routes';
import gameRoutes from './game.routes';
import groupRoutes from './group.routes';
import notificationRoutes from './notification.routes';
import userRoutes from './user.routes';

const origin = process.env.NODE_ENV === 'production' ? process.env.PROD_ORIGIN : process.env.LOCAL_ORIGIN;

const corsOptions: object = {
  credentials: true,
  origin: origin,
  methods: ['GET', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: true,
  optionsSuccessStatus: 204,
};

const router = express();

router.use(cors(corsOptions));
router.use(helmet());
router.use(express.json());
console.log('process: ', process.env.LOCAL_ORIGIN);
router.use(function (req: Request, res: Response, next: NextFunction) {
  res.set('Access-Control-Allow-Origin', origin);
  res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Set-Cookie');
  res.set('Access-Control-Allow-Credentials', 'true');
  next();
});

router.use('/', homeRoutes);
router.use('/auth', authRoutes);
router.use('/game', gameRoutes);
router.use('/group', groupRoutes);
router.use('/notification', notificationRoutes);
router.use('/user', userRoutes);

export default router;

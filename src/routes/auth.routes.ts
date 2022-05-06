import { Router } from 'express';
import controller from '../controllers/auth.controller';

const router = Router();

router.post('/signup', controller.signup);

export default router;
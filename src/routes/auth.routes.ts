import { Router } from 'express';
import { authController } from '../controllers/controllers.module';

const router = Router();

router.post('/signup', (req, res) => { authController.signup(req, res); });

export default router;


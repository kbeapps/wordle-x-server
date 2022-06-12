import { Router } from 'express';
import * as handler from '../handlers/auth.handler';
import * as validator from '../middleware/validators/auth.validator';

const router = Router();

router.post('/signup', [validator.signup], handler.signup);
router.post('/signin', [validator.signin], handler.signin);

export default router;

import { Router } from 'express';
const middleware = require('../middleware/auth.middleware');
const validator = require('../middleware/validators/auth.validator');
const router = Router();

router.post('/signup', [validator.signup], middleware.signup);

router.get('/signin', [validator.signin], middleware.signin);


export default router;
import { Router } from 'express';
const middleware = require('../middleware/auth.middleware');
const validator = require('../middleware/validators/auth.validator');
const router = Router();

router.post('/signup', middleware.signup);

router.get('/signin', middleware.signin);


export default router;
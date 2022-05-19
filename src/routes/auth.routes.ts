import { Router } from 'express';
const controller = require('../controllers/auth.controller');
const validator = require('../middleware/validators/auth.validator');
const router = Router();

router.post('/signup', [validator.signup], controller.signup);

export default router;
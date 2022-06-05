import { Router } from 'express';
const middleware = require('../middleware/user.middleware');
const validator = require('../middleware/validators/user.validator');
const router = Router();

router.get('/get', [validator.get], middleware.get);
router.patch('/update', [validator.update], middleware.update);
router.delete('/remove/:_id', [validator.remove], middleware.remove);

export default router;
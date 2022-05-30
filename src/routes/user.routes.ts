import { Router } from 'express';
const middleware = require('../middleware/user.middleware');
const router = Router();

router.get('/get', [], middleware.get);
router.patch('/update', [], middleware.update);
router.delete('/remove/:_id', [], middleware.remove);

export default router;
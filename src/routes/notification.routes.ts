import { Router } from 'express';
const middleware = require('../middleware/notification.middleware');
const router = Router();

router.get('/getall/:userId', [], middleware.getAll);
router.post('/create', [], middleware.create);
router.delete('/remove/:_id', [], middleware.remove);
router.delete('/removeall/:userId', [], middleware.removeAll);

export default router;
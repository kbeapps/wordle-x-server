import { Router } from 'express';
const middleware = require('../middleware/group.middleware');
const router = Router();

router.post('/create', [], middleware.create);
router.get('/get', [], middleware.get);
router.get('/getall/:userId', [], middleware.getAll);
router.patch('/update', [], middleware.update);
router.delete('/remove/:_id', [], middleware.remove);

export default router;
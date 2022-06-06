import { Router } from 'express';
const middleware = require('../middleware/notification.middleware');
const validator = require('../middleware/validators/notification.validator');
const router = Router();

router.post('/create', [validator.create], middleware.create);
router.get('/getall/:userId', [validator.getAll], middleware.getAll);
router.delete('/remove/:_id', [validator.remove], middleware.remove);
router.delete('/removeall/:userId', [validator.removeAll], middleware.removeAll);

export default router;
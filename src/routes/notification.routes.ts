import { Router } from 'express';
import * as handler from '../handlers/notification.handler';
import * as validator from '../middleware/validators/notification.validator';

const router = Router();

router.post('/create', [validator.create], handler.create);
router.get('/getall/:userId', [validator.getAll], handler.getAll);
router.delete('/remove/:_id', [validator.remove], handler.remove);
router.delete('/removeall/:userId', [validator.removeAll], handler.removeAll);

export default router;

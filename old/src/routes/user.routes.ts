import { Router } from 'express';
import * as handler from '../handlers/user.handler';
import * as validator from '../middleware/validators/user.validator';

const router = Router();

router.get('/get/:key/:value', [validator.get], handler.get);
router.patch('/update', [validator.update], handler.update);
router.delete('/remove/:_id', [validator.remove], handler.remove);

export default router;

import { Router } from 'express';
import * as handler from '../handlers/group.handler';
import * as validator from '../middleware/validators/group.validator';

const router = Router();

router.post('/create', [validator.create], handler.create);
router.get('/get', [validator.get], handler.get);
router.get('/getall', [validator.getAll], handler.getAll);
router.patch('/update', [validator.update], handler.update);
router.delete('/remove/:_id', [validator.remove], handler.remove);

export default router;

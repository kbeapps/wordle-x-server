import { Router } from 'express';
import * as handler from '../handlers/user.handler';
import * as validator from '../middleware/validators/user.validator';
import { validateCookies } from '../middleware/validators/cookies.validator';

const router = Router();

router.get('/getbyid', [validateCookies], handler.getById);
router.get('/get/:key/:value', [validateCookies, validator.get], handler.get);
router.get('/getall', [], handler.getAll);
router.patch('/update', [validateCookies, validator.update], handler.update);
router.delete('/remove/:_id', [validateCookies], handler.remove);

export default router;

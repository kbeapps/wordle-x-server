import { Router } from 'express';
import * as handler from '../handlers/notification.handler';
import * as validator from '../middleware/validators/notification.validator';
import { validateCookies } from '../middleware/validators/cookies.validator';

const router = Router();

router.post('/create', [validateCookies, validator.create], handler.create);
router.get('/getall/:key/:value', [validateCookies], handler.getAll);
router.delete('/remove/:_id', [validateCookies, validator.remove], handler.remove);
router.delete('/removeall/:userId', [validateCookies, validator.removeAll], handler.removeAll);

export default router;

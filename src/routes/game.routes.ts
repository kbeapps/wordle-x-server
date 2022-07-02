import { Router } from 'express';
import * as handler from '../handlers/game.handler';
import * as validator from '../middleware/validators/game.validator';
import { validateCookies } from '../middleware/validators/cookies.validator';

const router = Router();

router.post('/create', [validateCookies, validator.create], handler.create);
router.get('/get/:key/:value', [validateCookies, validator.get], handler.get);
router.get('/getall/:key/:value', [validateCookies, validator.getAll], handler.getAll);
router.patch('/update', [validateCookies, validator.update], handler.update);
router.delete('/remove/:_id', [validateCookies, validator.remove], handler.remove);

export default router;

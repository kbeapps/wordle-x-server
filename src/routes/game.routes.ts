import { Router } from 'express';
import * as handler from '../handlers/game.handler';
import * as validator from '../middleware/validators/game.validator';
import { validateCookies } from '../middleware/validators/cookies.validator';

const router = Router();

router.post('/create', [validator.create], handler.create);
router.get('/createdaily', [], handler.createMainDaily);
router.get('/get/:key/:value', [validator.get], handler.get);
router.get('/getall', [validateCookies], handler.getAll);
router.patch('/update', [validator.update], handler.update);
router.delete(
	'/remove/:_id',
	[validateCookies, validator.remove],
	handler.remove
);

export default router;

import { Router } from 'express';
const middleware = require('../middleware/game.middleware');
const validator = require('../middleware/validators/game.validator');
const router = Router();

router.post('/create', [validator.create], middleware.create);
router.get('/get/:_id', [validator.get], middleware.get);
router.get('/getall/:ownerId', [validator.getAll], middleware.getAll);
router.patch('/update', [validator.update], middleware.update);
router.delete('/remove/:_id', [validator.remove], middleware.remove);

export default router;
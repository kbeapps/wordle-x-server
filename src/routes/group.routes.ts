import { Router } from 'express';
const middleware = require('../middleware/group.middleware');
const validator = require('../middleware/validators/group.validator');
const router = Router();

router.post('/create', [validator.create], middleware.create);
router.get('/get', [validator.get], middleware.get);
router.get('/getall', [validator.getAll], middleware.getAll);
router.patch('/update', [validator.update], middleware.update);
router.delete('/remove/:_id', [validator.remove], middleware.remove);

export default router;
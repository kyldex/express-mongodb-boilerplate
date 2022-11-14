import express from 'express';

import auth from '../middleware/auth';
import {
  createThing,
  modifyThing,
  deleteThing,
  getOneThing,
  getAllThings
} from '../controllers/stuff';

const router = express.Router();

router.post('/', auth, createThing);

router.put('/:id', auth, modifyThing);

router.delete('/:id', auth, deleteThing);

router.get('/:id', getOneThing);

router.get('/', getAllThings);

export default router;

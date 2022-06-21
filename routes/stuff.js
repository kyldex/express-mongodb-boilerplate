const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const stuffController = require('../controllers/stuff');

router.post('/', auth, stuffController.createThing);

router.put('/:id', auth, stuffController.modifyThing);

router.delete('/:id', auth, stuffController.deleteThing);

router.get('/:id', stuffController.getOneThing);

router.get('/', stuffController.getAllThings);

module.exports = router;

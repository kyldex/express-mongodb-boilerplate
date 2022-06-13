const express = require('express');

const stuffController = require('../controllers/stuff');

const router = express.Router();

router.post('/', stuffController.createThing);

router.put('/:id', stuffController.modifyThing);

router.delete('/:id', stuffController.deleteThing);

router.get('/:id', stuffController.getOneThing);

router.get('/', stuffController.getAllThings);

module.exports = router;

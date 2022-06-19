const Thing = require('../models/Thing');

exports.createThing = (req, res) => {
  const thing = new Thing({
    ...req.body
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: 'New thing has been stored' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyThing = (req, res) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Thing has been updated' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteThing = (req, res) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Thing has been deleted' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneThing = (req, res) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllThings = (req, res) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};

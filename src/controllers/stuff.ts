import { Request, Response } from 'express';

import Thing from '../models/Thing';
import RequestWithAuth from '../types/RequestWithAuth';

export const createThing = (req: Request, res: Response) => {
  const thing = new Thing({
    ...req.body
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: 'New thing has been stored' }))
    .catch((error) => res.status(400).json({ error }));
};

export const modifyThing = (req: RequestWithAuth, res: Response) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (!thing) {
        return res.status(404).json({
          error: new Error('Thing not found')
        });
      }
      if (thing.userId !== req.auth.userId) {
        return res.status(400).json({
          error: new Error('Unauthorized request')
        });
      }
      return Thing.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: 'Thing updated' }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export const deleteThing = (req: RequestWithAuth, res: Response) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (!thing) {
        return res.status(404).json({
          error: new Error('Thing not found')
        });
      }
      if (thing.userId !== req.auth.userId) {
        return res.status(400).json({
          error: new Error('Unauthorized request')
        });
      }
      return Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Thing deleted' }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

export const getOneThing = (req: Request, res: Response) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

export const getAllThings = (req: Request, res: Response) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};

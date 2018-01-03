// Module dependencies
import express from 'express';
import authenticate from '../utils/authenticate';

// Models
import Card from '../models/card';
import Task from '../models/task';

// Router
const router = express.Router({ mergeParams: true });
router
.get('/', authenticate, (req, res, next) => {
  // Get cards for specified project
  Card.find({ project: req.params.project }, (err, cards) => {
    if(err) return next(err);
    res.status(200).json(cards);
  });
})
.put('/', authenticate, (req, res, next) => {
  // Create new card
  Card.create({
    name: req.body.name,
    project: req.params.project
  }, (err, card) => {
    if(err) return next(err);
    res.status(201).json(card);
  })
})
.post('/:id', authenticate, (req, res, next) => {
  // Update an existing card
  Card.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body }}, {new: true}, (err, card) => {
    if(err) return next(err);
    res.status(200).json(card);
  })
})
.delete('/:id', authenticate, (req, res, next) => {
  // Delete card
  Card.deleteOne({ _id: req.params.id }, (err, result) => {
    if(err) return next(err);
    // Delete all tasks assigned to this card
    Task.remove({ card: req.params.id }, (err) => {
      if(err) return next(err);
      res.status(200).json({
        id: req.params.id,
        deletedCount: result.deletedCount
      });
    })
  })
})

export default router;
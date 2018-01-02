// Module dependencies
import express from 'express';
import authenticate from '../utils/authenticate';

// Models
import Card from '../models/card';

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
.delete('/:id', authenticate, (req, res, next) => {
  // Delete card
  Card.deleteOne({ _id: req.params.id }, (err, result) => {
    if(err) return next(err);
    res.status(200).json({
      id: req.params.id,
      deletedCount: result.deletedCount
    });
  })
})

export default router;
const express = require('express')
  , router = express.Router({ mergeParams: true });

const authenticate = require('../utils/authenticate');
const Card = require('../models/card');

router
.get('/', authenticate, function(req, res, next) {
  // Get cards for specified project
  Card.find({ project: req.params.project }, function(err, cards) {
    if(err) return next(err);
    res.status(200).json(cards);
  });
})
.put('/', authenticate, function(req, res, next) {
  // Create new card
  Card.create({
    name: req.body.name,
    project: req.params.project
  }, function(err, card) {
    if(err) return next(err);
    res.status(201).json(card);
  })
})
.delete('/:id', authenticate, function(req, res, next) {
  // Delete card
  Card.deleteOne({ _id: req.params.id }, function(err, result) {
    if(err) return next(err);
    res.status(200).json({
      id: req.params.id,
      deletedCount: result.deletedCount
    });
  })
})

module.exports = router;
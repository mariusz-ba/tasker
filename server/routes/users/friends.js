// Module dependencies
import express from 'express';
import authenticate from '../../utils/authenticate';

// Models
import User from '../../models/user';

// Utilities
import { mapKeys } from 'lodash';

// Router
const router = express.Router({mergeParams: true});
router
.get('/', (req, res, next) => {
  // Get all :user friends (with details)
  User.findOne({ _id: req.params.user }, { friends: 1 }, (err, user) => {
    if(err) return next(err);

    User.find({ _id: { $in: user.friends }}, { username: 1, friends: 1 }, (err, friends) => {
      if(err) return next(err);
      const right = mapKeys(friends, '_id');
      let result = [];
      user.friends.forEach((friend, index) => {
        if(right[friend._id]) {
          result.push({
            _id: friend._id,
            username: right[friend._id].username,
            confirm_user: friend.confirmed,
            confirm_friend: mapKeys(right[friend._id].friends, '_id')[user._id].confirmed
          })
        }
      })
      res.status(200).json(result);
    })
  })
})
.put('/:friend', (req, res, next) => { // Send friend request
  // Compare authenticated user id and :user - Must be the same!
  //if(req.params.user !== req.user._id) return next(new Error('User match error'));
  // Create new friend for user :user
  console.log('sending friend request');
  const { user, friend } = req.params;
  User.findOneAndUpdate(
    { 
      _id: user, 
      'friends._id': { $ne: friend }
    },
    {
      $addToSet: { friends: { _id: friend, confirmed: true }}
    }, {new: true}, (err, user) => {
      if(err) return next(err);
      // Update friend and set confirmation to false
      User.updateOne(
        { 
          _id: friend,
          'friends._id': { $ne: user }
        },
        {
          $addToSet: { friends: { _id: user, confirmed: false }}
        }, (err, user) => {
          if(err) return next(err);
          // Friend created (Friend request send to :friend)
          res.status(201).json({
            _id: friend,
            confirmed: false
          });
      })
  })
})
.post('/:friend', (req, res, next) => {
  // Confirm friend
  const { user, friend } = req.params;
  User.updateOne({
    _id: user,
    'friends._id': friend
  },
  {
    $set: {
      'friends.$.confirmed': true
    }
  }, (err) => {
    if(err) return next(err);
    res.status(200).json({
      user,
      friend
    })
  })
})
.delete('/:friend', (req, res, next) => {
  // Delete friend
  const { user, friend } = req.params;
  User.updateOne({ _id: user }, { $pull: { friends: { _id: friend }}}, (err) => {
    if(err) return next(err);
    // Delete from friends array
    User.updateOne({ _id: friend }, { $pull: { friends: { _id: user }}}, (err) => {
      if(err) return next(err);
      res.status(200).json({
        user,
        friend
      })
    })
  })
})

export default router;
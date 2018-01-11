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
  User.getUserFriends(req.params.user, (err, friends) => {
    if(err) return next(err);
    res.status(200).json(friends);
  })
})
.put('/:friend', (req, res, next) => { // Send friend request
  // Compare authenticated user id and :user - Must be the same!
  //if(req.params.user !== req.user._id) return next(new Error('User match error'));
  // Create new friend for user :user
  console.log('sending friend request');
  //const { user, friend } = req.params;
  User.findOneAndUpdate(
    { 
      _id: req.params.user, 
      'friends._id': { $ne: req.params.friend }
    },
    {
      $addToSet: { friends: { _id: req.params.friend, confirmed: true }}
    }, {new: true}, (err, user) => {
      if(err) return next(err);
      if(!user) return next(new Error('Invite already sent'));
      // Update friend and set confirmation to false
      User.findOneAndUpdate(
        { 
          _id: req.params.friend,
          'friends._id': { $ne: req.params.user }
        },
        {
          $addToSet: { friends: { _id: user._id, confirmed: false }}
        }, {new: true}, (err, friend) => {
          if(err) return next(err);
          if(!friend) return next(new Error('Cannot perform this operation'));
          // Friend created (Friend request send to :friend)
          res.status(201).json({
            _id: friend._id,
            username: friend.username,
            confirm_user: true,
            confirm_friend: false
          }); 
      })
  })
})
.post('/:friend', (req, res, next) => {
  // Confirm friend
  const { user, friend } = req.params;
  User.findOneAndUpdate({
    _id: user,
    'friends._id': friend
  },
  {
    $set: {
      'friends.$.confirmed': true
    }
  }, {new: true}, (err, user) => {
    if(err) return next(err);
    res.status(200).json({
      _id: friend,
      username: friend.username,
      confirm_user: true,
      confirm_friend: true
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
        _id: friend
      })
    })
  })
})

export default router;
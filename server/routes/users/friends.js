// Module dependencies
import express from 'express';
import authenticate from '../../utils/authenticate';

// Models
import Friend from '../../models/friend';

// Router
const router = express.Router({mergeParams: true});
router
.get('/', (req, res, next) => {
  // Get all :user friends (with details)
  Friend.find({
    $or: [
      { user1: req.params.user },
      { user2: req.params.user }
    ]
  })
  .populate({ path: 'user1', select: ['_id', 'username', 'fullName'] })
  .populate({ path: 'user2', select: ['_id', 'username', 'fullName'] })
  .then(friends => res.status(200).json(friends))
  .catch(err => next(err));
})
.put('/:friend', (req, res, next) => { 
  // Send friend request
  // Compare authenticated user id and :user - Must be the same!
  //if(req.params.user !== req.user._id) return next(new Error('User match error'));
  Friend.findOne({
    $or: [
      { user1: req.params.user, user2: req.params.friend },
      { user1: req.params.friend, user2: req.params.user }
    ]
  })
  .then(friend => {
    if(!friend)
      return Friend.addFriends(req.params.user, req.params.friend);
    throw new Error('Those users are already friends');
  })
  .then(friend => res.status(201).json(friend))
  .catch(err => next(err));
})
.post('/:friend', (req, res, next) => {
  // Confirm friend
  const { user, friend } = req.params;

  Friend.findOne({
    $or: [
      { user1: user, user2: friend },
      { user1: friend, user2: user }
    ]
  })
  .then(data => {
    // Check if i can confirm that
    if(data.user2 == user)
      return Friend.confirmFriend(user, friend)
    throw new Error('You can\'t confirm that');
  })
  .then(friend => res.status(200).json(friend))
  .catch(err => next(err));
})
.delete('/:friend', (req, res, next) => {
  // Delete friend
  const { user, friend } = req.params;

  Friend.deleteFriend(user, friend)
  .then(result => res.status(200).json(result))
  .catch(err => next(err));
})

export default router;
// Module dependencies
import express from 'express';
import authenticate from '../../utils/authenticate';

// Models
import Friend from '../../models/friend';

// Router
const router = express.Router({mergeParams: true});
router
.get('/', authenticate, (req, res, next) => {
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
.put('/:friend', authenticate, (req, res, next) => { 
  // Send friend request
  
  if(req.params.user === req.params.friend) { //Sorry cannot add yourself
    res.status(403).json({ error: 'Sorry you cannot add yourself' });
    return;
  }

  console.log(req.params.user, req.user._id);
  if(req.params.user !== req.user._id.toString()) {
    res.status(403).json({ error: 'You can\'t perform this operation' });
    return;
  }

  Friend.findOne({
    $or: [
      { user1: req.params.user, user2: req.params.friend },
      { user1: req.params.friend, user2: req.params.user }
    ]
  })
  .then(friend => {
    if(!friend) {
      return Friend.addFriends(req.params.user, req.params.friend)
      .then(created => {
        return Friend.findById(created._id)
        .populate({ path: 'user1', select: ['_id', 'username', 'fullName'] })
        .populate({ path: 'user2', select: ['_id', 'username', 'fullName'] })
      })
    } else {
      throw new Error('Those users are already friends');
    }
  })
  .then(friend => res.status(201).json(friend))
  .catch(err => next(err));
})
.post('/:friend', authenticate, (req, res, next) => {
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
    if(!data)
      throw new Error('Friendship not found');
    if(data.user2 == user) {
      return Friend.confirmFriend(user, friend)
      .then(friendship => {
        return Friend.findById(friendship._id)
        .populate({ path: 'user1', select: ['_id', 'username', 'fullName'] })
        .populate({ path: 'user2', select: ['_id', 'username', 'fullName'] })
      })
    } else {
      throw new Error('You can\'t confirm that');
    }
  })
  .then(friend => res.status(200).json(friend))
  .catch(err => next(err));
})
.delete('/:friend', authenticate, (req, res, next) => {
  // Delete friend
  const { user, friend } = req.params;

  Friend.deleteFriend(user, friend)
  .then(result => res.status(200).json(result))
  .catch(err => next(err));
})

export default router;
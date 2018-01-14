/**
 * Module dependencies
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Friend Schema
 */

const FriendSchema = new Schema({
  user1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  user2: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  confirm1: { type: Schema.Types.Boolean, required: true, default: true },
  confirm2: { type: Schema.Types.Boolean, required: true, default: false }
});

/**
 * Methods
 */

FriendSchema.statics = {

  addFriends: function(user1, user2) {
    return this.create({ user1, user2 });
  },

  confirmFriend: function(user1, user2) {
    return this.findOneAndUpdate({ $or: [{user1, user2}, {user1: user2, user2: user1}] }, { $set: { confirm2: true }}, {new: true}).exec();
  },

  deleteFriend: function(user1, user2) {
    return this.deleteOne({
      $or: [
        { user1, user2 },
        { user1: user2, user2: user1 }
      ]
    }).exec();
  }
};

let Friend = mongoose.model('Friend', FriendSchema);

module.exports = Friend;
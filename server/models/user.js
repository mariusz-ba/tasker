/**
 * Module dependencies
 */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { mapKeys } from 'lodash';
import config from '../config';
const { saltRounds } = config;

const Schema = mongoose.Schema;

/**
 * User Schema
 */

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  fullName: { type: String, default: '' },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  teams: [Schema.Types.ObjectId],
});

/**
 * Pre Hook
 * Hash password before inserting into database
 */

UserSchema.pre('save', function(next) {
  let self = this;
  let { password } = this;

  bcrypt.hash(password, saltRounds, (error, hash) => {
    if(error) return next(error);

    self.password = hash;

    next();
  })
})

/**
 * Methods
 */

UserSchema.methods = {

}

/**
 * Statics
 */

UserSchema.statics = {
  
  /**
   * Add user to a specified team
   * @param {ObjectId} user - Id of a user that will be assigned to a team
   * @param {ObjectId} team - Id of a team user will be assigned to
   * @param {function} callback - Callback function
   */
  assignToTeam: function(user, team, callback) {
    return this.findOneAndUpdate({ _id: user }, { $push: {teams: team} }, callback).exec();
  },

  /**
   * Remove user from a specified team
   * @param {ObjectId} user - Id of a user that will be removed from a team
   * @param {ObjectId} team - Id of a team user will be removed from
   * @param {function} callback - Callback function
   */
  removeFromTeam: function(user, team, callback) {
    return this.findOneAndUpdate({ _id: user }, { $pull: {teams: team} }, callback).exec();
  },

  // getUserFriends: function(user, callback) {
  //   return this.findOne({ _id: user }, (err, user) => {
  //     this.find({ _id: { $in: user.friends }}, { username: 1, friends: 1 }, (err, friends) => {
  //       if(err) callback(err);
  //       const right = mapKeys(friends, '_id');
  //       let result = [];
  //       user.friends.forEach((friend, index) => {
  //         if(right[friend._id]) {
  //           result.push({
  //             _id: friend._id,
  //             username: right[friend._id].username,
  //             confirm_user: friend.confirmed,
  //             confirm_friend: mapKeys(right[friend._id].friends, '_id')[user._id].confirmed
  //           })
  //         }
  //       })
  //       callback(null, result);
  //     })
  //   }).exec();
  // }

};

let User = mongoose.model('User', UserSchema);

module.exports = User;
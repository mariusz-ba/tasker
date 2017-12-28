/**
 * Module dependencies
 */
const mongoose = require('mongoose')
  , bcrypt = require('bcrypt');

const saltRounds = 10;
const Schema = mongoose.Schema;

/**
 * User Schema
 */

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  teams: [Schema.Types.ObjectId]
});

/**
 * Pre Hook
 * Hash password before inserting into database
 */

UserSchema.pre('save', function(next) {
  let self = this;
  let { password } = this;

  bcrypt.hash(password, saltRounds, function(error, hash) {
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
  }

};

let User = mongoose.model('User', UserSchema);

module.exports = User;
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
  email: { type: String, required: true, index: { unique: true } }
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

}

let User = mongoose.model('User', UserSchema);

module.exports = User;
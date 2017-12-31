/**
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Team Schema
 */

const TeamSchema = new Schema({
  name: { type: String, required: true, index: { unique: true }},
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() }
});

/**
 * Methods
 */

TeamSchema.methods = {

};

TeamSchema.statics = {

  /*
  findByMemberId: function(_id, callback) {
    return this.find({ users: _id }, callback).exec();
  },
  */
  
}

let Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
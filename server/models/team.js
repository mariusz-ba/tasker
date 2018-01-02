/**
 * Module dependencies
 */

import mongoose from 'mongoose';
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
  
}

let Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
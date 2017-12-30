/**
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Project Schema
 */

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  users: [Schema.Types.ObjectId],
  teams: [Schema.Types.ObjectId]
});

/**
 * Methods
 */

ProjectSchema.methods = {

};

ProjectSchema.statics = {

};

let Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
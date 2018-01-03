/**
 * Module dependencies
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Project Schema
 */

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
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
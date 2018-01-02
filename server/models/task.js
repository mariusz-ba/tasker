/**
 * Module dependencies
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Task Schema
 */

const TaskSchema = new Schema({
  description: { type: String, required: true, default: 'No description' },
  completed: { type: Boolean, required: true, default: false },
  author: { type: Schema.Types.ObjectId, required: true },
  project: { type: Schema.Types.ObjectId, required: true },
  card: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  subtasks: [Schema.Types.ObjectId],
  comments: [Schema.Types.ObjectId]
});

/**
 * Methods
 */

TaskSchema.methods = {

};

let Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
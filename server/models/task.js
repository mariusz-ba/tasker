/**
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Task Schema
 */

const TaskSchema = new Schema({
  description: { type: String, required: true, default: 'No description' },
  completed: { type: Boolean, required: true, default: false },
  author: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  users: [Schema.Types.ObjectId],
  subtasks: [Schema.Types.ObjectId],
  comments: [Schema.Types.ObjectId]
});

/**
 * Methods
 */

TaskSchema.methods = {

  assignUsers: function(users) {

  },

  addSubtasks: function(subtasks) {

  },

  addComments: function(comments) {

  }

};

let Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
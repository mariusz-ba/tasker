/**
 * Module dependencies
 */

const mongoose = require('mongoose');

/**
 * Task Schema
 */

const TaskSchema = new Schema({
  description: { type: String, required: true },
  completed: { type: Boolean, required: true },
  author: { type: ObjectId, required: true },
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
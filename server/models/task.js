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
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  subtasks: [Schema.Types.ObjectId],
  comments: [{
    _id: { type: Schema.Types.ObjectId, required: true, index: true, auto: true },
    author: { type: Schema.Types.ObjectId, required: true},
    createdAt: { type: Number, default: Date.now },
    updatedAt: { type: Number, default: Date.now },
    content: { type: String, required: true }
  }]
});

/**
 * Methods
 */

TaskSchema.methods = {

};

TaskSchema.statics = {

  getComments: function(task, filter = {}) {
    return this.findOne({ _id: task, ...filter }).exec();
  },

  addComment: function(task, author, content) {
    return this.findOneAndUpdate(
      { _id: task },
      { $push: { comments: { author, content }}},
      {new: true}
    ).exec();
  },

  updateComment: function(task, comment, author, content) {
    return this.findOneAndUpdate(
      {
        _id: task,
        'comments._id': comment
      },
      {
        'comments.$.author': author,
        'comments.$.content': content
      },
      {new: true}
    ).exec();
  },

  deleteComment: function(task, comment) {
    return this.findOneAndUpdate(
      { _id: task },
      { $pull: { comments: { _id: comment }}},
      {new: true}
    ).exec();
  }

}

let Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
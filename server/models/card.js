/**
 * Module dependencies
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * Card Schema
 */

const CardSchema = new Schema({
  name: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now }
});

let Card = mongoose.model('Card', CardSchema);

module.exports = Card;
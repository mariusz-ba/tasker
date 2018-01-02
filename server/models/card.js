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
  project: { type: Schema.Types.ObjectId, required: true }
});

let Card = mongoose.model('Card', CardSchema);

module.exports = Card;
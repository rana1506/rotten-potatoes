// models/review.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = Review;
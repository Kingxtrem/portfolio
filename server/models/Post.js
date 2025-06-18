const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    featuredImage: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
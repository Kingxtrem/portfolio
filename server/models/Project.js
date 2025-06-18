const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    technologies: [{ type: String, trim: true }],
    images: [{ type: String, trim: true }],
    demoUrl: { type: String, trim: true },
    repoUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
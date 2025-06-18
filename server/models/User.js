const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 }, // Hashed password
    // email: { type: String, unique: true, trim: true, lowercase: true }, // Optional
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
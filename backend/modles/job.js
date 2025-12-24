const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    default: "Remote",
    trim: true,
  },
  type: {
    type: String,
    default: "Full-time",
    trim: true,
  },
  mode: {
    type: String,
    default: "Remote",
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    default: [],
  },
  responsibilities: {
    type: [String],
    default: [],
  },
  applyEmail: {
    type: String,
    trim: true,
  },
  applyLink: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  order: {
    type: Number,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Job", jobSchema);

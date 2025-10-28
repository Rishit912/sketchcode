const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false,
    default: ""
  },
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String
  },
  skills: [{
    type: String
  }]
}, {
  timestamps: true
});

// order field will be used to control manual ordering in admin
teamMemberSchema.add({
  order: {
    type: Number,
    default: 0
  }
});

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
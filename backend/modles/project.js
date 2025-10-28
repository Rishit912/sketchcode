const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    imageUrls: {
        type: [String],
    },
    techStack: {
        type: [String],
    },
    category: {
        type: String,
        enum: ["webDevelopment", "appDevelopment", "webDesign"],
        default: "webDevelopment",
    },
    github: {
        type: String,
    },
    liveDemo: {
        type: String,
    },
        order: {
            type: Number,
            default: 0
        }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

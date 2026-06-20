import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    duration: { type: String, default: "" }, // e.g. "Jan'24 - Current"
    overview: { type: String, required: true },
    techStack: [{ type: String }], // ["ReactJS", "Node.js", "MongoDB"]
    highlights: [{ type: String }], // bullet points
    demoLink: { type: String, default: "" },
    websiteLink: { type: String, default: "" },
    githubLink: { type: String, default: "" },
    image: { type: String, default: "" }, // optional cover image URL
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 }, // controls display order
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;

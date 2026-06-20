import mongoose from "mongoose";

const skillGroupSchema = new mongoose.Schema(
  {
    category: { type: String, required: true }, // e.g. "Frontend"
    items: [{ type: String }], // e.g. ["React", "Tailwind CSS"]
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    organization: { type: String, required: true },
    duration: { type: String, default: "" },
    location: { type: String, default: "" },
    description: [{ type: String }],
    current: { type: Boolean, default: false },
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    duration: { type: String, default: "" },
    location: { type: String, default: "" },
    score: { type: String, default: "" }, // e.g. "CGPA 7.0"
  },
  { _id: false }
);

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, default: "" },
    link: { type: String, default: "" },
  },
  { _id: false }
);

const siteContentSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Gaurav Pandey" },
    title: { type: String, default: "Full-Stack Web Developer" },
    tagline: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    socials: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      leetcode: { type: String, default: "" },
    },
    skills: [skillGroupSchema],
    experience: [experienceSchema],
    education: [educationSchema],
    certifications: [certificationSchema],
    resumeAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SiteContent = mongoose.model("SiteContent", siteContentSchema);
export default SiteContent;

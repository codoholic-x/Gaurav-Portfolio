import mongoose from "mongoose";

const resumeDownloadSchema = new mongoose.Schema(
  {
    ip: { type: String, default: "" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true }
);

const ResumeDownload = mongoose.model("ResumeDownload", resumeDownloadSchema);
export default ResumeDownload;

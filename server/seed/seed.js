import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";
import Project from "../models/Project.js";
import SiteContent from "../models/SiteContent.js";

dotenv.config();
connectDB();

const projects = [
  {
    title: "Online Programming Judge",
    duration: "Jan '24 – Current",
    overview:
      "An online platform for coding practice, code compilation, and problem solution judgment — similar to LeetCode/Codeforces.",
    techStack: [
      "ReactJS",
      "Material UI",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Docker",
      "AWS EC2",
      "AWS ECR",
      "NGINX",
    ],
    highlights: [
      "Supports dark and light modes, full responsiveness, and dedicated routes for Home and Authentication.",
      "Users can sign up, log in and log out — authentication handled with JWT tokens.",
      "Built-in code editor lets users write, execute and view code output in real time.",
      "Logged-in users can submit solutions (currently C++) to problems and receive instant verdicts.",
      "Two separate Node.js/Express servers — one for app requests, one dedicated purely to code execution.",
      "MongoDB Atlas stores user data, submissions and problem data, accessed via Mongoose.",
      "Backend containerized with Docker, images published via AWS ECR, deployed on AWS EC2.",
      "NGINX configured with a free SSL certificate as a reverse proxy in front of the Docker containers.",
    ],
    demoLink: "#",
    websiteLink: "#",
    githubLink: "#",
    featured: true,
    order: 1,
  },
  {
    title: "STODOX — Location-Based Student Marketplace",
    duration: "Dec '24 – Current",
    overview:
      "A responsive, full-stack web app enabling students to buy and sell used academic and household items within a 20km radius of their location after graduation, with real-time buyer–seller chat and a deal-fix system for smooth transaction finalization.",
    techStack: [
      "ReactJS",
      "CSS3",
      "Context API",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Bcrypt",
      "Nodemailer",
      "Render",
    ],
    highlights: [
      "Mobile-friendly, responsive UI with custom CSS styling, hover effects and animations.",
      "User authentication via email/username + password, with OTP verification (6-digit, via Nodemailer) during registration.",
      "Geolocation-based filtering shows only products posted by sellers within 20km of the buyer.",
      "Real-time buyer–seller chat with a deal-fix flow to confirm transactions.",
      "RESTful APIs for authentication, product management, location filtering and chat functionality.",
      "JWT-based authentication with bcrypt password hashing for secure sessions.",
      "OTP generation and email delivery handled via Nodemailer with a 10-minute expiry window.",
      "Dockerized backend for consistent environments, deployed on Render with environment variables and secret keys secured on the server.",
    ],
    demoLink: "#",
    websiteLink: "#",
    githubLink: "#",
    featured: true,
    order: 2,
  },
];

const siteContent = {
  name: "Gaurav Pandey",
  title: "Full-Stack Web Developer",
  tagline: "Building scalable web apps with the MERN stack",
  bio:
    "Aspiring web developer with a strong foundation in JavaScript, React, Node.js and MongoDB, eager to apply problem-solving skills and innovative ideas to build scalable web applications. Currently seeking opportunities to contribute to a growth-oriented team while sharpening full-stack development expertise.",
  location: "Bhopal, Madhya Pradesh, India",
  email: "gauravpanday388@gmail.com",
  phone: "7067932742",
  socials: {
    github: "https://github.com/codoholic-x",
    linkedin: "https://linkedin.com/in/gauravpandey388",
    twitter: "",
    leetcode: "",
  },
  skills: [
    { category: "Languages (DSA & OOPs)", items: ["Java"] },
    { category: "Languages (Development)", items: ["JavaScript", "Python (Basic)"] },
    { category: "Frontend", items: ["React.js", "HTML5", "CSS3", "JavaScript", "Material UI"] },
    { category: "Backend", items: ["Express.js", "Node.js"] },
    { category: "Database", items: ["MongoDB", "MongoDB Atlas"] },
    { category: "CS Fundamentals", items: ["DSA", "OOP", "DBMS", "System Design (LLD)", "OS", "Computer Networks"] },
    { category: "Other", items: ["WordPress Website Development", "Docker", "AWS EC2", "Git/GitHub"] },
  ],
  experience: [
    {
      role: "Web Development Intern",
      organization: "Sysslan IT Solutions",
      duration: "2026 (Ongoing)",
      location: "Remote",
      description: [
        "Collaborating on ongoing web development projects as part of the team.",
        "Conducting research and preparing technical documentation.",
        "Contributing to strategy development and feature implementation.",
        "Certificate of completion expected shortly as the internship wraps up.",
      ],
      current: true,
    },
  ],
  education: [
    {
      institution: "IES College of Technology, Bhopal (RGPV)",
      degree: "B.Tech — Computer Science & Business System (CSBS)",
      duration: "2022 – 2026",
      location: "Bhopal, M.P.",
      score: "CGPA: 7.0",
    },
    {
      institution: "Nandan Kids Higher Secondary School",
      degree: "Higher Secondary (MP Board)",
      duration: "2022",
      location: "Rewa, M.P.",
      score: "64%",
    },
  ],
  certifications: [
    { title: "Cloud Computing (SaaS, PaaS, IaaS)", issuer: "Coursera", link: "#" },
    { title: "JavaScript Fundamentals", issuer: "W3Schools | Coursera", link: "#" },
    { title: "Introduction to Artificial Intelligence (AI)", issuer: "IBM | Coursera", link: "#" },
    { title: "Python Programming Foundation", issuer: "Infosys | Springboard", link: "#" },
    { title: "Generative AI for Data Science", issuer: "Microsoft | Coursera", link: "#" },
    { title: "HTML – Frontend Development", issuer: "Great Learning", link: "#" },
  ],
  resumeAvailable: true,
};

const importData = async () => {
  try {
    await Project.deleteMany();
    await SiteContent.deleteMany();

    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({
        name: process.env.ADMIN_NAME || "Gaurav Pandey",
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log("✅ Admin account created");
    } else {
      console.log("ℹ️  Admin account already exists — skipped");
    }

    await Project.insertMany(projects);
    console.log("✅ Projects seeded");

    await SiteContent.create(siteContent);
    console.log("✅ Site content seeded");

    console.log("\n🎉 Database seeding complete!\n");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Project.deleteMany();
    await SiteContent.deleteMany();
    await Admin.deleteMany();
    console.log("🗑️  All data destroyed");
    process.exit();
  } catch (error) {
    console.error("❌ Destroy failed:", error);
    process.exit(1);
  }
};

if (process.argv[2] === "--destroy") {
  destroyData();
} else {
  importData();
}

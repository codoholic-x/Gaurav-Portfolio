# Gaurav Pandey — Portfolio (MERN Stack)

A full-stack, animated, dark-neon glassmorphism portfolio with a real admin
dashboard backed by MongoDB Atlas. Visitors can browse projects, download your
resume, and message you directly — and you can edit everything (projects, bio,
skills, experience, certifications) from `/admin` without touching code.

**Design concept:** the whole site is styled like a code editor / IDE.
Section labels are file names (`01_about.tsx`, `02_skills.json`,
`03_projects/`, `04_experience.log`, `05_contact.sh`) and the hero literally
"types" out your intro as JavaScript.

---

## 🗂️ File structure

```
gaurav-portfolio/
├── render.yaml                 # one-click Render Blueprint (deploys both services)
├── client/                     # React + Vite frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── main.jsx            # React entry point
│       ├── App.jsx             # Routes (public site + /admin)
│       ├── index.css           # design tokens, glass/neon utility classes
│       ├── api/
│       │   └── axios.js        # pre-configured API client (cookie auth)
│       ├── context/
│       │   └── AuthContext.jsx # admin login/session state
│       ├── hooks/
│       │   └── useScrollReveal.js
│       ├── data/
│       │   └── portfolioData.js  # fallback content if API is unreachable
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── ScrollProgress.jsx
│       │   │   └── CursorGlow.jsx
│       │   ├── animations/
│       │   │   ├── TypingTerminal.jsx     # hero signature animation
│       │   │   └── AnimatedBackground.jsx # floating gradient blobs + grid
│       │   ├── ui/
│       │   │   ├── GlassCard.jsx
│       │   │   ├── SectionHeading.jsx
│       │   │   ├── ProjectCard.jsx
│       │   │   └── Loader.jsx
│       │   └── sections/
│       │       ├── Hero.jsx
│       │       ├── About.jsx
│       │       ├── Skills.jsx
│       │       ├── Projects.jsx
│       │       ├── Experience.jsx
│       │       ├── Certifications.jsx
│       │       └── Contact.jsx
│       └── pages/
│           ├── Home.jsx                  # assembles all sections
│           └── admin/
│               ├── AdminLogin.jsx
│               ├── AdminLayout.jsx       # sidebar shell for /admin/*
│               ├── ProtectedRoute.jsx
│               ├── DashboardOverview.jsx
│               ├── ManageProjects.jsx    # full CRUD
│               ├── ManageMessages.jsx    # inbox
│               └── ManageContent.jsx     # bio/skills/experience/education/certs
│
└── server/                     # Express + MongoDB Atlas backend
    ├── server.js                # app entry point
    ├── package.json
    ├── .env.example
    ├── config/
    │   └── db.js                 # MongoDB Atlas connection
    ├── models/
    │   ├── Admin.js
    │   ├── Project.js
    │   ├── Message.js
    │   ├── ResumeDownload.js
    │   └── SiteContent.js
    ├── controllers/
    │   ├── authController.js
    │   ├── projectController.js
    │   ├── contactController.js
    │   ├── resumeController.js
    │   ├── contentController.js
    │   └── dashboardController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── projectRoutes.js
    │   ├── contactRoutes.js
    │   ├── messageRoutes.js
    │   ├── resumeRoutes.js
    │   ├── contentRoutes.js
    │   └── dashboardRoutes.js
    ├── middleware/
    │   ├── authMiddleware.js     # JWT cookie verification
    │   └── errorMiddleware.js
    ├── utils/
    │   ├── generateToken.js
    │   └── sendEmail.js          # optional Nodemailer notification
    ├── seed/
    │   └── seed.js                # loads your resume data into Atlas
    └── public/
        └── resume.pdf             # served at /api/resume/download
```

---

## ⚙️ How the pieces fit together

- **Frontend (`client/`)** is a static React app. It never talks to MongoDB
  directly — it only calls your API (`/api/...`).
- **Backend (`server/`)** is the only thing that talks to MongoDB Atlas. It
  exposes REST endpoints and protects admin-only ones with a JWT stored in an
  **httpOnly cookie** (safer than localStorage).
- **Projects, bio, skills, experience, education and certifications** are all
  stored in MongoDB and editable from `/admin` — no redeploy needed to update
  content.
- **Resume downloads** are tracked: every click on "Download Resume" logs a
  row in MongoDB so you can see download counts in the admin dashboard.

---

## 🚀 Local setup

### 1. MongoDB Atlas
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Database Access → add a user + password.
3. Network Access → allow `0.0.0.0/0` (or your IP) so Render can connect.
4. Database → Connect → Drivers → copy the connection string.

### 2. Backend
```bash
cd server
cp .env.example .env
# paste your MongoDB Atlas URI into MONGO_URI
# set ADMIN_EMAIL + ADMIN_PASSWORD (this becomes your /admin login)
npm install
npm run seed      # loads your resume data + creates the admin account
npm run dev       # starts on http://localhost:5000
```

### 3. Frontend
```bash
cd client
cp .env.example .env   # VITE_API_URL=/api is fine for local dev
npm install
npm run dev             # starts on http://localhost:5173
```

Visit `http://localhost:5173` for the site, and
`http://localhost:5173/admin/login` to log in with the admin email/password
you set in `server/.env`.

---

## ☁️ Deploying to Render

You're using **Render** for everything — frontend, backend, and the database
lives on **MongoDB Atlas** (Atlas is a separate free service, Render just
connects to it).

### Option A — One-click Blueprint (recommended)
1. Push this whole folder to a GitHub repo.
2. On Render: **New → Blueprint**, point it at your repo. It will read
   `render.yaml` and create both services automatically.
3. Fill in the secret env vars Render asks for (`MONGO_URI`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD`, etc.) in the Render dashboard.
4. Once the backend is live, copy its URL and set it as `VITE_API_URL`
   (e.g. `https://gaurav-portfolio-api.onrender.com/api`) on the frontend
   service, and set `CLIENT_URL` on the backend service to your frontend's
   URL. Redeploy both.
5. SSH/Shell into the backend service (or run locally pointed at the same
   `MONGO_URI`) and run `npm run seed` once to populate the database.

### Option B — Manual (two separate Web Services)
1. **Backend:** New → Web Service → root directory `server` → build
   `npm install` → start `npm start`. Add all env vars from
   `server/.env.example`.
2. **Frontend:** New → Static Site → root directory `client` → build
   `npm install && npm run build` → publish directory `dist`. Add
   `VITE_API_URL` pointing at your backend's `/api` URL. Add a rewrite rule
   `/* → /index.html` so client-side routing (`/admin`) works on refresh.

---

## 🔑 Updating your project links

You mentioned the demo/GitHub links for **Online Programming Judge** and
**STODOX** aren't final yet — they're seeded as placeholders (`#`). Once
deployed, just log into `/admin → Projects → edit`, and paste in the real
links. No code changes or redeploy required.

## 🎓 When your internship certificate arrives

Same idea — go to `/admin → Site Content → Experience`, and update the
description or add the certificate link.

---

## 🛡️ Security notes
- Passwords are hashed with bcrypt; never stored in plain text.
- Admin auth uses a signed JWT in an httpOnly cookie (not readable by JS).
- The contact form is rate-limited (5 submissions / 15 min / IP) to deter spam.
- `helmet` + `cors` are configured on the API.
- Change `ADMIN_PASSWORD` and `JWT_SECRET` before going live — never commit
  your real `.env` file.

# 🌌 Premium Interactive Portfolio

A modern, high-performance full-stack developer portfolio designed with a "Pure Black Editorial" aesthetic and immersive 3D graphics. This project leverages a React frontend for blazing-fast UI delivery and an Express backend for secure, reliable contact form submissions.

## 🚀 The Mission
Built for developers who want a portfolio that leaves a lasting impression. This avoids generic templates, opting instead for deep glassmorphic elements, seamless scrolling animations, dynamic theming, and an interactive 3D WebGL background.

---

## 🏗️ How It Works (Architecture)

This is a decoupled Full-Stack application split into two distinct parts:

1. **Frontend (Client-Side)**: A React Application bundled via Vite. It contains all the visual elements, animations, and data displays. It is completely static and can be hosted anywhere (Vercel, Netlify, Github Pages).
2. **Backend (Server-Side)**: A Node.js/Express API. Its primary job is to safely receive messages submitted through the Portfolio's contact form and forward them to your personal inbox without exposing your email credentials to the public web.

### 🎨 Frontend Mechanics & Visuals

* **React 19 & Vite**: Provides the foundational component architecture and instantaneous hot module reloading during development.
* **Three.js & React Three Fiber (R3F)**: Powers the `SpaceBackground.jsx`, rendering a dynamic, realistic field of exoplanets and stars.
  * *How it works:* A 3D Canvas sits behind the website. As you scroll, a `FlightController` maps your vertical scroll distance (via `window.scrollY`) to the camera movement, causing the planets to fly past you organically.
* **Framer Motion**: Enables complex layout animations, the persistent scroll progress bar, and buttery smooth transitions (e.g., the Sun/Moon toggle).
* **GSAP & Lenis**: Working together, GSAP handles trigger-based animations (like fading in sections as they appear), and Lenis injects mathematical friction into scrolling so the page feels smooth and fluid like butter.
* **Tailwind CSS & Vanilla CSS**: Tailwind is used for rapid layout construction, while highly specific CSS handles glassmorphism blur filters and dynamic Day/Night CSS variables.

### 🌓 Day & Night Theming

The site implements a custom global theme system from scratch:
* **`ThemeContext.jsx`**: A React context that manages the theme state, checks system preferences dynamically, and synchronizes the user's choice to Local Storage. 
* **Dynamic CSS Variables**: Root colors are defined in `index.css`. Upon activating light mode (`data-theme="light"`), the fundamental CSS variables are swapped instantly, shifting the pure black aesthetic to a bright and clean layout.
* **Smart WebGL Shading**: The 3D space scene reads the theme context, dynamically switching the interstellar void to a hazy daylight sky and increasing the ambient lighting.

### 📬 Backend Communication

When a visitor submits the "Let's Connect" form:
1. The Frontend sends a `POST` request containing their data via the browser's Fetch API to the Backend endpoint (`/api/contact`).
2. **Rate Limiting**: The Express server uses `express-rate-limit` to prevent spam (blocking users from sending excessive emails in a short timeframe).
3. **Nodemailer**: The server uses your configured `EMAIL_PASS` (a Gmail App Password) to securely authenticate with Google's SMTP servers and dispatch the email to your personal inbox.

---

## 🛠️ Tech Stack Cheat Sheet

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations**: Framer Motion + GSAP
- **Scroll Engine**: Lenis Smooth Scroll
- **3D Graphics**: Three.js + React Three Fiber / Drei
- **Icons**: React Icons (Framer, Hi, Fi, Fa, Si)

### Backend
- **Runtime**: Node.js
- **Server**: Express.js
- **Email Dispatch**: Nodemailer
- **Security**: CORS, express-rate-limit

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Gmail account with 2-Factor Authentication enabled (to generate an App Password).

### 1) Install Dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 2) Configuration & Secrets

Create the `backend/.env` file (using `backend/.env.example` as reference):
```env
PORT=5000
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=your.email@gmail.com
FRONTEND_URL=http://localhost:5173
```

Set up your frontend environment variable (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 3) Local Development

Fire up the frontend and backend servers side-by-side using two terminal windows:

Terminal 1 (Frontend):
```bash
cd frontend
npm run dev
```

Terminal 2 (Backend):
```bash
cd backend
npm run dev
```
The portfolio will be live at `http://localhost:5173`.

---

## 📝 Customizing Your Content

The site is built as a highly customizable engine. You do not need to rewrite HTML to update your profile.

Navigate to **`frontend/src/data/content.js`**. 
Inside, you'll find JSON objects representing your:
- Basic Information (`personalInfo`) & Profile Paragraphs
- Skills and Tools categories
- Project Showcases (automatically populating the 3D cards)
- Social and Developer Profiles
- `resumeUrl` (Drop your `resume.pdf` into `frontend/public/` to link to it automatically)

Modify this file, save, and watch your portfolio update instantly!

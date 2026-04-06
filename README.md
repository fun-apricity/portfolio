# Portfolio

Modern full-stack developer portfolio with a high-performance React frontend and an Express backend for contact form delivery.

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, Framer Motion, Three.js
- Backend: Node.js, Express, Nodemailer, CORS, express-rate-limit
- Tooling: ESLint, PostCSS, Autoprefixer

## Project Structure

```text
portfolio/
|- frontend/    # UI application (React + Vite)
`- backend/     # API service (Express contact endpoint)
```

## Features

- Responsive one-page portfolio experience

- Animated UI and motion-rich sections
- Config-driven personal content
- Contact form with server-side validation
- Rate-limited contact endpoint
- Email delivery via Gmail app password

## Getting Started

### Prerequisites

- Node.js 18+ (backend requirement)
- npm

### 1) Install Dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 2) Configure Environment

Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=your.email@gmail.com
FRONTEND_URL=https://portfolio-nine-xi-5qpg1kbrxq.vercel.app
```

Optional frontend environment (`frontend/.env`):

```env
VITE_API_URL=https://portfolio-ylsl.onrender.com/api
```

If `VITE_API_URL` is not set, the frontend defaults to `https://portfolio-ylsl.onrender.com/api`.

### 3) Run in Development

Terminal 1:

```bash
cd frontend
npm run dev
```

Terminal 2:

```bash
cd backend
npm run dev
```

App URLs:

- Frontend: `https://portfolio-nine-xi-5qpg1kbrxq.vercel.app`
- Backend: `https://portfolio-ylsl.onrender.com`

## API Reference

- `GET /` - service status
- `GET /api/health` - backend health and email transport state
- `POST /api/contact` - submit contact form

Expected `POST /api/contact` body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Hello from the portfolio site."
}
```

## Available Scripts

Frontend (`frontend/package.json`):

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

Backend (`backend/package.json`):

- `npm run dev` - start backend with file watching
- `npm start` - start backend in production mode

## Content Customization

Update portfolio data in:

- `frontend/src/data/content.js`

This file controls profile text, skills, projects, social/coding links, resume URL, and contact metadata.

## Deployment Notes

- Deploy frontend and backend as separate services.
- Set `VITE_API_URL` in frontend environment to your deployed backend URL, for example `https://api.yourdomain.com/api`.
- Set `FRONTEND_URL` in backend environment to your deployed frontend origin(s). Use comma-separated values for multiple origins.
- Ensure `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_TO` are configured in backend production environment.

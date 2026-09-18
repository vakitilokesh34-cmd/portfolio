# Vakiti Lokesh — Portfolio

A premium, interactive 3D animated personal portfolio website built with the MERN stack and React Three Fiber.

## Tech Stack

**Frontend:**
- React 18 + Vite
- React Three Fiber + @react-three/drei
- Three.js
- Framer Motion
- Tailwind CSS
- Lucide React

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (avatar/model storage)

## Project Structure

```
portfolio/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/          # R3F components (Avatar, Scene, Particles, etc.)
│   │   │   ├── common/      # Navbar, Cursor, Loading, ErrorBoundary
│   │   │   └── sections/    # Hero, About, Skills, Projects, etc.
│   │   ├── context/         # PortfolioContext
│   │   ├── data/            # Static portfolio data
│   │   ├── hooks/           # Custom hooks (mouse, scroll, reduced-motion)
│   │   └── services/        # API client
│   └── public/              # Static assets
├── server/                  # Express backend
│   ├── config/              # DB, Cloudinary config
│   ├── controllers/         # Route handlers
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── middleware/           # Auth, rate limiting, upload
│   └── seeds/               # Seed data
└── .env.example
```

## Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (for avatar uploads)

### Installation

```bash
# Clone and install dependencies
cd portfolio
npm install
cd client && npm install
cd ../server && npm install
cd ..
# Or use the shortcut:
npm run install-all
```

### Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values:
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Any secure random string
- `CLOUDINARY_*` — Cloudinary credentials
- `GITHUB_TOKEN` — GitHub personal access token (optional)
- `CLIENT_URL` — http://localhost:5173
- `SERVER_URL` — http://localhost:5000

### Seed Database

```bash
npm run seed
```

### Run Development

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Features

- **3D Avatar Hero** — Interactive Three.js avatar with mouse tracking, idle animation, and click interactions
- **Particle System** — Floating particles with additive blending
- **Cinematic Camera** — Mouse parallax camera system via React Three Fiber
- **Glassmorphism UI** — Modern frosted-glass design language
- **Interactive Terminal** — Developer terminal with commands and easter eggs
- **Project Showcase** — 3D tilt cards with detailed modals
- **Contact Form** — Backend-powered with rate limiting and validation
- **GitHub Integration** — Live repo data with graceful fallback
- **Custom Cursor** — Dot + ring cursor with hover labels
- **Loading Screen** — Premium animated loading experience
- **Responsive Design** — Optimized for desktop, tablet, and mobile
- **Accessibility** — Reduced-motion support, keyboard navigation, ARIA labels
- **SEO** — Meta tags, Open Graph, sitemap, robots.txt
- **Error Boundaries** — Graceful 3D canvas failure handling
- **Admin Avatar Management** — JWT-protected upload/replace avatar system

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/profile` | Get profile data |
| PUT | `/api/profile` | Update profile (admin) |
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create project (admin) |
| GET | `/api/avatar/active` | Get active avatar |
| POST | `/api/avatar` | Upload avatar (admin) |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get messages (admin) |
| GET | `/api/github/:username` | Get GitHub stats |

## Deployment

- **Frontend:** Vercel (auto-detects Vite)
- **Backend:** Render or Railway
- **Database:** MongoDB Atlas
- **3D Assets:** Cloudinary or AWS S3

### Production Notes
- Set `VITE_API_URL` in Vercel to your backend URL
- Set `CLIENT_URL` on backend to your Vercel domain
- Enable CORS for production domain
- Use MongoDB Atlas for production database

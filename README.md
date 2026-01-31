# Lumina

A study app for JEE and NEET—practice questions, notes, todos, and an AI chat (Google Gemini) for doubt clearing. Students get a dashboard with basic analytics; admins can add and manage questions.

## What's in it

- **Students:** Sign up (OTP email), sign in, pick a subject, attempt questions, bookmark, add notes, use a todo list, chat with AI for explanations, view progress.
- **Admins:** Add/update/delete questions (subject, year, difficulty, options, solution).
- **Stack:** React + Vite + TypeScript (frontend), Node + Express + MongoDB (backend), JWT auth, Nodemailer for OTP, Gemini for AI.

## Run locally

**Backend**

```bash
cd backend
npm install
```

Create `backend/.env` with at least: `MONGO_URL`, `JWT_USER`, `JWT_ADMIN`. For email OTP add `EMAIL` and `PASS`. For AI add `GEMINI_API_KEY`. See `backend/.env.example` for all keys.

```bash
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
```

Set `VITE_BACKEND_URL` in `frontend/.env` (e.g. `http://localhost:3000` if backend runs on 3000).

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Project layout

- `frontend/` — React app (landing, signin/signup, dashboard, practice, AI chat, analytics).
- `backend/` — Express API (auth, user/admin routes, Gemini streaming, MongoDB via Mongoose).

## Env vars (summary)

**Backend:** `MONGO_URL`, `JWT_USER`, `JWT_ADMIN`, `EMAIL`, `PASS`, `GEMINI_API_KEY`, `API_NINJAS_KEY` (optional), `VOYAGE_API_KEY` (if you use embeddings).  
**Frontend:** `VITE_BACKEND_URL`, `VITE_APP_NAME` (optional).

## License

MIT. Built for learning and hackathon use.

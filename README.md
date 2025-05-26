# PayoutPilot

**A secure, flexible, and auditable payout automation platform for EdTech mentors and administrators.**

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture & Folder Structure](#architecture--folder-structure)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Clone the Repository](#clone-the-repository)
  * [Setup Environment Variables](#setup-environment-variables)
  * [Install Dependencies](#install-dependencies)
  * [Run the Application](#run-the-application)
* [Authentication & Authorization](#authentication--authorization)
* [Admin Portal](#admin-portal)
* [Mentor Portal](#mentor-portal)
* [Real-time Chat & AI Assistant](#real-time-chat--ai-assistant)
* [API Endpoints](#api-endpoints)
* [Development Workflow](#development-workflow)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)
* [Project Links](#project-links)

---

## Overview

As EdTech platforms scale, managing mentor payouts across diverse session types and time zones becomes complex. **PayoutPilot** automates the entire workflow:

* Collect session data (manual or CSV uploads)
* Calculate custom payout breakdowns with fees, taxes, and deductions
* Generate and share receipts
* Provide a secure chat (human & AI modes)
* Maintain full audit logs

This full-stack app uses Next.js and Tailwind CSS on the frontend, and Node.js/Express, MongoDB, Firebase Admin, Socket.io, and OpenAI on the backend.

---

## Features

### Common

* Responsive UI with Tailwind CSS & DaisyUI themes
* Firebase Authentication (Email/password, Google OAuth)
* Role-based access (Admin vs. Mentor)
* Persistent sessions & token refresh

### Admin Portal

* **Dashboard**: Metrics cards & interactive charts
* **Sessions**: Manual entry & CSV upload
* **Payouts**: Filter, date ranges, export CSV
* **Receipts**: Generate, filter, search, download PDF
* **Mentors**: List, add/edit via modal, toggle active/inactive, delete
* **Chat**: Real-time WebSocket chat & AI assistant mode
* **Audit Logs**: View change history
* **Simulation Mode**: Dry runs before live payouts
* **Exports**: CSV downloads & webhook hooks
* **Settings**: Platform configurations

### Mentor Portal

* **Dashboard**: Personal stats, charts, insights
* **Sessions**: History & clickable details
* **Receipts**: Downloadable receipts list
* **Chat**: Choosable Human vs. AI assistant
* **Notifications**: System alerts
* **Earnings**: Detailed breakdown & trends
* **Profile & Settings**: Edit profile, change password, preferences
* **Request Payout**: Submit manual payout requests

---

## Tech Stack

| Layer                | Technology                                  |
| -------------------- | ------------------------------------------- |
| Frontend             | Next.js 14 • React • Tailwind CSS • DaisyUI |
| Backend              | Node.js • Express • Socket.io               |
| Database             | MongoDB • Mongoose                          |
| Authentication       | Firebase Auth • Firebase Admin SDK          |
| AI Chat              | OpenAI API                                  |
| DevTools & Utilities | ESBuild, Prettier, ESLint                   |

---

## Architecture & Folder Structure

```
/web                   # Next.js frontend
├─ app                 # App Router pages
│  ├─ admin            # Admin layouts & pages
│  ├─ mentor           # Mentor layouts & pages
│  ├─ api              # Edge / API routes (OpenAI chat)
│  ├─ login/page.tsx
│  ├─ register/page.tsx
│  └─ layout.tsx       # Root layout
├─ src
│  ├─ components      # Reusable components (Header, Sidebar, Modal…)
│  ├─ lib
│  │  ├─ firebaseClient.ts  # Client-side auth hooks
│  │  └─ firebaseAdmin.ts   # Server-side auth
│  └─ styles           # globals.css
│
/api                   # Express + Socket.io + REST API
├─ src
│  ├─ routers         # auth.js, chat.js,
│  ├─ models          # Mongoose schemas
│  ├─ lib             # Firebase Admin setup, OpenAI config
│  └─ index.js        # Server entrypoint
├─ serviceAccountKey.json  # Firebase Admin credentials
└─ .env               # env vars
```

---

## Getting Started

### Prerequisites

* Node.js v18+ (or latest LTS)
* npm or Yarn
* MongoDB Atlas or local instance
* Firebase project with Auth enabled & Web SDK config
* OpenAI API key

### Clone the Repository

```bash
git clone https://github.com/your-org/payoutpilot.git
cd payoutpilot
```

### Setup Environment Variables

Copy and rename `.env.example` to `.env` in both `/web` and `/api` directories, filling in your keys:

```ini
# /web/.env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000

# /api/.env
MONGODB_URI=mongodb+srv://...
CLIENT_ORIGIN=http://localhost:3000
OPENAI_API_KEY=sk-...
```

Place `serviceAccountKey.json` (downloaded from Firebase Console) into `/api/src/`.

### Install Dependencies

```bash
# in root
yarn             # or npm install
# or install individually
yarn workspace web install
yarn workspace api install
```

### Run the Application

```bash
# Start backend (port 4000)
cd api && npm run dev

# In new terminal, start frontend (port 3000)
cd web && npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000).

---

## Authentication & Authorization

* **Register**: `/register` allows new Admin, EdTech Admin, or Mentor sign-up.
* **Login**: `/login` with email/password or Google OAuth.
* Role-based redirects to `/admin/dashboard` or `/mentor/dashboard`.
* Protected routes via custom middleware on both client & server.

---

## Admin Portal

Access via `/admin`:

* **Dashboard**: Key metrics & charts
* **Sessions**: Add/edit sessions, CSV upload
* **Payouts**: View/filter payouts, export CSV
* **Receipts**: Generate/download PDFs
* **Mentors**: CRUD mentors with modal dialogues
* **Chat**: Real-time chat (Human & AI)
* **Audit Logs**: View historical changes
* **Simulation**: Dry-run mode
* **Exports**: CSV export & webhooks
* **Settings**: Platform-level config

---

## Mentor Portal

Access via `/mentor`:

* **Dashboard**: Personal stats & insights
* **Sessions**: History with filters
* **Receipts**: Downloadable PDF receipts
* **Chat**: Switch between AI assistant & Admin
* **Notifications**: Alerts & updates
* **Earnings**: Detailed payout analysis
* **Profile & Settings**: Manage account
* **Request Payout**: Submit custom requests

---

## Real-time Chat & AI Assistant

* **Socket.io** for bidirectional messaging
* **Human Chat**: Direct admin <→ mentor communication
* **AI Mode**: Integration with OpenAI GPT for instant responses
* **Toggle UI**: Pills to switch between modes
* **Typing Indicator**: Loader until AI reply

---

## API Endpoints

| Route            | Method  | Description                                  |
| ---------------- | ------- | -------------------------------------------- |
| `/auth/register` | POST    | Persist Firebase ID token & role             |
| `/auth/login`    | --      | Handled client-side by Firebase              |
| `/chat`          | POST    | OpenAI conversational AI gateway             |
| Socket.io events | emit/on | `mentorMessage`, `adminMessage`, `aiMessage` |

---

## Development Workflow

1. **Feature Branch**: `git checkout -b feat/your-feature`
2. **Lint & Format**: ESLint, Prettier run pre-commit
3. **Push & PR**: Review & merge
4. **Testing**: Add unit/ integration tests as needed

---

## Deployment

* Frontend: Vercel or Netlify (Next.js optimized)
* Backend: Render, Vercel
* Environment vars set in host
* MongoDB Atlas for production

---

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes and feature suggestions.

---

## License

This project is licensed under the **Masai License**. See [LICENSE](LICENSE.md) for details.

---

## project links

* Frontend Repo: https://github.com/yourusername/payoutpilot-frontend
* Backend Repo:  https://github.com/yourusername/payoutpilot-backend



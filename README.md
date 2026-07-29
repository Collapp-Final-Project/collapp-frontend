# 🤝 Collapp

A creative collaboration platform connecting professionals in the audiovisual world: makeup artists, photographers, models, and producers. Publish projects, discover opportunities, and collaborate with other creatives.

## 🔗 Repositories:

Frontend: [https://github.com/Collapp-Final-Project/collapp-frontend]
Backend: [https://github.com/Collapp-Final-Project/collapp-backend]

## 🛠️ Tech Stack

- **React 19** with **Vite 8** (HMR, fast builds)
- **React Router 7** for SPA navigation
- **SCSS** with per-component modules
- **Axios** as the HTTP client
- **Vitest** + Testing Library for tests

## ✅ Prerequisites

- Node.js 18+ and npm
- Spring Boot backend running at `http://localhost:8080/api`

## 🚀 Installation

```bash
git clone <repo-url>
cd collapp-frontend
npm install
```

### ⚙️ Environment Variables

Create a `.env` or `.env.local` file at the root:

```
VITE_API_URL=http://localhost:8080/api
```

### ▶️ Running in Development

```bash
npm run dev
```

The app is served by default at `http://localhost:5173`.

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `vite` | Development server with HMR |
| `npm run build` | `vite build` | Production build (`dist/`) |
| `npm run preview` | `vite preview` | Preview production build |
| `npm run lint` | `eslint .` | Run ESLint |
| `npm test` | `vitest run` | Unit tests (single run) |
| `npm run test:watch` | `vitest` | Tests in watch mode |

## 📁 Project Structure

```
src/
├── main.jsx                 # Entry point
├── App.jsx                  # Router + AuthProvider
├── api/
│   └── axiosClient.js       # Axios with JWT interceptor
├── context/
│   └── AuthProvider.jsx     # Authentication state management
├── hooks/
│   └── useAuth.js           # Hook to consume AuthContext
├── routes/
│   ├── ProtectedRoute.jsx   # Redirects to /login if not authenticated
│   └── AdminRoute.jsx       # Redirects if not ROLE_ADMIN
├── services/                # REST service layer
│   ├── authService.js
│   ├── offerService.js
│   ├── applicationService.js
│   └── userService.js
├── pages/                   # Pages (one folder per page)
│   ├── LandingPage/
│   ├── LoginPage/
│   ├── RegisterPage/
│   ├── FeedPage/
│   ├── OfferDetailPage/
│   ├── OfferFormPage/
│   ├── ProfilePage/
│   ├── ApplicationsPage/
│   ├── MyPublicationsPage/
│   ├── AdminPage/
│   └── NotFoundPage/
├── components/
│   ├── layout/              # MainLayout, BottomNav
│   ├── common/              # OfferCard, ApplicantCard, filters
│   └── ui/                  # FormInput, SubmitButton, PasswordInput...
├── styles/                  # Variables, mixins, and global SCSS reset
└── utils/                   # Constants, date formatting
```

## ✨ Features

- **JWT Authentication** — registration, login, `localStorage` persistence, automatic redirect on session expiration
- **User Roles** — regular users and administrators (`ROLE_ADMIN`)
- **Public Feed** — browse offers with text search and category filtering
- **Offer Publishing** — create, edit, delete, and change status (open, paused, closed)
- **Applications** — apply to offers, track status, accept/reject candidates
- **User Profile** — edit bio, avatar, and social links
- **Admin Panel** — list and delete any offer
- **Responsive Design** — bottom navigation adapted for mobile

## 🗂️ Domain

### Categories and Compensation

| Category | Label |
|---|---|
| `MAKEUP` | Makeup |
| `PHOTOGRAPHY_VIDEO` | Photo / Video |
| `MODEL_TALENT` | Model / Talent |
| `PRODUCTION` | Production |

| Compensation | Label |
|---|---|
| `PAID` | Paid |
| `COLLABORATION` | Collaboration |

### Statuses

| Offer Status | Label |
|---|---|
| `OPEN` | Open |
| `PAUSED` | Paused |
| `COVERED` | Closed |

| Application Status | Label |
|---|---|
| `PENDING` | Pending review |
| `ACCEPTED` | Application accepted |
| `REJECTED` | Application rejected |

## 🧭 Routes

| Path | Access | Page |
|---|---|---|
| `/` | Public | Landing |
| `/login` | Public | Login |
| `/register` | Public | Register |
| `/feed` | Public | Offers board |
| `/offers/:id` | Authenticated | Offer detail |
| `/offers/new` | Authenticated | Create offer |
| `/offers/:id/edit` | Owner | Edit offer |
| `/my-offers` | Authenticated | My publications |
| `/applications` | Authenticated | My applications |
| `/profile` | Authenticated | Profile |
| `/admin` | Administrator | Admin panel |

## 🔌 Backend API

This project is the frontend of a full-stack application. It requires a Spring Boot backend exposing the endpoints documented in `src/services/`. The `VITE_API_URL` variable defines the base URL of the REST API.

---

Made by **Andrea Tapia** 💜
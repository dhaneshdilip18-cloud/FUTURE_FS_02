# FutureFS CRM — Lead Management System

A modern, production-ready CRM (Customer Relationship Management) application built with React, TypeScript, and Tailwind CSS. Designed for managing leads, tracking conversions, and visualizing sales analytics with a sleek dark-themed UI.

**Live Demo:** [https://future-fs-02-eta-beige.vercel.app](https://future-fs-02-eta-beige.vercel.app)

---

## Features

- **Authentication** — Secure login and sign-up flows with demo credentials for quick access
- **Lead Management** — Add, edit, view, and delete leads with full CRUD support
- **Analytics Dashboard** — Interactive charts (pie, bar, line) powered by Recharts showing lead sources, conversion rates, and trends
- **Stats Overview** — At-a-glance KPIs including total leads, new leads, contacted, and converted counts
- **Visitor Lead Capture** — Public-facing form that lets website visitors submit their own lead info without logging in
- **Settings** — Per-user toggles for notifications, email alerts, sound effects, dark mode, and auto-save
- **Animated UI** — Smooth page transitions and component animations via Framer Motion
- **Fully Responsive** — Mobile-first layout with sidebar navigation and adaptive grids

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router DOM v7 |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React, React Icons |
| Backend (optional) | Supabase |
| Build Tool | Vite |
| Linting | ESLint + TypeScript ESLint |

---

## Project Structure

```
src/
├── components/
│   ├── DeleteConfirmModal.tsx   # Confirmation modal for lead deletion
│   ├── LeadDetailModal.tsx      # Full lead details in a modal overlay
│   ├── LeadForm.tsx             # Form for creating/editing leads
│   ├── LeadTable.tsx            # Sortable, filterable leads table
│   ├── LoadingSpinner.tsx       # Animated loading indicator
│   ├── LoginForm.tsx            # Login form with validation
│   ├── Navbar.tsx               # Top navigation bar
│   ├── PremiumSignInForm.tsx    # Premium-styled sign-in variant
│   ├── SearchFilter.tsx         # Search and filter controls
│   ├── Sidebar.tsx              # Side navigation menu
│   ├── SignUpForm.tsx           # Registration form
│   ├── StatsCard.tsx            # KPI stat card component
│   └── VisitorLeadForm.tsx      # Public visitor lead capture form
├── data/
│   └── sampleLeads.ts           # Sample lead data and chart helpers
├── hooks/
│   └── useAuth.ts               # Authentication hook (login/signup/logout)
├── layouts/
│   └── DashboardLayout.tsx      # Shared layout wrapping all dashboard pages
├── pages/
│   ├── Login.tsx                # Login/Sign-up page with branding panel
│   ├── Dashboard.tsx            # Main overview with stats and recent leads
│   ├── Leads.tsx                # Full leads list with search and filters
│   ├── AddLead.tsx              # Add new lead page
│   ├── Analytics.tsx            # Charts and conversion analytics
│   └── Settings.tsx             # User preference toggles
├── routes/
│   └── ProtectedRoute.tsx       # Route guard for authenticated pages
└── utils/
    ├── localStorage.ts          # Data persistence layer (leads, auth, settings)
    └── validators.ts            # Input validation helpers
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/FUTURE_FS_02.git
cd FUTURE_FS_02

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |
| `npm run typecheck` | Run TypeScript type checks |

---

## Demo Credentials

Use these credentials to log in without creating an account:

| Field | Value |
|---|---|
| Email | `admin@crm.com` |
| Password | `admin123` |

You can also sign up for a new account directly from the login page.

---

## Data Storage

By default, all data (leads, authentication state, settings) is persisted in the browser's **localStorage**. This makes setup zero-config — no backend required to run the app.

Storage keys used:

| Key | Contents |
|---|---|
| `crm_leads` | Array of lead objects |
| `crm_auth` | Logged-in user info |
| `crm_settings` | User preference toggles |

> **Note:** localStorage data is per-browser and per-origin. For multi-user or multi-device use, integrate the included Supabase dependency as a backend.

---

## Lead Data Model

```typescript
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;       // e.g. "Website", "Referral", "Cold Call"
  status: string;       // "New" | "Contacted" | "Converted" | "Lost"
  notes: string;
  createdAt: string;    // ISO 8601 timestamp
  updatedAt: string;    // ISO 8601 timestamp
}
```

---

## Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push the repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel auto-detects Vite — no extra configuration needed
4. Click **Deploy**

---

## License

This project is private. All rights reserved.

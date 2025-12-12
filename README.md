# DuoSync - Shared Habit Tracker for Couples

[cloudflarebutton]

A minimalist, shared habit tracking calendar for couples to visualize and build routines together.

DuoSync is a visually stunning, minimalist shared habit tracker designed exclusively for couples. The application centers around a beautiful, interactive monthly calendar view that visualizes the progress of both partners simultaneously.

## ✨ Key Features

- **Unified Calendar Interface**: Clean, glass-morphism inspired monthly grid displaying completion indicators (colored dots/icons) for both partners.
- **Dual-User System**: Seamless toggle between partners or 'Combined' view, with distinct color identities (e.g., Sage Green vs. Terracotta).
- **Habit Management Suite**: Intuitive slide-over panel to create, edit, and color-code habits assigned to 'Me', 'Partner', or 'Both'.
- **Interactive Day Detail**: Click a day to open a modal for checking off habits with satisfying micro-interactions.
- **Minimalist Aesthetic**: Generous whitespace, subtle gradients, elegant typography, and a warm gradient background for calm and connection.
- **Responsive & Polished**: Flawless across devices with smooth animations, hover states, and professional-grade UI.

## 🛠 Tech Stack

- **Frontend**: React 18, React Router, Tailwind CSS, shadcn/ui, Zustand, Framer Motion, date-fns, Lucide React
- **Backend**: Hono, Cloudflare Workers, Durable Objects (via custom entity library)
- **State & Data**: Optimistic UI updates, atomic storage via single Durable Object
- **UI/UX**: Glassmorphism design, micro-interactions, responsive layouts (mobile-first)
- **Dev Tools**: Vite, Bun, TypeScript, ESLint, TanStack Query

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (package manager)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (for Cloudflare deployment)
- Node.js 18+ (for some dev tools)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Generate TypeScript types from Workers bindings:
   ```bash
   bun run cf-typegen
   ```

### Development

- Start the development server:
  ```bash
  bun run dev
  ```
  Opens at `http://localhost:3000` (or `$PORT`).

- Lint the codebase:
  ```bash
  bun run lint
  ```

- Build for production:
  ```bash
  bun run build
  ```

- Preview production build:
  ```bash
  bun run preview
  ```

## 📱 Usage

1. **Calendar Dashboard** (Home): View the monthly calendar, toggle between partners, see progress dots.
2. **Habit Manager** (Drawer): Add/edit habits, assign owners ('Me', 'Partner', 'Both'), set colors.
3. **Day Focus** (Modal): Click any calendar day to toggle habit completions with animations.

Data persists via Cloudflare Durable Objects. No authentication required (single shared tracker instance).

Example API calls (from dev tools):
```bash
# List habits (future endpoint)
curl http://localhost:8787/api/habits

# Complete habit for a date
curl -X POST http://localhost:8787/api/habits/{habitId}/complete \
  -H "Content-Type: application/json" \
  -d '{"date": "2024-10-15", "user": "partnerA"}'
```

## ☁️ Deployment

Deploy to Cloudflare Workers with one command:

```bash
bun run deploy
```

This builds the frontend, bundles the Worker, and deploys both. Your app will be live at `https://<your-project>.workers.dev`.

[cloudflarebutton]

**Note**: Ensure you're logged in via `wrangler login` and have a Cloudflare account.

## 🏗️ Architecture

- **Frontend**: Vite + React Router SPA, served as static assets.
- **Backend**: Hono app on Cloudflare Workers with a single `GlobalDurableObject` for all state (habits, completions).
- **Storage**: Custom `IndexedEntity` pattern for atomic, indexed persistence (no direct DO access).
- **Data Flow**: Client → Hono API → Durable Object entities → Storage.
- **Shared Types**: `shared/types.ts` for type safety across FE/BE.

Views:
- **Calendar Dashboard**: Main monthly grid.
- **Habit Manager**: Sheet/drawer for CRUD.
- **Day Focus**: Dialog for daily checkoffs.

## 🤝 Contributing

1. Fork & clone
2. Install deps: `bun install`
3. Create feature branch: `git checkout -b feature/habit-analytics`
4. Lint & test changes
5. Commit & PR

Follow the [UI Non-Negotiables](https://github.com/your-org/duosync-tracker/blob/main/UI_GUIDELINES.md) for visual excellence.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Support

Built with ❤️ using Cloudflare Workers. Questions? Open an issue.

---

*⭐ Star us on GitHub if this helps your productivity!*
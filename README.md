# ManufacturaIQ — Manufacturing Engineering Copilot

> **AI-Powered, Evidence-Grounded Engineering Assistant for CNC Equipment, Maintenance & Production Diagnostics**

ManufacturaIQ is a specialized manufacturing engineering copilot designed for shop-floor engineers, CNC technicians, and maintenance operators. Built to interface with a LangGraph RAG reasoning backend, it grounds answers directly in equipment manuals, standard operating procedures (SOPs), lockout/tagout (LOTO) protocols, and historical diagnostic telemetry.

---

## ⚡ Key Features

- **Evidence-Grounded Citations**: Direct inline markers (`[1]`, `[2]`) linked 1:1 to indexed equipment manuals and reference pages.
- **Deep Diagnostic Breakdown**: Expandable sections for **Evidence**, **Possible Root Causes**, and **Recommended Checks** attached to each copilot response.
- **Safety Advisory Protocol**: Automatic non-error advisory banner for responses requiring human sign-off (`HUMAN_REVIEW`).
- **Clean Three-Column & Card Layout**:
  - **Left Sidebar**: Conversation history (Today / Last 7 Days), quick search, clear all, and **+ New Chat**.
  - **Center Chat**: Responsive chat stream with custom animated loaders, quick-prompt starters, and session PDF attachment.
  - **Right Sources Panel**: Live cited documents drawer with page numbers and text snippets.
- **Health & Readiness Monitoring**: Live connection status indicator querying backend `/health` and `/ready` endpoints.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

---

## 📂 Project Structure

```text
Macq_frnt/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Images and SVG branding assets
│   ├── components/
│   │   ├── chat/           # Chat interface components
│   │   │   ├── ChaoticOrbitLoader.tsx # Animated query loading spinner
│   │   │   ├── ChatPanel.tsx          # Main message feed & empty state
│   │   │   ├── CitationBadge.tsx      # Interactive inline [1], [2] badges
│   │   │   ├── HumanReviewBanner.tsx  # Safety review notification banner
│   │   │   ├── InputBar.tsx           # Text input & session PDF attachment
│   │   │   ├── MessageItem.tsx        # Message rendering with diagnostics
│   │   │   └── UploadModal.tsx        # Document upload modal dialog
│   │   ├── layout/         # Application shell layout
│   │   │   ├── Breadcrumbs.tsx        # Navigation breadcrumbs
│   │   │   ├── Header.tsx             # Wordmark & settings trigger
│   │   │   ├── SettingsPanel.tsx      # Connection status, account, & system info
│   │   │   └── Sidebar.tsx            # Clean conversation history & New Chat
│   │   └── views/          # Secondary route views
│   │       ├── KnowledgeBaseView.tsx  # Indexed manuals & document browser
│   │       ├── NotFoundPage.tsx       # 404 handler
│   │       └── UploadsView.tsx        # Ingestion queue & processing history
│   ├── context/
│   │   ├── ChatContext.tsx            # Global chat state provider
│   │   ├── chatContextDef.ts          # State interfaces & initial types
│   │   └── useChat.ts                 # Chat context hook
│   ├── hooks/
│   │   └── usePageMetadata.ts         # Document title & SEO metadata hook
│   ├── services/
│   │   ├── apiClient.ts               # Fetch/Axios API client with fallback mock
│   │   └── mockData.ts                # Seed conversations & dummy telemetry
│   ├── types/
│   │   └── contracts.ts               # Backend query & reasoning contracts
│   ├── App.tsx                        # Root layout & route configuration
│   ├── index.css                      # Tailwind base & theme token variables
│   └── main.tsx                       # React application entry point
├── .env.example            # Environment variable template
├── .gitignore              # Git ignore rules
├── index.html              # HTML shell
├── package.json            # Project dependencies & scripts
├── tailwind.config.js      # Custom theme color palette & shadow tokens
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 🔌 API Integration Contracts

The frontend interacts with the following backend endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/query` | Submits user engineering query; returns reasoning result, evidence bundle, and review status |
| `GET` | `/health` | Backend liveness probe |
| `GET` | `/ready` | Backend readiness probe (Qdrant, LangGraph, LLM connectivity) |

### Frontend Transport & Business Status Models

1. **Transport State** (Frontend owned):
   `idle` | `uploading` | `submitting` | `success` | `error`
2. **Business Status** (Backend returned):
   `pass` | `needs_clarification` | `human_review`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/rahul-x-byte/manufacturalQ.git
cd manufacturalQ

# Install dependencies
npm install
```

### Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Ensure `VITE_API_BASE_URL` points to your running FastAPI backend:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

```bash
# Typecheck & build bundle
npm run build

# Preview production build locally
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 📄 License

Internal proprietary software for ManufacturaIQ. All rights reserved.

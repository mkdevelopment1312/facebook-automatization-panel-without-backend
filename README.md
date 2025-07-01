# Facebook Automatization Panel

**Copyright © 2025 Kamil Maslanka. All rights reserved.**

A powerful tool for Facebook lead generation and automation. This panel provides comprehensive features for managing Facebook groups, monitoring activities, and automating messaging workflows.

## 🚀 Live Demo

**[View Live Application](https://mkdevelopment1312.github.io/facebook-automatization-panel-without-backend/)**

The application is automatically deployed to GitHub Pages via GitHub Actions.

## Features

- **Groups Manager**: Efficiently manage multiple Facebook groups
- **Live Monitor**: Real-time monitoring of Facebook activities
- **Messaging Panel**: Automated messaging capabilities
- **Settings Panel**: Comprehensive configuration options

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd facebook-automatization-panel
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:8080`

### Building for Production

```bash
bun run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── GroupsManager.tsx
│   ├── LiveMonitor.tsx
│   ├── MessagingPanel.tsx
│   └── SettingsPanel.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── pages/              # Application pages
```

## Development

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run build:dev` - Build in development mode
- `bun run lint` - Run ESLint
- `bun run preview` - Preview production build

## Deployment

The application is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a new deployment.

- **Live URL**: https://mkdevelopment1312.github.io/facebook-automatization-panel-without-backend/
- **Deployment**: Automated via GitHub Actions
- **Build Tool**: Vite with optimized production builds

## License

This project is proprietary software owned by Kamil Maslanka. All rights reserved.

---

**Author**: Kamil Maslanka  
**Project**: Facebook Automatization Panel

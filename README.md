# LifeOS - An Operating System for Life

A high-fidelity, production-ready monorepo spanning Desktop (Electron) and Mobile (React Native) applications.

## Project Structure

```
├── apps/
│   ├── desktop/     # Electron + React app (1280x800 desktop)
│   └── mobile/      # Expo + React Native app
├── packages/
│   ├── ui/          # Shared UI component library
│   └── core/        # Shared business logic and types
├── supabase/        # Database schema
└── turbo.json       # Turborepo configuration
```

## Tech Stack

- **Monorepo**: Turborepo with pnpm workspaces
- **Desktop**: Electron, React 18, Vite, Zustand, React-Query
- **Mobile**: Expo, React Native, Expo Router, NativeWind
- **UI/Styling**: Tailwind CSS v3.4+ with Glassmorphism Dark Theme
- **Database**: Supabase (PostgreSQL)

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- pnpm (recommended) or npm

### Installation

```bash
pnpm install
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run specific app
cd apps/desktop && pnpm dev
cd apps/mobile && pnpm start
```

### Building

```bash
# Build all packages and apps
pnpm build

# Build specific app
cd apps/desktop && pnpm build
```

### EAS Build & Deploy (Mobile)

This monorepo is configured to work with Expo Application Services (EAS). The mobile app lives in `apps/mobile` directory.

```bash
# Login to EAS (first time only)
npx eas login

# Configure your EAS project (first time only - run from mobile directory)
cd apps/mobile && npx eas build:configure

# Build for development (run from root with working-dir flag)
npx eas build --profile development --platform android

# Build for production
npx eas build --profile production --platform all

# Submit to app stores
npx eas submit --platform android
npx eas submit --platform ios
```

**Monorepo Configuration**: 
- The root `eas.json` contains build profiles
- The mobile app configuration is in `apps/mobile/app.json`
- The root `package.json` includes `react-native` as a devDependency to satisfy EAS import requirements
- Update the `projectId` in `apps/mobile/app.json` under `extra.eas.projectId` with your actual EAS project ID after initial setup

## Features

### Desktop App
- **Dashboard**: Bento grid layout with widgets (Morning Briefing, Task Matrix, Finance Sparkline)
- **Task Matrix**: Drag-and-drop task management (todo/done columns)
- **Zen Mode**: 25-minute focus timer with ambient sound mixer
- **Finance**: Receipt upload and tracking with Supabase integration
- **Custom TitleBar**: Draggable native-like title bar

### Mobile App
- **Home Screen**: Quick overview of tasks and budget
- **Barcode Scanner**: Real-time barcode scanning with pantry sync
- **Stats Screen**: Gamification metrics and progress tracking
- **Quick Add Modal**: Rapid task/transaction/note creation

## Styling

All components use a futuristic dark theme with:
- **Background**: #09090b
- **Surface**: #18181b
- **Primary**: #6366f1 (Indigo)
- **Accent**: #10b981 (Emerald)
- **Glass Effect**: Semi-transparent panels with backdrop blur

## Database Schema

See `/supabase/schema.sql` for the complete database schema including:
- User profiles with gamification stats
- Tasks with priority and energy cost
- Pantry items with barcode scanning
- Financial transactions with receipt images
- Focus sessions for wellness tracking

## Type Safety

All code uses TypeScript in strict mode. No `any` types allowed.

## Contributing

Please ensure all code follows the existing style conventions and maintains strict TypeScript typing.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a mortgage calculator web application built with React, TypeScript, and Vite. It provides mortgage calculation functionality with a modern, responsive UI.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Architecture

The application follows a simple React component architecture:

- **Entry Point**: `src/main.tsx` - Bootstraps the React application
- **Root Component**: `src/App.tsx` - Main application component
- **Core Logic**: `src/MortgageCalculator.tsx` - Contains all mortgage calculation logic and UI

### Tech Stack
- **Frontend**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11 + CSS modules
- **Icons**: Lucide React
- **Linting**: ESLint with React-specific rules

### Project Structure
```
src/
├── App.tsx                # Root component
├── MortgageCalculator.tsx # Main calculator component
├── main.tsx              # Application entry point
├── index.css             # Global styles (Tailwind directives)
└── App.css               # App-specific styles
```

## Key Implementation Notes

1. **State Management**: The app uses React's built-in state management (useState hooks) for handling calculator inputs and results.

2. **Styling**: Uses a combination of Tailwind CSS utilities and custom CSS. The Tailwind config is minimal with default settings.

3. **TypeScript**: Strict TypeScript configuration is enabled. All components and functions should be properly typed.

4. **No Testing Framework**: Currently no tests are configured. Consider adding Vitest or Jest if testing is needed.

5. **Build Output**: Production builds are output to the `dist/` directory.

## Development Considerations

- The project uses ES modules throughout (`"type": "module"` in package.json)
- Vite's Fast Refresh is enabled for rapid development
- No environment variables are currently configured
- No routing library is installed (single-page application)
- No state management library (Redux, Zustand, etc.) - uses React state only
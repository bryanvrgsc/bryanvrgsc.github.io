<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# bryanvrgsc.github.io

Premium development agency portfolio built with React, TypeScript, and Vite.

View your app in AI Studio: https://ai.studio/apps/drive/1W0s9_ttqjEMxujmoTGL-9eIgS3ulr1ma

## 🚀 Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

3. Run the app:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

This project has been reorganized for better maintainability and clarity. See the documentation below for details.

```
src/
├── components/     # React components (organized by function)
├── constants/      # Application constants and data
├── utils/          # Utility functions and helpers
├── types/          # TypeScript type definitions
├── store.ts        # Global state management
└── styles.css      # Global styles
```

## 📚 Documentation

- **[REORGANIZATION_COMPLETE.md](./REORGANIZATION_COMPLETE.md)** - ✅ Start here! Complete overview of the reorganization
- **[REORGANIZATION_SUMMARY.md](./REORGANIZATION_SUMMARY.md)** - Visual summary with metrics and examples
- **[REORGANIZATION_PLAN.md](./REORGANIZATION_PLAN.md)** - Detailed plan and roadmap
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Quick migration guide
- **[src/components/README.md](./src/components/README.md)** - Components documentation

## ✨ Features

- 🎨 Modern glassmorphism design
- 🌓 Dark/Light theme support
- 🌐 Bilingual (English/Spanish)
- 📱 Fully responsive
- ⚡ Optimized performance
- 🎭 Smooth animations
- 📊 Interactive canvas background

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Nanostores** - State management

## 📦 Build

```bash
npm run build
```

## 🎯 Code Organization

The codebase has been reorganized into a modular structure:

- **Components**: Separated into `common`, `layout`, `ui`, `modals`, and `views`
- **Constants**: Organized by domain (ui-text, services, portfolio, etc.)
- **Utils**: Helper functions and utilities
- **Types**: Centralized TypeScript definitions

See [REORGANIZATION_COMPLETE.md](./REORGANIZATION_COMPLETE.md) for full details.

---

**Last Updated**: 2025-11-29

# bryanvrgsc.github.io

This project showcases my skills, projects, and experience in web development. It features a modern design with glassmorphism, dark/light themes, bilingual support (English/Spanish), and a responsive layout.

### Núcleo y Lenguaje

**React 19**: La biblioteca principal para construir la interfaz de usuario.

**TypeScript**: El lenguaje de programación utilizado, que añade tipos estáticos a JavaScript para un código más robusto y seguro.

**Vite**: La herramienta de compilación y servidor de desarrollo, elegida por su extrema rapidez.

### Estilos y Diseño

**Tailwind CSS (v4)**: Framework de utilidad para el diseño rápido y responsivo.

**CSS Puro y Animaciones**: Utilizado extensivamente para el nuevo fondo animado (burbujas flotantes, efectos de brillo) y los efectos de "cristal" (Glassmorphism) sin depender de librerías pesadas de JavaScript.

**Diseño Responsivo**: Adaptado para móviles, tablets y escritorio.

### Gestión de Estado

**Nano Stores**: Una biblioteca de gestión de estado muy ligera y rápida, usada para manejar el tema (claro/oscuro), el idioma y el modo de rendimiento globalmente.

### Funcionalidades Específicas

**PDF.js** (pdfjs-dist): Motor para renderizar documentos PDF y generar sus miniaturas directamente en el navegador.

**Detect GPU**: Utilidad para detectar la capacidad de la tarjeta gráfica del usuario y activar automáticamente el "modo lite" en dispositivos lentos.

**Formspree**: (Integrado) Servicio para manejar el envío del formulario de contacto sin necesidad de un backend propio.

### Infraestructura

**GitHub Pages**: Plataforma de alojamiento estático donde vive tu sitio.

**npm**: Gestor de paquetes.

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

# Reorganización del Código - Plan de Modularización

## 📋 Resumen

Este documento describe la reorganización del código para mejorar la **mantenibilidad** y **claridad** del proyecto.

## 🎯 Objetivos

1. **Separación de responsabilidades**: Cada archivo tiene un propósito claro y específico
2. **Mejor organización**: Estructura de carpetas lógica y escalable
3. **Reutilización de código**: Componentes y utilidades compartidas
4. **Facilidad de mantenimiento**: Código más fácil de encontrar y modificar
5. **Type Safety**: Tipos TypeScript centralizados

## 📁 Nueva Estructura

```
src/
├── components/
│   ├── common/              # Componentes reutilizables básicos
│   │   ├── LiquidButton.tsx
│   │   ├── GlassElement.tsx
│   │   ├── GlassDock.tsx
│   │   └── Typewriter.tsx
│   │
│   ├── layout/              # Componentes de layout/estructura
│   │   ├── Header.tsx
│   │   ├── Dock.tsx
│   │   ├── CanvasBackground.tsx
│   │   └── ScrollToTop.tsx
│   │
│   ├── ui/                  # Componentes de UI específicos
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── TechCard.tsx
│   │   └── PDFViewer.tsx
│   │
│   ├── modals/              # Componentes modales
│   │   └── PortfolioModal.tsx
│   │
│   ├── views/               # Vistas de páginas
│   │   ├── HomeView.tsx
│   │   ├── ServicesView.tsx
│   │   ├── PortfolioView.tsx
│   │   ├── BlogView.tsx
│   │   └── ContactView.tsx
│   │
│   └── Icons.tsx            # Mantener como está (ya está bien organizado)
│
├── constants/               # Constantes separadas por dominio
│   ├── ui-text.ts          # Textos de UI en múltiples idiomas
│   ├── services.ts         # Datos de servicios
│   ├── portfolio.ts        # Datos de portafolio (pendiente)
│   ├── blog.ts             # Datos de blog (pendiente)
│   └── index.ts            # Exportaciones centralizadas
│
├── utils/                   # Utilidades y helpers
│   ├── navigation.ts       # Utilidades de navegación
│   ├── helpers.ts          # Funciones helper generales
│   └── theme.ts            # Utilidades de tema (pendiente)
│
├── types/                   # Tipos TypeScript
│   └── index.ts            # Definiciones de tipos
│
├── store.ts                # Estado global (sin cambios)
└── styles.css              # Estilos globales (sin cambios)
```

## ✅ Archivos Creados

### 1. Tipos (`src/types/index.ts`)
- ✅ Definiciones de tipos TypeScript centralizadas
- ✅ Interfaces para Service, PortfolioProject, BlogPost, etc.
- ✅ Type safety mejorado en toda la aplicación

### 2. Constantes

#### `src/constants/ui-text.ts`
- ✅ Textos de UI en inglés y español
- ✅ Separado del resto de constantes
- ✅ Fácil de mantener y actualizar traducciones

#### `src/constants/services.ts`
- ✅ Datos de servicios
- ✅ Tipado con TypeScript
- ✅ Separado por dominio

#### `src/constants/index.ts`
- ✅ Exportaciones centralizadas
- ✅ Punto único de importación

### 3. Utilidades

#### `src/utils/navigation.ts`
- ✅ `navigateTo()` - Navegación con hash routing
- ✅ `getCurrentPath()` - Obtener ruta actual
- ✅ `isPathActive()` - Verificar si una ruta está activa

#### `src/utils/helpers.ts`
- ✅ `getCategoryTheme()` - Temas por categoría
- ✅ `getEmbedUrl()` - Convertir URLs de Drive
- ✅ `formatMessage()` - Formatear mensajes con placeholders
- ✅ `isValidEmail()` - Validar emails
- ✅ `debounce()` - Función debounce

## 🔄 Próximos Pasos

### Fase 1: Componentes Comunes ⏳
- [x] Extraer `LiquidButton` a `src/components/common/LiquidButton.tsx`
- [x] Extraer `GlassElement` a `src/components/common/GlassElement.tsx`
- [ ] Extraer `GlassDock` a `src/components/common/GlassDock.tsx`
- [x] Extraer `Typewriter` a `src/components/common/Typewriter.tsx`

### Fase 2: Componentes de Layout ⏳
- [x] Extraer `Header` a `src/components/layout/Header.tsx`
- [x] Extraer `Dock` a `src/components/layout/Dock.tsx`
- [x] Extraer `CanvasBackground` a `src/components/layout/CanvasBackground.tsx`
- [x] Extraer `ScrollToTop` a `src/components/layout/ScrollToTop.tsx`

### Fase 3: Componentes de UI ⏳
- [x] Extraer `ThemeToggle` a `src/components/ui/ThemeToggle.tsx`
- [x] Extraer `LanguageToggle` a `src/components/ui/LanguageToggle.tsx`
- [x] Extraer `TechCard` a `src/components/ui/TechCard.tsx`
- [x] Extraer `PDFViewer` a `src/components/ui/PDFViewer.tsx`

### Fase 4: Vistas ⏳
- [ ] Extraer `HomeView` a `src/components/views/HomeView.tsx`
- [ ] Extraer `ServicesView` a `src/components/views/ServicesView.tsx`
- [ ] Extraer `PortfolioView` a `src/components/views/PortfolioView.tsx`
- [ ] Extraer `BlogView` a `src/components/views/BlogView.tsx`
- [ ] Extraer `ContactView` a `src/components/views/ContactView.tsx`

### Fase 5: Modales ⏳
- [ ] Extraer `PortfolioModal` a `src/components/modals/PortfolioModal.tsx`

### Fase 6: Constantes Restantes ⏳
- [ ] Crear `src/constants/portfolio.ts`
- [ ] Crear `src/constants/blog.ts`
- [ ] Crear `src/constants/engagement-models.ts`

### Fase 7: Limpieza Final ⏳
- [ ] Actualizar imports en `App.tsx`
- [ ] Eliminar archivos antiguos consolidados
- [ ] Verificar que todo funcione correctamente
- [ ] Actualizar documentación

## 💡 Beneficios de la Reorganización

### 1. **Mantenibilidad**
- Código más fácil de encontrar y modificar
- Cambios localizados en archivos específicos
- Menos conflictos en control de versiones

### 2. **Claridad**
- Estructura de carpetas intuitiva
- Nombres de archivos descriptivos
- Separación clara de responsabilidades

### 3. **Escalabilidad**
- Fácil agregar nuevos componentes
- Estructura preparada para crecer
- Patrones consistentes

### 4. **Reutilización**
- Componentes comunes fáciles de importar
- Utilidades compartidas
- Menos duplicación de código

### 5. **Type Safety**
- Tipos centralizados
- Mejor autocompletado en IDE
- Menos errores en tiempo de ejecución

## 🔧 Cómo Usar la Nueva Estructura

### Importar Constantes
```typescript
// Antes
import { UI_TEXT, SERVICES } from './src/constants';

// Ahora
import { UI_TEXT } from '@/constants/ui-text';
import { SERVICES } from '@/constants/services';
// O desde el index
import { UI_TEXT, SERVICES } from '@/constants';
```

### Importar Utilidades
```typescript
import { navigateTo, getCurrentPath } from '@/utils/navigation';
import { getCategoryTheme, isValidEmail } from '@/utils/helpers';
```

### Importar Componentes
```typescript
// Componentes comunes
import { LiquidButton } from '@/components/common/LiquidButton';
import { GlassElement } from '@/components/common/GlassElement';

// Componentes de layout
import { Header } from '@/components/layout/Header';
import { Dock } from '@/components/layout/Dock';

// Componentes de UI
import { ThemeToggle } from '@/components/ui/ThemeToggle';
```

### Importar Tipos
```typescript
import type { Language, Service, PortfolioProject } from '@/types';
```

## 📝 Notas

- Los archivos antiguos (`SharedUI.tsx`, `PageViews.tsx`) se mantendrán temporalmente para compatibilidad
- La migración se hará gradualmente para evitar romper la aplicación
- Cada componente extraído mantendrá su funcionalidad exacta
- Se agregarán comentarios de documentación en cada archivo nuevo

## 🎨 Convenciones de Código

1. **Nombres de archivos**: PascalCase para componentes (`LiquidButton.tsx`)
2. **Nombres de carpetas**: kebab-case o camelCase según contexto
3. **Exports**: Named exports preferidos sobre default exports
4. **Imports**: Ordenados por: externos, internos, tipos, estilos
5. **Comentarios**: JSDoc para funciones públicas

---

**Última actualización**: 2025-11-29
**Estado**: En progreso - Fase inicial completada

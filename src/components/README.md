# Components Directory

Esta carpeta contiene todos los componentes React de la aplicación, organizados por su función y propósito.

## 📁 Estructura

### `common/` - Componentes Comunes Reutilizables
Componentes primitivos que se usan en múltiples partes de la aplicación:
- **LiquidButton**: Botón con efecto de vidrio líquido
- **GlassElement**: Contenedor con efecto glassmorphism
- **GlassDock**: Dock con efecto de vidrio (pendiente de extraer)
- **Typewriter**: Efecto de máquina de escribir

### `layout/` - Componentes de Layout
Componentes estructurales de la aplicación:
- **Header**: Encabezado principal (pendiente de extraer)
- **Dock**: Barra de navegación inferior (pendiente de extraer)
- **CanvasBackground**: Fondo animado con red de nodos (pendiente de extraer)
- **ScrollToTop**: Botón para volver arriba (pendiente de extraer)

### `ui/` - Componentes de UI Específicos
Componentes de interfaz con funcionalidad específica:
- **ThemeToggle**: Selector de tema (pendiente de extraer)
- **LanguageToggle**: Selector de idioma (pendiente de extraer)
- **TechCard**: Tarjeta para mostrar tecnologías (pendiente de extraer)
- **PDFViewer**: Visor de PDFs (pendiente de extraer)

### `modals/` - Componentes Modales
Ventanas modales y overlays:
- **PortfolioModal**: Modal para detalles de proyectos (pendiente de extraer)

### `views/` - Vistas de Páginas
Componentes de página completa:
- **HomeView**: Vista de inicio (pendiente de extraer)
- **ServicesView**: Vista de servicios (pendiente de extraer)
- **PortfolioView**: Vista de portafolio (pendiente de extraer)
- **BlogView**: Vista de blog (pendiente de extraer)
- **ContactView**: Vista de contacto (pendiente de extraer)

### `Icons.tsx`
Colección de iconos SVG utilizados en la aplicación.

## 🔄 Estado de Migración

### ✅ Completado
- [x] Estructura de carpetas creada
- [x] LiquidButton extraído
- [x] GlassElement extraído
- [x] Typewriter extraído
- [x] Índices de exportación creados

### ⏳ Pendiente
- [ ] Extraer GlassDock
- [ ] Extraer componentes de layout
- [ ] Extraer componentes de UI
- [ ] Extraer vistas
- [ ] Extraer modales
- [ ] Actualizar imports en archivos existentes

## 💡 Guía de Uso

### Importar Componentes Comunes

```typescript
// Importación individual
import { LiquidButton } from '@/components/common/LiquidButton';

// Importación desde el índice
import { LiquidButton, GlassElement, Typewriter } from '@/components/common';
```

### Crear un Nuevo Componente

1. Determina la categoría apropiada (common, layout, ui, etc.)
2. Crea el archivo en la carpeta correspondiente
3. Agrega documentación JSDoc
4. Exporta el componente y sus tipos
5. Actualiza el archivo `index.ts` de la carpeta

### Ejemplo de Estructura de Componente

```typescript
import React from 'react';

/**
 * ComponentName - Brief description
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 */

export interface ComponentNameProps {
  // Props definition
}

export const ComponentName: React.FC<ComponentNameProps> = (props) => {
  // Component implementation
  return <div>...</div>;
};
```

## 📝 Convenciones

1. **Nombres de archivo**: PascalCase (ej: `LiquidButton.tsx`)
2. **Exports**: Named exports preferidos
3. **Props**: Interfaces exportadas con sufijo `Props`
4. **Documentación**: JSDoc para componentes públicos
5. **Tipos**: TypeScript estricto

## 🔗 Referencias

- [Plan de Reorganización](../../REORGANIZATION_PLAN.md)
- [Guía de Estilos](../../README.md)

---

**Última actualización**: 2025-11-29

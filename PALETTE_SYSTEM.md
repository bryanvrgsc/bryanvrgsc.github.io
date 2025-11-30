# Sistema de Paletas de Colores

## 📋 Descripción General

Este proyecto utiliza un **sistema de paletas centralizado** que permite cambiar toda la apariencia de la aplicación modificando una sola variable.

## 🎨 Paletas Disponibles

### Light Theme (Tema Claro)
1. **Emerald** (Por defecto) - Verde profesional y limpio
2. **Ocean** - Azul calmado y confiable
3. **Sunset** - Púrpura creativo y moderno
4. **Rose** - Rosa vibrante y energético
5. **Amber** - Ámbar cálido y optimista

### Dark Theme (Tema Oscuro)
1. **Neon Emerald** (Por defecto) - Verde vibrante sobre fondo oscuro
2. **Electric Blue** - Azul brillante de alta tecnología
3. **Cyber Purple** - Púrpura neón futurista
4. **Hot Pink** - Rosa audaz y llamativo
5. **Golden Hour** - Ámbar cálido y brillante

## 🔧 Cómo Cambiar la Paleta

### Método 1: Cambio Global (Recomendado)

Abre el archivo `src/constants/colors.ts` y modifica la constante `ACTIVE_PALETTE`:

```typescript
/**
 * Current active palette (can be changed to switch entire app theme)
 * Change this value to switch the entire application's color scheme
 */
export const ACTIVE_PALETTE: PaletteName = 'ocean'; // Cambia esto
```

**Opciones disponibles:**
- `'emerald'` - Verde (por defecto)
- `'ocean'` - Azul
- `'sunset'` - Púrpura
- `'rose'` - Rosa
- `'amber'` - Ámbar

### Ejemplo de Cambio

```typescript
// Para cambiar a tema azul océano:
export const ACTIVE_PALETTE: PaletteName = 'ocean';

// Para cambiar a tema rosa:
export const ACTIVE_PALETTE: PaletteName = 'rose';
```

**⚠️ IMPORTANTE**: Después de cambiar `ACTIVE_PALETTE`, **recarga completamente la aplicación** (Ctrl+R o Cmd+R) para ver los cambios.

## 🎯 Qué Cambia Automáticamente

Cuando cambias `ACTIVE_PALETTE`, los siguientes sistemas de colores se actualizan automáticamente:

### ✅ Actualización Automática

1. **BASE_COLORS** (Colores Base)
   - Fondos primarios y secundarios
   - Bordes de tarjetas
   - Efectos de brillo (glow)
   - Efectos neón

2. **NETWORK_COLORS** (Animación de Red)
   - Fondo del canvas
   - Color de los nodos
   - Color de las líneas de conexión
   - Color de los paquetes de datos
   - Efectos de brillo de paquetes

3. **SEMANTIC_COLORS** (Colores Semánticos)
   - Colores de éxito (success) - usa la paleta activa
   - Colores de error, advertencia e info - permanecen consistentes

4. **ACCENT_COLORS** (Colores de Acento)
   - Acento primario - usa la paleta activa
   - Variantes de opacidad
   - Colores sólidos

5. **GLOW_EFFECTS** (Efectos de Brillo)
   - Sombras primarias - usa la paleta activa
   - Diferentes intensidades (small, medium, large, etc.)

6. **CSS Variables**
   - `--primary-color` - Color primario
   - `--secondary-color` - Color secundario
   - `--accent-color` - Color de acento
   - `--primary-rgb` - Valores RGB del color primario

### ⚠️ Requiere Actualización Manual

Algunos componentes tienen colores **hardcodeados** en clases de Tailwind (ej: `emerald-500`, `text-emerald-500`) que NO se actualizan automáticamente. Estos incluyen:

- Algunos textos y gradientes en `HomeView`
- Botones y enlaces en `ContactView`
- Indicadores en `PortfolioView`
- Algunos iconos y efectos visuales

**Solución temporal**: Usa `DYNAMIC_COLORS` para obtener clases dinámicas:

```typescript
import { DYNAMIC_COLORS } from '@/constants/colors';

// En lugar de:
<div className="text-emerald-500">Texto</div>

// Usa:
<div className={DYNAMIC_COLORS.text}>Texto</div>
```

## 🔄 Flujo de Actualización

```
ACTIVE_PALETTE
    ↓
getActiveLightPalette() / getActiveDarkPalette()
    ↓
BASE_COLORS, NETWORK_COLORS, SEMANTIC_COLORS, etc.
    ↓
injectPaletteCSS() → Inyecta variables CSS
    ↓
Componentes que usan var(--primary-color) se actualizan
```

## 🐛 Troubleshooting (Solución de Problemas)

### Problema: "Algunos elementos no cambian de color"

**Causa**: Esos elementos usan clases de Tailwind hardcodeadas como `emerald-500` en lugar de variables CSS dinámicas.

**Solución**:
1. **Opción A - Usar DYNAMIC_COLORS** (Recomendado):
   ```typescript
   import { DYNAMIC_COLORS } from '@/constants/colors';
   <div className={DYNAMIC_COLORS.text}>Mi texto</div>
   ```

2. **Opción B - Usar variables CSS**:
   ```typescript
   <div style={{ color: 'var(--primary-color)' }}>Mi texto</div>
   ```

3. **Opción C - Usar colores inline**:
   ```typescript
   import { DYNAMIC_COLORS } from '@/constants/colors';
   <div style={{ color: DYNAMIC_COLORS.raw.light.primary }}>Mi texto</div>
   ```

### Problema: "Los cambios no se ven después de modificar ACTIVE_PALETTE"

**Solución**:
1. Guarda el archivo `colors.ts`
2. Recarga completamente la página (Ctrl+R o Cmd+R)
3. Si usas modo desarrollo, verifica que el servidor se haya reiniciado

### Problema: "Algunos gradientes siguen siendo verdes"

**Causa**: Los gradientes en Tailwind CSS están hardcodeados.

**Solución**: Reemplaza clases como `from-emerald-500` con:
```typescript
<div className={`bg-gradient-to-r ${DYNAMIC_COLORS.gradientFrom} ${DYNAMIC_COLORS.gradientTo}`}>
```

## ⚠️ Notas Importantes

1. **Un solo cambio lo controla todo**: Solo necesitas cambiar `ACTIVE_PALETTE` una vez
2. **Recarga requerida**: Después de cambiar la paleta, recarga la aplicación completamente
3. **Consistencia parcial**: La mayoría de componentes se actualizan automáticamente, pero algunos requieren actualización manual
4. **Colores sociales**: Los colores de redes sociales (LinkedIn, GitHub, etc.) NO cambian con la paleta
5. **Variables CSS disponibles**: Puedes usar `var(--primary-color)`, `var(--secondary-color)`, `var(--accent-color)` en cualquier componente

## 📊 Estado Actual del Sistema

### ✅ Totalmente Dinámico
- Animación de canvas (nodos, líneas, paquetes)
- Fondos y superficies
- Bordes y efectos de brillo
- Colores semánticos (success)
- Variables CSS inyectadas

### ⚠️ Parcialmente Dinámico
- Algunos componentes de UI (requieren usar `DYNAMIC_COLORS`)
- Gradientes en algunos views
- Efectos hover en ciertos elementos

### 🔧 Próximos Pasos para Completar
1. Reemplazar todas las clases `emerald-*` con `DYNAMIC_COLORS`
2. Actualizar gradientes hardcodeados
3. Convertir efectos de sombra a usar variables CSS

## 📚 Ejemplos de Uso

### Ejemplo 1: Texto con color primario
```typescript
import { DYNAMIC_COLORS } from '@/constants/colors';

<span className={DYNAMIC_COLORS.text}>
  Texto con color primario
</span>
```

### Ejemplo 2: Botón con fondo primario
```typescript
<button className={`${DYNAMIC_COLORS.bg} text-white px-4 py-2 rounded`}>
  Click me
</button>
```

### Ejemplo 3: Borde con color primario
```typescript
<div className={`border-2 ${DYNAMIC_COLORS.border} p-4`}>
  Contenido
</div>
```

### Ejemplo 4: Gradiente dinámico
```typescript
<div className={`bg-gradient-to-r ${DYNAMIC_COLORS.gradientFrom} ${DYNAMIC_COLORS.gradientTo}`}>
  Gradiente dinámico
</div>
```

### Ejemplo 5: Sombra/glow dinámico
```typescript
<div className={DYNAMIC_COLORS.glow}>
  Elemento con brillo
</div>
```

## 🎨 Personalización Avanzada

### Crear una Nueva Paleta

1. Define tu paleta en `colors.ts`:

```typescript
export const LIGHT_PALETTE_CUSTOM = {
  primary: '#tu-color',
  secondary: '#tu-color',
  accent: '#tu-color',
  background: '#tu-color',
  surface: '#tu-color',
} as const;
```

2. Añade el nombre a `PaletteName`:

```typescript
export type PaletteName = 'emerald' | 'ocean' | 'sunset' | 'rose' | 'amber' | 'custom';
```

3. Añádela a las funciones de selección:

```typescript
function getActiveLightPalette() {
  const palettes = {
    emerald: LIGHT_PALETTE_EMERALD,
    ocean: LIGHT_PALETTE_OCEAN,
    // ... otras paletas
    custom: LIGHT_PALETTE_CUSTOM, // Tu nueva paleta
  };
  return palettes[ACTIVE_PALETTE];
}
```

## 🚀 Ejemplo de Uso en Componentes

Los componentes automáticamente usan los colores correctos:

```typescript
import { BASE_COLORS, NETWORK_COLORS, DYNAMIC_COLORS } from '@/constants/colors';

// Los colores ya están actualizados según ACTIVE_PALETTE
const bgColor = BASE_COLORS.light.bgPrimary;
const nodeColor = NETWORK_COLORS.dark.nodeColor;

// Para clases de Tailwind dinámicas
<div className={DYNAMIC_COLORS.text}>Texto dinámico</div>
```

## 📊 Beneficios del Sistema

✅ **Centralizado**: Un solo punto de control  
✅ **Consistente**: Todos los componentes usan los mismos colores  
✅ **Fácil de cambiar**: Solo modifica una variable  
✅ **Type-safe**: TypeScript previene errores  
✅ **Escalable**: Fácil añadir nuevas paletas  
✅ **Variables CSS**: Acceso a colores desde cualquier componente

---

**Última actualización**: 2025-11-30  
**Estado**: Sistema funcional con algunas limitaciones en componentes hardcodeados

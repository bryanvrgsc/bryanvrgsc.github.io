# 🚀 Guía de Deployment en Vercel

Esta guía documenta el proceso completo de deployment del portfolio en Vercel.

## 📋 Tabla de Contenidos

- [Configuración Inicial](#configuración-inicial)
- [Deploy desde GitHub](#deploy-desde-github)
- [Variables de Entorno](#variables-de-entorno)
- [Comandos Útiles](#comandos-útiles)
- [CI/CD Automático](#cicd-automático)
- [Troubleshooting](#troubleshooting)

## 🎯 Configuración Inicial

### Prerequisitos

- Cuenta en [Vercel](https://vercel.com)
- Repositorio conectado a GitHub
- Node.js 18+ y pnpm instalados localmente

### Características Configuradas

✅ **Build automático** con `pnpm build`  
✅ **Headers de seguridad** (CSP, HSTS, X-Frame-Options)  
✅ **Cache optimizado** para assets estáticos (1 año)  
✅ **URLs limpias** sin `.html`  
✅ **Vercel Analytics** integrado  
✅ **Speed Insights** activado

## 🌐 Deploy desde GitHub

### Primera Vez

1. **Conectar Repositorio**
   - Ve a [Vercel Dashboard](https://vercel.com/dashboard)
   - Click en "Add New Project"
   - Selecciona tu repositorio de GitHub
   - Autoriza el acceso si es necesario

2. **Configurar Proyecto**
   - **Framework Preset**: Astro
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

3. **Variables de Entorno** (si aplica)
   - Agrega las variables necesarias desde el dashboard
   - Ver sección [Variables de Entorno](#variables-de-entorno)

4. **Deploy**
   - Click en "Deploy"
   - Espera a que complete el build (~2-3 minutos)
   - Tu sitio estará disponible en `https://tu-proyecto.vercel.app`

### Dominio Personalizado

1. Ve a Settings → Domains
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones de Vercel
4. Espera la propagación de DNS (hasta 48 horas)

## 🔐 Variables de Entorno

Las variables de entorno se configuran en el dashboard de Vercel:

```bash
# Ejemplo de variables (si son necesarias)
# No incluir en el repositorio
PUBLIC_API_URL=https://api.example.com
FORMSPREE_ENDPOINT=tu_endpoint_aqui
```

### Agregar Variables en Vercel

1. Ve a Settings → Environment Variables
2. Agregar las variables necesarias
3. Selecciona el entorno: Production, Preview, Development
4. Redeploy para aplicar cambios

## 🛠️ Comandos Útiles

### Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev

# Build de producción local
pnpm build

# Preview del build
pnpm preview
```

### Vercel CLI (Opcional)

```bash
# Instalar Vercel CLI globalmente
pnpm add -g vercel

# Login en Vercel
vercel login

# Deploy a preview
vercel

# Deploy a producción
vercel --prod

# Ver logs
vercel logs

# Ver información del proyecto
vercel inspect
```

## 🔄 CI/CD Automático

El deployment automático está configurado de la siguiente manera:

### Production Deployments

- **Trigger**: Push a la rama `main` o `master`
- **URL**: Tu dominio principal
- **Proceso**:
  1. Push a `main`
  2. Vercel detecta el cambio
  3. Ejecuta `pnpm build`
  4. Deploy automático
  5. Notificación por email/Slack

### Preview Deployments

- **Trigger**: Cada Pull Request
- **URL**: URL único por PR (`https://proyecto-hash.vercel.app`)
- **Beneficios**:
  - Probar cambios antes de mergear
  - Compartir previews con el equipo
  - Comments automáticos en el PR con el link

### Branch Deployments

- **Trigger**: Push a cualquier rama
- **URL**: URL único por rama
- **Configuración**: Habilitado por defecto

## 🔧 Configuración Avanzada

### Optimizaciones Aplicadas

#### Cache Headers

Assets estáticos (JS, CSS, imágenes) tienen cache de 1 año:

```json
{
  "key": "Cache-Control",
  "value": "public, max-age=31536000, immutable"
}
```

#### URLs Limpias

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

Esto convierte:
- ❌ `https://sitio.com/about.html`
- ✅ `https://sitio.com/about`

#### Redirects

```json
{
  "source": "/index.html",
  "destination": "/",
  "permanent": true
}
```

### Performance

- **Edge Network**: Distribución global automática
- **Smart CDN**: Cache inteligente
- **Image Optimization**: Optimización automática de imágenes
- **Compression**: Gzip/Brotli automático

## 🐛 Troubleshooting

### Build Falla

**Problema**: El build falla en Vercel pero funciona localmente

**Solución**:
```bash
# Limpiar cache local
rm -rf node_modules .astro dist
pnpm install
pnpm build

# Verificar que pnpm-lock.yaml esté en el repo
git add pnpm-lock.yaml
git commit -m "Add lock file"
```

### Variables de Entorno No Funcionan

**Problema**: Las variables de entorno no se aplican

**Solución**:
1. Verifica que las variables estén en Settings → Environment Variables
2. Asegúrate de que el entorno (Production/Preview) sea el correcto
3. **Redeploy** después de agregar variables
4. Las variables públicas deben tener prefijo `PUBLIC_` en Astro

### Headers No Se Aplican

**Problema**: Los headers de seguridad no aparecen

**Solución**:
```bash
# Verificar headers con curl
curl -I https://tu-sitio.vercel.app

# O usar herramientas online
# https://securityheaders.com
```

Si no aparecen, verifica que `vercel.json` esté en la raíz del proyecto.

### Cache No Funciona

**Problema**: Los assets no se cachean correctamente

**Solución**:
- Vercel usa hash en archivos automáticamente
- Verifica que el build genere archivos con hash
- Check en DevTools → Network → Response Headers

### Deploy Lento

**Problema**: El deployment tarda mucho

**Solución**:
```bash
# 1. Verificar tamaño de node_modules
du -sh node_modules

# 2. Usar .vercelignore para excluir archivos innecesarios
echo "*.md" >> .vercelignore
echo ".git" >> .vercelignore

# 3. Verificar que solo se instalen dependencias necesarias
pnpm prune
```

### Rollback a Versión Anterior

1. Ve a Deployments en el dashboard
2. Busca el deployment que funcionaba
3. Click en los tres puntos (...)
4. Selecciona "Promote to Production"

## 📊 Monitoreo

### Analytics

Vercel Analytics está integrado y proporciona:
- Páginas vistas
- Visitantes únicos
- Tiempo de carga
- Core Web Vitals

Accede en: Dashboard → Analytics

### Speed Insights

Monitorea el rendimiento real de usuarios:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

### Logs

Ver logs en tiempo real:

```bash
# Con Vercel CLI
vercel logs

# O en el dashboard
# Deployments → [selecciona deployment] → Logs
```

## 🔗 Enlaces Útiles

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Documentación de Vercel](https://vercel.com/docs)
- [Astro en Vercel](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel CLI Docs](https://vercel.com/docs/cli)

## 📝 Notas Adicionales

### Git Workflow Recomendado

```bash
# 1. Crear feature branch
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios y commits
git add .
git commit -m "feat: nueva funcionalidad"

# 3. Push al repo (esto crea un preview deployment)
git push origin feature/nueva-funcionalidad

# 4. Crear Pull Request en GitHub
# 5. Revisar el preview deployment
# 6. Mergear a main (esto despliega a producción)
```

### Mejores Prácticas

- ✅ Siempre probar localmente antes de push
- ✅ Usar preview deployments para QA
- ✅ Mantener commits pequeños y descriptivos
- ✅ Revisar Analytics regularmente
- ✅ Configurar notificaciones de deployment
- ✅ Documentar cambios en el README

### Costos

- **Plan Hobby**: Gratis
  - Deployments ilimitados
  - SSL automático
  - 100GB bandwidth
  - Ideal para proyectos personales

- **Plan Pro**: $20/mes
  - Todo lo de Hobby +
  - Analytics avanzado
  - Más bandwidth
  - Soporte prioritario

---

**Última actualización**: Diciembre 2025  
**Mantenedor**: Bryan Vargas

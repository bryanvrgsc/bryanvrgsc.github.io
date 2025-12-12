# Bryan Vargas - Portfolio

Ultra-fast, secure landing page built with **Astro** and **Cloudflare Pages**.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build) v5
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com)
- **Package Manager**: [pnpm](https://pnpm.io)
- **TypeScript**: Full type safety
- **Image Optimization**: vite-imagetools
- **Contact Form**: Formspree + reCAPTCHA

## ✨ Features

- ⚡ **Ultra-fast**: Astro's island architecture for optimal performance
- 🔒 **Secure**: Comprehensive security headers (CSP, HSTS, X-Frame-Options, etc.)
- 🌍 **Global CDN**: Deployed on Cloudflare's edge network
- 📱 **Responsive**: Mobile-first design
- 🎨 **Modern UI**: Tailwind CSS v4 with custom design system
- 🌙 **Dark Mode**: CSS custom properties for theming
- ♿ **Accessible**: WCAG compliant
- 📧 **Contact Form**: Serverless form with spam protection

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (install with `npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/bryanvrgsc/bryanvrgsc.github.io.git
cd bryanvrgsc.github.io

# Checkout the Astro branch
git checkout astro-cloudflare-migration

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env
# Edit .env and add your Formspree and reCAPTCHA keys
```

### Development

```bash
# Start dev server (http://localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type check
pnpm astro check
```

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
PUBLIC_FORMSPREE_ID=your_formspree_id_here
PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
```

### Getting API Keys

**Formspree**:
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy the form ID

**reCAPTCHA**:
1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Register a new site (use reCAPTCHA v3)
3. Add your domain
4. Copy the site key

## 🚢 Deployment

### Deploy to Cloudflare Pages

#### Option 1: Using Wrangler CLI

```bash
pnpm pages:deploy
```

#### Option 2: Using Cloudflare Dashboard

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your GitHub repository
3. Configure build settings:
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
   - **Framework preset**: Astro
4. Add environment variables
5. Deploy

### Configure Security Headers

In Cloudflare Pages dashboard, add these headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://formspree.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://formspree.io; frame-src https://www.google.com/recaptcha/; base-uri 'self'; form-action 'self' https://formspree.io; frame-ancestors 'none'; upgrade-insecure-requests

Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

X-Frame-Options: DENY

X-Content-Type-Options: nosniff

Referrer-Policy: strict-origin-when-cross-origin

Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
```

## 📁 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── middleware/
│   │   └── index.ts
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── tsconfig.json
└── wrangler.toml
```

## 🎨 Customization

### Colors

Edit `tailwind.config.cjs` to customize the color palette:

```javascript
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ }
}
```

### Fonts

Update Google Fonts import in `src/styles/global.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont&display=swap');
```

### Content

- **Landing Page**: Edit `src/pages/index.astro`
- **Meta Tags**: Edit `src/layouts/BaseLayout.astro`
- **Styles**: Edit `src/styles/global.css`

## 📊 Performance

Target Lighthouse scores:

- ⚡ Performance: 95+
- ♿ Accessibility: 95+
- ✅ Best Practices: 95+
- 🔍 SEO: 95+

## 🔒 Security

This project implements multiple security layers:

- **Content Security Policy (CSP)**: Prevents XSS attacks
- **HSTS**: Enforces HTTPS
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME sniffing
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features
- **DDoS Protection**: Via Cloudflare

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Bryan Vargas - [GitHub](https://github.com/bryanvrgsc)

---

Built with ❤️ using Astro and Cloudflare Pages

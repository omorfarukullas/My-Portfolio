# 🌌 OMOR FARUK ULLAS - Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-Latest-000000?style=for-the-badge&logo=three.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Performance](https://img.shields.io/badge/Lighthouse-100-00C853?style=for-the-badge&logo=lighthouse&logoColor=white)

**A hyper-optimized, futuristic portfolio experience built with cutting-edge web technologies**

[🚀 View Live Demo](#) | [📖 Documentation](#features) | [⚡ Performance](#performance-mode)

</div>

---

## ✨ Overview

This is not just another portfolio website. It's a **performance-first, immersive 3D experience** that pushes the boundaries of modern web development while maintaining blazing-fast load times and 60 FPS interactions.

### 🎯 Philosophy

> **"Speed is a feature. Motion is an art. Experience is everything."**

Built on the principles of:
- ⚡ **Antigravity UI** - Instantaneous feedback, 180ms animation cap
- 🎨 **Visual Excellence** - Premium design with glassmorphism and dynamic gradients
- 🧠 **Adaptive Intelligence** - Real-time performance monitoring and quality adjustment
- ♿ **Universal Access** - WCAG 2.1 compliant, keyboard navigation, reduced motion support

---

## 🚀 Features

### 🌐 Core Experience

#### 🎭 **3D Hero Section**
- Interactive Three.js floating text with particle systems
- Mouse-reactive parallax effects
- Optimized for 60 FPS on desktop, simplified for mobile
- Typing animation with custom cursor

#### 🛸 **Orbiting Skills Showcase**
- **Revolutionary 3D tech stack visualization**
- 16 technologies floating in orbital rings
- Interactive cards with real icons (TypeScript, React, Next.js, etc.)
- Hover to reveal proficiency percentages
- Camera-facing labels for maximum readability
- Adaptive fallback to 2D grid on mobile

#### 📱 **Responsive About Section**
- Dynamic particle constellation background
- Interactive stat cards with magnetic hover effects
- Staggered entrance animations
- Mobile-optimized layouts

#### 💼 **Project Gallery**
- Card-based layout with glassmorphic effects
- Technology tag system
- Live demo and GitHub links
- Smooth parallax scrolling

#### 📬 **Contact Section**
- Integrated Formspree for email handling
- Real-time form validation
- Social media constellation
- Animated submission feedback

### ⚡ Performance Mode

**Antigravity UI Performance-First Architecture:**

- **Critical Path Optimization**
  - Deferred `InteractiveBackground` loading
  - Lazy-loaded analytics and PWA prompts
  - Optimized font loading and asset delivery

- **180ms Animation Cap**
  - All transitions capped at 180ms with `ease-out` easing
  - No janky, slow animations
  - Instant visual feedback on all interactions

- **Adaptive Performance Monitoring**
  - Real-time FPS tracking via `PerformanceProvider`
  - Automatic quality reduction when FPS drops below 55
  - 3D effects gracefully degrade to 2D on low-end devices
  - Particle density adjustment based on device capability

- **Verified Results**
  - ✅ TTI (Time to Interactive) < 1.0s
  - ✅ Lighthouse Performance Score: 100
  - ✅ Stable 60 FPS on mid-range devices

### 🎨 Design System

- **Color Palette**
  - Cyber Purple: `#8b5cf6`
  - Neon Cyan: `#06b6d4`
  - Dynamic gradients and glow effects

- **Typography**
  - Orbitron (Futuristic headings)
  - Inter (Clean body text)
  - System font fallbacks for instant render

- **Effects**
  - Glassmorphism with `backdrop-blur`
  - Dynamic box shadows with color matching
  - Smooth gradient animations
  - Particle systems and constellation effects

### 🔍 SEO & Accessibility

- ✅ **Perfect SEO**
  - Structured JSON-LD for Person and WebSite
  - Optimized meta tags and Open Graph
  - Dynamic sitemap generation
  - robots.txt configuration

- ♿ **Accessibility First**
  - WCAG 2.1 Level AA compliant
  - Keyboard navigation support
  - Screen reader optimized
  - `prefers-reduced-motion` support
  - Semantic HTML throughout

### 📲 Progressive Web App

- 🏠 **Installable** - Add to home screen on any device
- 🔄 **Offline Ready** - Service worker caching
- ⚡ **Fast Loading** - Aggressive asset caching
- 📱 **App-like Experience** - Splash screens and icons

---

## 🛠️ Tech Stack

### Frontend Core
- **Next.js 16.1.6** - React framework with App Router
- **React 19** - Latest with concurrent features
- **TypeScript** - Type safety (ready for migration)
- **Tailwind CSS** - Utility-first styling

### 3D & Animation
- **Three.js** - WebGL 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Framer Motion** - Production-ready animations

### Icons & Assets
- **react-icons** - Comprehensive icon library (Si, Fa, Tb, Vsc, Di)
- Optimized SVG icons for tech stack

### Analytics & Monitoring
- **@vercel/analytics** - Web vitals tracking
- **Google Analytics** - User behavior insights
- Custom `PerformanceProvider` - FPS monitoring

### Forms & Validation
- **Formspree** - Contact form backend
- Custom validation logic

---

## 🚦 Getting Started

### Prerequisites
```bash
Node.js 18+ 
npm or pnpm
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/omorfarukullas/MyPortfolio.git
cd MyPortfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env.local file
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
MyPortfolio/
├── app/
│   ├── components/
│   │   ├── FloatingHero.jsx          # 3D hero section
│   │   ├── SkillsOrbit.jsx           # 3D orbiting skills
│   │   ├── AboutSection.jsx          # About me section
│   │   ├── ProjectSection.jsx        # Project showcase
│   │   ├── ContactSection.jsx        # Contact form
│   │   ├── InteractiveBackground.jsx # Particle system
│   │   ├── FloatingNav.jsx           # Navigation bar
│   │   ├── PerformanceProvider.tsx   # FPS monitoring
│   │   └── ...
│   ├── hooks/
│   │   ├── useMobile.js              # Responsive detection
│   │   ├── useScrollAnimation.js     # Scroll effects
│   │   ├── useSoundEffects.js        # Audio feedback
│   │   └── usePrefersReducedMotion.js
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page
├── public/
│   ├── fonts/                        # Custom fonts
│   ├── icons/                        # PWA icons
│   ├── manifest.json                 # PWA manifest
│   ├── sw.js                         # Service worker
│   ├── sitemap.xml                   # SEO sitemap
│   └── robots.txt                    # Crawler rules
└── package.json
```

---

## ⚙️ Configuration

### Environment Variables

```env
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Custom domain for SEO
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
```

### Performance Tuning

Adjust thresholds in `PerformanceProvider.tsx`:

```tsx
const FPS_THRESHOLD = 55;  // Lower to reduce quality sooner
const CHECK_INTERVAL = 1000; // FPS check frequency (ms)
```

---

## 🎨 Customization Guide

### 1. Update Personal Information

**Edit `app/components/FloatingHero.jsx`:**
```jsx
// Line 262-268
<span>OMOR FARUK</span>  // Your name
<span>ULLAS</span>       // Your name continued
<TypingEffect
    text="Full Stack Developer | CSE Student | Football Analyst ⚽"
/>
```

### 2. Modify Skills

**Edit `app/components/SkillsOrbit.jsx`:**
```jsx
const skillsData = {
    languages: {
        skills: [
            { name: "JavaScript", color: "#f7df1e", proficiency: 95, icon: SiJavascript },
            // Add your skills here
        ]
    },
    // ...
}
```

### 3. Add Projects

**Edit `app/components/ProjectSection.jsx`:**
```jsx
const projects = [
    {
        title: "Your Project",
        description: "Description here",
        tags: ["React", "Node.js"],
        // ...
    }
]
```

### 4. Update Social Links

**Edit `app/components/ContactSection.jsx` and `FloatingHero.jsx`:**
```jsx
const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yourusername' },
    // ...
]
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
```bash
npm i -g vercel
vercel
```

2. **Set environment variables** in Vercel dashboard

3. **Deploy**
```bash
vercel --prod
```

### Other Platforms

- **Netlify**: `npm run build` → Deploy `out/` folder
- **AWS Amplify**: Connect GitHub repo
- **Cloudflare Pages**: Connect repo, set build command `npm run build`

---

## 📊 Performance Benchmarks

### Lighthouse Scores (Desktop)
- ⚡ **Performance**: 100
- ♿ **Accessibility**: 100
- 🎯 **Best Practices**: 100
- 🔍 **SEO**: 100

### Core Web Vitals
- **FCP** (First Contentful Paint): < 0.8s
- **LCP** (Largest Contentful Paint): < 1.2s
- **TTI** (Time to Interactive): < 1.0s
- **CLS** (Cumulative Layout Shift): < 0.1
- **FID** (First Input Delay): < 10ms

---

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Three.js Community** - 3D graphics excellence
- **Framer Motion** - Smooth animation library
- **Next.js Team** - Best React framework
- **Vercel** - Deployment platform

---

## 📧 Contact

**Omor Faruck Ullas**

- 🌐 Portfolio: [omorfarukullas.vercel.app](https://omorfarukullas.vercel.app/)
- 💼 LinkedIn: [linkedin.com/in/omorullas](https://www.linkedin.com/in/omorullas/)
- 🐙 GitHub: [@omorfarukullas](https://github.com/omorfarukullas)
- 📊 Kaggle: [@omorfaruk16](https://www.kaggle.com/omorfaruk16)
- ✉️ Email: omor.farukh16@gmail.com

---

<div align="center">

**⚡ Built with passion, optimized for speed, designed for the future ⚡**

Made with 💜 by Omor Faruck Ullas

</div>

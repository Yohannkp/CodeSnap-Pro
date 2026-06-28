# CodeSnap Pro - Extension de Capture de Code Stylisée

## Concept & Vision

CodeSnap Pro est une extension Chrome qui permet aux développeurs de capturer du code avec un rendu visuellement impressionnant (syntax highlighting, thèmes personnalisables, fond sombre) pour partager sur LinkedIn, Twitter ou blogs. L'objectif : transformer du code brut en images professionnelles prêtes à l'emploi.

Le ton est **technique mais accessible** — on s'adresse à des devs qui veulent briller sans effort.

## Design Language

### Aesthetic Direction
Inspiration "IDE moderne" : fond sombre avec accents néon, typographie monospace premium, coins arrondis subtils.

### Color Palette
- **Primary** : `#6366F1` (Indigo vibrant)
- **Secondary** : `#1E1E2E` (Fond sombre)
- **Accent** : `#22D3EE` (Cyan néon)
- **Background** : `#0F0F14` (Noir profond)
- **Text** : `#E2E8F0` (Gris clair)
- **Success** : `#10B981` (Vert)

### Typography
- **Code** : `JetBrains Mono` (Google Fonts)
- **UI** : `Inter` (Google Fonts)
- Tailles : 14px base, 16px headings, 12px small

### Spatial System
- Espacement : multiples de 4px
- Border radius : 8px (cards), 12px (containers), 6px (buttons)
- Padding : 16px (sections), 8px (elements)

### Motion Philosophy
- Transitions : 200ms ease-out
- Hover effects : scale(1.02) + glow effect
- Loading : skeleton shimmer animation

## Tech Stack

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS
- **Capture** : Shiki (syntax highlighting) + html2canvas
- **Icons** : Lucide React
- **Monétisation** : Gumroad (paiement unique $19)
- **Déploiement** : Vercel (tiers gratuit)

## Project Structure

```
/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Layout principal
│   └── globals.css           # Styles globaux
├── components/
│   ├── Hero.tsx              # Section hero
│   ├── Features.tsx          # Fonctionnalités
│   ├── Preview.tsx           # Aperçu en direct
│   ├── Pricing.tsx           # Tarification
│   └── Footer.tsx            # Pied de page
├── lib/
│   ├── capture.ts            # Moteur de capture
│   ├── themes.ts             # Thèmes de couleur
│   └── utils.ts              # Utilitaires
├── extension/
│   ├── manifest.json          # Manifest Chrome
│   ├── popup.html            # Interface popup
│   ├── popup.js              # Logique popup
│   ├── content.js             # Script injection
│   └── styles.css            # Styles extension
├── public/
│   └── images/               # Assets
├── CLAUDE.md                 # Ce fichier
└── package.json
```

## Features

### Fonctionnalités Core
1. **Capture de sélection** — Sélectionner du code sur n'importe quelle page → capture stylisée
2. **Thèmes de couleur** — 10+ thèmes (Dracula, Nord, Monokai, GitHub Dark, etc.)
3. **Personnalisation** — Taille police, padding, coins arrondis, ombres
4. **Export multiple** — PNG haute résolution, Copier dans presse-papiers
5. **Watermark optionnel** — "Made with CodeSnap" discret (désactivable version payante)

### Modèle Freemium
- **Gratuit** : 5 captures/jour, watermark
- **Pro ($19 unique)** : Captures illimitées, sans watermark, thèmes premium

## Directives de Codage

1. **TypeScript strict** — Aucun `any`, types explicites partout
2. **Composants Server par défaut** — `use client` uniquement si nécessaire
3. **Tailwind only** — Pas de CSS custom (sauf variables CSS)
4. **Responsive first** — Mobile → Desktop
5. **Accessibilité** — Attributs ARIA, contraste suffisant

## Commandes

```bash
npm run dev          # Développement local
npm run build        # Build production
npm run lint         # Linting
```

## Deployment

- Landing page : Vercel (automatique depuis GitHub)
- Extension Chrome : Chrome Web Store Developer Dashboard

## TODO

- [x] Initialisation projet
- [ ] Configuration TypeScript + Tailwind
- [ ] Landing page complète
- [ ] Moteur de capture Shiki
- [ ] Extension Chrome
- [ ] Intégration Gumroad
- [ ] Déploiement Vercel
- [ ] Publication Chrome Web Store

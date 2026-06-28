# CodeSnap Pro

> Capturez du code avec un rendu stylisé et professionnel

![CodeSnap Pro](public/og-image.png)

## ✨ Fonctionnalités

- 🎨 **6 thèmes de couleurs** - Dracula, Nord, Monokai, GitHub Dark, One Dark, Night Owl
- 📸 **Export haute résolution** - PNG 3x pour une qualité maximale
- 🌐 **Déployé sur Vercel** - Performance et fiabilité
- 📱 **Design responsive** - Fonctionne sur desktop et mobile
- ⚡ **Rapide et léger** - Optimisé pour ne pas ralentir votre navigateur

## 🚀 Installation

### Site web
```bash
npm install
npm run dev
```

### Extension Chrome
1. Ouvrez `chrome://extensions/`
2. Activez le "Mode développeur"
3. Cliquez "Charger l'extension non empaquetée"
4. Sélectionnez le dossier `extension/`

## 📁 Structure du projet

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Page principale
│   └── layout.tsx         # Layout global
├── components/            # Composants React
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Preview.tsx        # Moteur de capture
│   └── Pricing.tsx
├── extension/             # Extension Chrome
│   ├── manifest.json
│   ├── popup.html
│   └── content.js
├── public/                # Fichiers statiques
│   ├── sitemap.xml
│   └── robots.txt
└── auto_claude/           # Scripts de test automatisés
```

## 💳 Tarification

| Plan | Prix | Fonctionnalités |
|------|------|------------------|
| Gratuit | 0€ | 5 captures/jour, filigrane |
| Pro | 19€ | Captures illimitées, tous les thèmes, sans filigrane |

## 🌐 Déploiement

### Vercel (Recommandé)
```bash
npm i -g vercel
vercel
```

### Chrome Web Store
1. Créez les icônes (16x16, 48x48, 128x128)
2. Zippez le dossier `extension/`
3. Publiez sur le [Chrome Web Store](https://chrome.google.com/webstore/devconsole)

## 🛠️ Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Shiki** - Syntax highlighting
- **html2canvas** - Capture d'écran

## 📝 Licence

© 2026 CodeSnap Pro. Tous droits réservés.
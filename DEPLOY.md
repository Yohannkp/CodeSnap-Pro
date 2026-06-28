# 🚀 Guide de Déploiement - CodeSnap Pro

## Option 1: Vercel (Recommandé)

### Étape 1: Créer un compte Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez "Sign Up"
3. Connectez-vous avec **GitHub** (recommandé)

### Étape 2: Importer le projet
1. Cliquez "Add New Project"
2. Importez ce dépôt GitHub
3. Vercel détecte automatiquement **Next.js** ✅

### Étape 3: Configurer le projet
```
Framework Preset:    Next.js (auto-détecté)
Build Command:      npm run build
Output Directory:   .next
Install Command:    npm install
```

### Étape 4: Variables d'environnement (optionnel)
Si vous ajoutez Gumroad plus tard:
```
NEXT_PUBLIC_GUMROAD_URL=https://votre-username.gumroad.com/l/codesnap-pro
```

### Étape 5: Déployer
1. Cliquez "Deploy"
2. Attendez 1-2 minutes
3. Votre site est en ligne! 🌐

### Optionnel: Domaine personnalisé
1. Project Settings → Domains
2. Ajoutez `codesnap.pro`
3. Configurez les DNS:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## Option 2: GitHub Pages (Gratuit)

### Étape 1: Préparer le build
Ajoutez `output: 'export'` dans `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }
}
module.exports = nextConfig
```

### Étape 2: Push sur GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-user/codesnap-pro.git
git push -u origin main
```

### Étape 3: Configurer GitHub Pages
1. Repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Save

---

## Déploiement automatique

Avec Vercel + GitHub:
- Chaque `git push` déclenche un nouveau déploiement
- Les preview deployments permettent de tester avant de merger
- Rollback instantané si problème

## 🔗 Liens utiles

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Documentation Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
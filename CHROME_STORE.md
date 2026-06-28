# 🧩 Guide Chrome Web Store - CodeSnap Pro

## Prérequis
- Compte développeur Chrome Web Store (5$ - paiement unique)
- Icônes PNG dans `/extension/icons/`

---

## Étape 1: Créer les icônes

Créez 3 images PNG:

| Taille | Utilisation |
|--------|-------------|
| 16×16 px | Favicon dans la barre d'adresse |
| 48×48 px | Liste des extensions |
| 128×128 px | Page du Chrome Web Store |

### Design recommandé
- Fond: gradient violet (#667eea → #764ba2)
- Texte: "CS" en blanc
- Format: PNG avec transparence

### Outils gratuits pour créer les icônes
- [Canva](https://canva.com)
- [Figma](https://figma.com)
- [Photopea](https://photopea.com) (en ligne)

---

## Étape 2: Préparer le ZIP

```bash
cd extension
zip -r codesnap-pro.zip manifest.json popup.html popup.js popup.css content.js background.js icons/
```

**Attention:** Le ZIP doit contenir UNIQUEMENT ces fichiers (pas le dossier parent).

---

## Étape 3: Créer le listing

### Informations du produit

```
Nom: CodeSnap Pro
Catégorie: Productivity
Langues: Français, English
Tagline: Capturez du code avec un rendu stylisé
```

### Description (EN - obligatoire)
```
CodeSnap Pro transforms code snippets into beautiful, shareable images.

Features:
✓ 6 beautiful color themes (Dracula, Nord, Monokai, and more)
✓ High-resolution PNG export (3x quality)
✓ One-click capture from any webpage
✓ Perfect for documentation, blogs, and social media
✓ Lightweight and fast

Whether you're a developer sharing code on Twitter, writing documentation, 
or creating tutorials, CodeSnap Pro makes your code look stunning.

Premium version includes:
- Unlimited captures
- Custom backgrounds
- No watermark
- Priority support

Install now and make your code beautiful!
```

### Screenshots requis
Minimum 1, recommandé 4-5:

| Screenshot | Taille | Contenu |
|-----------|--------|---------|
| 1 | 1280×800 | Capture du code avec thème Dracula |
| 2 | 1280×800 | Capture avec thème Nord |
| 3 | 1280×800 | Page d'accueil du site |
| 4 | 1280×800 | Comparaison gratuit vs Pro |

### Vidéo promotionnelle (optionnel)
- Durée: 30-60 secondes
- Montre l'extension en action
- Upload sur YouTube, lien vers Chrome Web Store

---

## Étape 4: Publier

1. Allez sur [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Cliquez "New Item"
3. Uploadez le ZIP
4. Remplissez toutes les informations
5. Cliquez "Save Draft" (pour vérifier)
6. Cliquez "Submit for Review"

### Temps de révision
- Premier envoi: 1-3 jours
- Mises à jour: quelques heures à 1 jour

---

## Étape 5: Après approbation

1. Votre extension est disponible sur le Chrome Web Store
2. Partagez le lien: `https://chrome.google.com/webstore/detail/codesnap-pro/[ID]`
3. Ajoutez le lien sur votre landing page

---

## 💰 Monétisation

### Option A: Gumroad (Recommandé)
1. Créez un produit sur [gumroad.com](https://gumroad.com)
2. Ajoutez le bouton sur votre site
3. Uploadez votre extension

### Option B: Paiement in-app
1. Utilisez Stripe ou Paddle
2. Vérifiez le paiement côté serveur
3. Mettez à jour le storage Chrome

---

## 📋 Checklist avant soumission

- [ ] Manifest.json valide (v3)
- [ ] Icônes 16×16, 48×48, 128×128 uploadées
- [ ] Description en anglais (obligatoire)
- [ ] Au moins 1 screenshot
- [ ] Privacy policy URL (requis)
- [ ] Extension testée en local
- [ ] ZIP prêt avec tous les fichiers

---

## 🔗 Liens

- [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- [Publication Policies](https://developer.chrome.com/docs/webstore/program-policies/)
- [Best Practices](https://developer.chrome.com/docs/webstore/best-practices/)
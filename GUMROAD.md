# 💳 Guide Gumroad - CodeSnap Pro

## Pourquoi Gumroad ?
- ✅ Pas de frais de setup
- ✅ Accepte PayPal + Carte
- ✅ Génère les receipts automatiquement
- ✅ Interface simple
- ✅ Intégration facile avec iframe/overlay

---

## Étape 1: Créer un compte

1. Allez sur [gumroad.com](https://gumroad.com)
2. Cliquez "Start selling"
3. Connectez-vous avec Google ou email
4. Completez votre profil (nom, photo)

---

## Étape 2: Créer le produit

### Informations de base
```
Name: CodeSnap Pro
Price: €19.00 (recommandé) ou €29.00
Type: Digital download
```

### Description
```
Capturez du code avec un rendu professionnel en un clic.

=== What's Included ===
✓ Extension Chrome CodeSnap Pro
✓ Accès à tous les thèmes (6 thèmes)
✓ Captures illimitées
✓ Export haute résolution (PNG 3x)
✓ Sans filigrane
✓ Support prioritaire par email

=== How It Works ===
1. Achetez et téléchargez l'extension
2. Installez-la dans Chrome
3. Capturez du code en 1 clic!

=== Questions? ===
Envoyez-moi un email: votre@email.com
```

### Options recommandées
- ✅ "Pay what you want" (minimum €19)
- ✅ "Ask for email address"
- ❌ "Require shipping address" (produit digital)
- ❌ "Enable custom amount" (optionnel)

---

## Étape 3: Personnaliser l'apparence

Dans Product Settings → Appearance:
```
Button text: "Acheter CodeSnap Pro - €19"
Button color: #667eea (violet)
Show Gumroad logo: Non (plus pro)
```

---

## Étape 4: Obtenir le lien Gumroad

Une fois le produit créé, vous aurez:
```
https://votre-username.gumroad.com/l/codesnap-pro
```

Notez ce lien - il sera utilisé sur votre site.

---

## Étape 5: Intégrer sur le site

### Option A: Bouton Gumroad (iframe overlay)
```html
<script src="https://gumroad.com/js/gumroad.js"></script>
<a class="gumroad-button" href="https://votre-username.gumroad.com/l/codesnap-pro" data-gumroad-single-product="true">
  Acheter CodeSnap Pro - €19
</a>
```

### Option B: Overlay sans redirection
```html
<script src="https://gumroad.com/js/gumroad.js"></script>
<a href="https://votre-username.gumroad.com/l/codesnap-pro"
   class="gumroad-button"
   data-gumroad-single-product="true"
   data-gumroad-single-product="true">
  Acheter maintenant
</a>
```

### Option C: Lien direct (ouvre Gumroad)
```html
<a href="https://votre-username.gumroad.com/l/codesnap-pro" target="_blank">
  Acheter sur Gumroad
</a>
```

---

## Étape 6: Intégration JavaScript (optionnel)

Pour suivre les conversions:
```javascript
 Gumroad().then(function(gumroad) {
   gumroad.onSuccessfulPurchase(function(product) {
     console.log('Achat réussi!', product);
     // Ex: Télécharger l'extension, envoyer un email, etc.
   });
 });
```

---

## Étape 7: Configurer les webhooks (optionnel)

Pour recevoir les achats en temps réel:

1. Gumroad Dashboard → Settings → Webhooks
2. Cliquez "Add webhook"
3. URL: `https://codesnap.pro/api/webhooks/gumroad`
4. Events: `product.purchase`, `subscription.start`, `subscription.cancelled`

### Payload exemple
```json
{
  "event": "product.purchase",
  "payload": {
    "id": "abc123",
    "email": "client@example.com",
    "product_id": "codesnap-pro",
    "price": 19.00,
    "currency": "EUR",
    "created_at": "2026-06-28T10:30:00Z"
  }
}
```

---

## 💰 Frais Gumroad

| Montant | Frais Gumroad |
|---------|--------------|
| €19.00 | €0.95 (5%) + €0.25 |
| **Net** | **€17.80** |

Pas de frais mensuels, pas de frais cachés.

---

## 📊 Dashboard Gumroad

Après publication, vous verrez:
- Revenus totaux
- Nombre de ventes
- Taux de conversion
- Emails collectés
- Liens de partage

---

## 🔗 Liens utiles

- [Gumroad Dashboard](https://app.gumroad.com/dashboard)
- [Documentation Gumroad](https://docs.gumroad.com/)
- [API Gumroad](https://gumroad.com/api)

---

## ✅ Checklist

- [ ] Compte Gumroad créé
- [ ] Produit "CodeSnap Pro" créé
- [ ] Prix fixé (€19 recommandé)
- [ ] Lien Gumroad noté
- [ ] Bouton intégré sur le site
- [ ] Test d'achat effectué
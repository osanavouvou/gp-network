# GP.Network — Site vitrine statique

Site conforme au cahier des charges : HTML5 / CSS3 / JS, sans base de données ni backend.

## Structure

```
gp-network-site/
├── index.html            Accueil
├── services.html         Les 8 domaines d'expertise
├── catalogue.html        Catalogue produits (filtres + tri en JS)
├── produit.html          Exemple de fiche produit
├── a-propos.html         Histoire, valeurs
├── contact.html          Formulaire de contact
├── merci.html            Page affichée après envoi du formulaire
├── mentions-legales.html RGPD / CGV / crédits
├── sitemap.xml
├── robots.txt
├── css/style.css
├── js/main.js
└── images/logo.jpeg
```

## Déploiement (aucun serveur requis)

Le site est 100% statique. Trois options simples, par ordre de facilité :

1. **Netlify** (recommandé — le formulaire de contact fonctionne sans rien configurer)
   Glisser-déposer le dossier sur [app.netlify.com/drop](https://app.netlify.com/drop), ou connecter un dépôt Git.
2. **Vercel** — `vercel deploy` depuis le dossier, ou import du dépôt Git.
3. **GitHub Pages** — pousser le dossier dans un dépôt et activer Pages dans les réglages.

## Formulaire de contact

Le formulaire (`contact.html`) est configuré pour **Netlify Forms** par défaut :
- fonctionne automatiquement une fois déployé sur Netlify, sans compte tiers
- protégé par un champ piège invisible (honeypot) + le filtre anti-spam natif de Netlify
- les messages reçus apparaissent dans **Netlify → votre site → Forms**
- après envoi, la personne est redirigée vers `merci.html`

**Si l'hébergement final n'est pas Netlify**, remplacer Netlify Forms par [Formspree](https://formspree.io) :
1. Créer un compte et un formulaire sur Formspree, récupérer l'identifiant
2. Dans `contact.html`, remplacer l'attribut `action="/merci.html"` par `action="https://formspree.io/f/VOTRE_ID"`
3. Supprimer `data-netlify="true"`, `netlify-honeypot="entreprise"` et le champ caché `form-name`

## À compléter avant mise en ligne

- **`mentions-legales.html`** : forme juridique, numéro RCCM, NIU, capital social, directeur de publication, coordonnées de l'hébergeur définitif (passages en italique dans la page)
- **`catalogue.html` / `produit.html`** : remplacer les produits de démonstration par le vrai catalogue (photos, prix, références, disponibilité)
- **Coordonnées** : l'adresse, le téléphone (`+242 00 000 00 00`) et l'email (`contact@gp-network.cg`) sont des placeholders à remplacer dans les 7 pages (recherche/remplace global)
- **Domaine** : `sitemap.xml` et `robots.txt` pointent vers `https://www.gp-network.cg` — à ajuster si le nom de domaine final diffère

## Personnalisation visuelle

Toutes les couleurs, polices et espacements sont centralisés en haut de `css/style.css` (variables CSS `:root`). Modifier ces valeurs suffit à ajuster l'identité visuelle sur l'ensemble du site.

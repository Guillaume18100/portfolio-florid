# Portfolio Artistique

Un site web React moderne et élégant pour présenter les créations artistiques d'une étudiante en école d'art.

## 🎨 Fonctionnalités

- **Galerie d'œuvres** : Affichage en grille responsive avec filtres par catégorie
- **Pages détaillées** : Chaque œuvre a sa propre page avec informations complètes
- **Design moderne** : Interface épurée avec animations fluides (Framer Motion)
- **Responsive** : Optimisé pour tous les appareils (mobile, tablette, desktop)
- **Modulaire** : Facile d'ajouter de nouvelles œuvres et catégories

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev

# Construction pour la production
npm run build

# Prévisualisation de la version de production
npm run preview
```

Le site sera accessible à l'adresse : `http://localhost:5173/portfolio-florid/`

## 📁 Structure du projet

```
src/
├── components/          # Composants React
│   ├── Header.tsx      # En-tête avec navigation
│   ├── Gallery.tsx     # Galerie principale avec filtres
│   ├── ProjectDetail.tsx # Page détaillée d'une œuvre
│   ├── About.tsx       # Page à propos
│   └── Footer.tsx      # Pied de page
├── data/
│   └── projects.json   # Données des œuvres
├── types/
│   └── index.ts        # Types TypeScript
├── utils/
│   └── addingArtworks.ts # Guide pour ajouter des œuvres
├── App.tsx             # Composant principal
├── main.tsx           # Point d'entrée
└── index.css          # Styles Tailwind

img/                   # Images des œuvres
├── Affiche_Final.jpg
├── Illustration_Delacroix.jpg
├── Illustration_sans_titre.jpg
└── Monstre_Portfolio.jpg
```

## ➕ Ajouter une nouvelle œuvre

### 1. Ajouter l'image
Placez votre nouvelle image dans le dossier `img/` à la racine du projet.
- Formats supportés : `.jpg`, `.jpeg`, `.png`, `.webp`
- Résolution recommandée : 1200x1200 pixels minimum

### 2. Ajouter les données
Éditez le fichier `src/data/projects.json` et ajoutez votre œuvre :

```json
{
  "id": 5,
  "title": "Nom de votre œuvre",
  "description": "Description détaillée de l'œuvre...",
  "image": "/img/votre-image.jpg",
  "category": "Illustration",
  "year": 2024,
  "techniques": ["Technique 1", "Technique 2"],
  "featured": false
}
```

### 3. Catégories disponibles
- `Design Graphique`
- `Illustration`
- `Art Conceptuel`

*Vous pouvez créer de nouvelles catégories, elles apparaîtront automatiquement dans les filtres.*

## 🎨 Personnalisation

### Couleurs
Le site utilise une palette de couleurs terre avec des accents dorés :
- Couleurs principales : `stone-*` (gris chauds)
- Couleur d'accent : `amber-*` (tons dorés)

Pour modifier les couleurs, éditez `tailwind.config.js` et `src/index.css`.

### Polices
- **Texte principal** : Inter (Google Fonts)
- **Titres décoratifs** : Playfair Display (Google Fonts)

### Animations
Les animations sont gérées par Framer Motion :
- Fade-in au chargement des pages
- Effets de hover sur les cartes
- Transitions fluides entre les pages

## 🛠️ Technologies utilisées

- **React 18** + **TypeScript**
- **Vite** (bundler et serveur de développement)
- **Tailwind CSS** (framework CSS utilitaire)
- **Framer Motion** (animations)
- **React Router** (navigation)

## 📱 Responsive Design

Le site s'adapte automatiquement aux différentes tailles d'écran :
- **Mobile** : Navigation verticale, grille 1 colonne
- **Tablette** : Grille 2 colonnes
- **Desktop** : Grille 3 colonnes, layout complet

## 🚀 Déploiement

### GitHub Pages
```bash
npm run deploy
```

### Autres plateformes
Le site peut être déployé sur n'importe quelle plateforme supportant les sites statiques :
- Vercel
- Netlify  
- GitHub Pages
- Firebase Hosting

## 📄 License

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier selon vos besoins.

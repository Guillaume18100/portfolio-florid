// Guide pour ajouter de nouvelles œuvres au portfolio

// 1. Ajoutez votre nouvelle image dans le dossier /img/
// 2. Ajoutez les données de l'œuvre dans /src/data/projects.json
// 3. Suivez cette structure :

/*
{
  "id": 5, // Prochain ID disponible
  "title": "Titre de votre œuvre",
  "description": "Description détaillée de l'œuvre, son inspiration, sa technique...",
  "image": "/img/nom-de-votre-image.jpg", // Chemin vers l'image
  "category": "Votre Catégorie", // Ex: "Illustration", "Design Graphique", "Art Conceptuel"
  "year": 2024, // Année de création
  "techniques": ["Technique 1", "Technique 2", "Technique 3"], // Techniques utilisées
  "featured": false // true pour mettre en avant l'œuvre
}
*/

// Catégories existantes :
// - "Design Graphique"
// - "Illustration" 
// - "Art Conceptuel"

// Vous pouvez créer de nouvelles catégories, elles apparaîtront automatiquement dans les filtres

// Types d'images supportés : .jpg, .jpeg, .png, .webp
// Résolution recommandée : 1200x1200 pixels minimum pour une meilleure qualité

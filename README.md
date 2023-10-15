# Projet Ownily

## Technologies Utilisées

- **Backend**: Node.js
- **Frontend**: EJS (Embedded JavaScript), un moteur de modèle pour Node.js

## Structure du Projet

Le projet Ownily suit une structure MVC (Modèle-Vue-Contrôleur) classique pour l'organisation de son code source. Voici un aperçu de la structure du projet :

### Structure de Base (MVC)

- **Modèle**: Situé à la racine du projet `/src/models`.
- **Vue**: Située à la racine du projet `/views`.
- **Contrôleur**: Situé à la racine du projet `/src/controllers`.

### Autres Composants

- **Scripts** (pour la communication entre le frontend et l'API du backend) : Situé à la racine du projet `/src/scripts`.
- **Routes** (pour la gestion des appels aux API) : Situé à la racine du projet `/src/routes`.
- **Rendu** (pour la gestion des redirections de pages web) : Situé à la racine du projet `/src/render`.
- **Public** (pour la gestion des médias) : Situé à la racine du projet `/public`.
- **Assets** (pour la gestion des styles) : Situé à la racine du projet `/assets`.

### Configuration Essentielle

Le fichier `.env` est essentiel pour le lancement de l'application. Il contient les variables d'environnement nécessaires pour configurer l'application conformément à vos besoins.

### Installation

Avant de lancer l'application, assurez-vous d'installer les dépendances nécessaires en exécutant la commande suivante dans le répertoire racine du projet :

```bash
npm install

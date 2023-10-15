# Projet Ownily

## Techonologie utilisée:

- Backend: NodeJS
 
- Frontend: Framework ejs de nodejs (manque de temps utilisé d'autre techno pour le frontend)
 
### Structure du projet

  # Structure de base: MVC

  - Model: raçine du project /src/models
  - Vue: raçine du project /views
  - Controller: raçine du project /src/controllers

  # Autre:
  - Scripts (permettant la communication de front et api avec le back): raçine du projet /src/scripts
  - Routes (gestion d' appel des apis): raçine du projet /src/routes
  - Render (gestion de redirection du page web):   raçine du projet /src/render
  - Public (gestion des media):   raçine du projet /public
  - Asset (gestion des styles):   raçine du projet /assets

### N.B: le fichier .env est essentielle pour le lancement de l'application 

Afin d'appliquer la version attendue pour faire tourner l'application

### Installation du back et du front

  -npm install (pour l'installation des dépendences)

 # N.B: j'ai pas utilisé docker pour ce test

### Pour lancer la stack il est préférable d'utiliser ces commandes dans le racine du projet:

```bash

npm start 
ou
npm run start:dev

## Contrainte lors du développement:

# Manque de temps pour ajouter d'autre fonctionalité de base comme:
  - gestion profile de l'utilisateur connecté
  - gestion historique pour chaque appartement et locataire
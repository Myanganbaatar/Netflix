# Netflix

2 branche

  qui est vous , ce que vous avez compris du cours , comment vous allez appliquer le cours aux un projet comme le netflix , 

  Je m'appelle Barsbold MYANGANBAATAR. Je suis un etudiant de G4A.

  À travers ce cours,j'ai compris que la conception de systèmes à grande échelle repose désormais sur l'abandon des structures monolithiques au profit d'architectures distribuées. 

  Pour appliquer ces enseignements à un projet de l'envergure de Netflix, je ne chercherais pas à construire l'application comme un bloc unique, mais je privilégierais une architecture de microservices où chaque fonctionnalité est isolée. 
  Par exemple, je créerais un service dédié uniquement à la recherche, un autre pour la gestion des abonnés et un troisième pour le moteur de recommandation, permettant ainsi à chaque module d'évoluer sans risquer de faire tomber l'ensemble de la plateforme. 
  Cette segmentation permettrait d'optimiser les ressources en n'augmentant la puissance de calcul que sur les services les plus sollicités lors des pics d'audience. 
  Sur le plan de la diffusion, j'appliquerais les concepts de performance réseau en mettant en place un réseau de distribution de contenu . 
  L'idée serait de répliquer les fichiers vidéo sur des serveurs stratégiquement placés au plus près des utilisateurs afin de minimiser la latence et d'offrir un streaming fluide, même en haute définition.
  Enfin, pour garantir une fiabilité maximale, j'intégrerais des mécanismes de tolérance aux pannes comme le "circuit breaker", 
  qui permet de désactiver temporairement un composant défectueux tout en maintenant les fonctions vitales du site, assurant ainsi une expérience utilisateur sans interruption majeure.

La Couche de Présentation -Cette couche représente l'interface utilisateur (UI) et l'expérience utilisateur (UX). Sa complexité réside dans l'immense diversité des appareils : Netflix doit fonctionner aussi bien sur une PlayStation que sur un iPhone ou une vieille télévision connectée.
Le Système de Profils : L'interface qui permet de choisir qui regarde (adulte ou enfant) avec des designs personnalisés.
La Navigation et le Catalogue : Le défilement infini des affiches de films, les catégories 
Le Lecteur Vidéo Interactif : Le bouton "Passer l'introduction", le choix des langues/sous-titres 
La Couche Application - Cette couche n'est pas un seul programme, mais une armée de petits logiciels spécialisés qui communiquent entre eux.
Le Moteur de Recommandation : L'intelligence artificielle qui analyse ton historique pour calculer un "Score de concordance"
La Gestion des Droits  : Le service qui vérifie que tu as l'autorisation de regarder un contenu spécifique selon ton pays et ton abonnement.

L'Encodage Dynamique : Une fonction invisible qui découpe la vidéo en petits morceaux de différentes qualités (480p, 1080p,) pour s'adapter à ton débit internet.
Le Service de Facturation : Le système qui gère les prélèvements mensuels, les cartes cadeaux et les rappels de paiement.
La Persistance des Profils : Le stockage de ta "Ma liste" et de l'endroit exact où tu as arrêté ton film (Timecode) pour que tu puisses reprendre sur un autre appareil.
La Distribution Géographique (CDN Open Connect) : La fonctionnalité qui consiste à copier les films les plus regardés sur des serveurs locaux proches de chez toi pour éviter les cercles de chargement.

L'Analyse des Logs : L'enregistrement de chaque clic pour savoir quels films sont abandonnés après 5 minutes, afin d'aider les studios à choisir les futurs projets.

decriver la page d'acceuil

Description de la page d'accueil (Le Concept)
(En-tête) : En haut à gauche, le logo rouge distinctif. À droite, les icônes de recherche, la cloche de notifications et ton avatar de profil (celui de Barsbold).

L'affiche principale : Une image immense qui occupe tout l'écran. C'est le film ou la série phare du moment. Il y a un bouton "Lecture" imposant et un bouton "Plus d'infos".

Les Lignes de Contenu : En dessous, des rangées de miniatures organisées par catégories : "Tendances actuelles"et "Ma liste".

## 📡 Interaction Frontend - Backend

Voici comment le Frontend (la page HTML) communique avec le Backend (le Serveur).

### 1. Recherche de Films
*   **Action** : L'utilisateur tape un mot clé dans la barre de recherche.
*   **Méthode HTTP** : GET
*   **Route** : /search
*   **Paramètres** : ?query=titre_du_film
*   **Explication** : Le navigateur envoie une requête pour *obtenir* (GET) des informations sans rien modifier sur le serveur.

### 2. Filtrage par Genre
*   **Action** : L'utilisateur sélectionne un genre (Action, Comédie, etc.).
*   **Méthode HTTP** : GET
*   **Route** : /filter
*   **Paramètres** : ?genre=action
*   **Explication** : Le serveur renvoie une nouvelle page ou une liste filtrée correspondant au critère demandé.

### 3. Connexion (Login)
*   **Action** : L'utilisateur entre son email et mot de passe.
*   **Méthode HTTP** : POST
*   **Route** : /login
*   **Body (Données)** : { email: "...", password: "..." }
*   **Explication** : Les données sensibles sont envoyées dans le *corps* de la requête (POST) pour ne pas apparaître dans l'URL. Le serveur vérifie les identifiants.

### 4. Inscription (Register)
*   **Action** : Un nouvel utilisateur crée un compte.
*   **Méthode HTTP** : POST
*   **Route** : /register
*   **Body (Données)** : { email: "...", password: "..." }
*   **Explication** : Le serveur reçoit les données et crée une nouvelle entrée dans la base de données.










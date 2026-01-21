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

La Couche de Présentation
La Couche Application
La Couche de Données

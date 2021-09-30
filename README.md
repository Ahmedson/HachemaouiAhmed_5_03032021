# Projet Orinoco : MVP site e-commerce d'appareil photos vintages

![logo Orinoco](https://github.com/Ahmedson/Orinoco_e-commerce_cameras_vintages/blob/master/assets/logo.png)

## Technologies à utilisées 

- HTML, CSS, Sass, Javascript "Vanilla" (frameworks non autorisés)

***
***

## Architecture générale

### L’application web sera composée de 4 pages :

- une page de vue sous forme de liste, montrant tous les articles disponibles à la vente ;
- une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier ;
- une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de texte dans les champs date ;
- une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.

***
***

## Informations complémentaires

- Le backend a déjà été développé, la partie front est a développer from scratch (aucune maquette fournie)
- Pour le MVP, la personnalisation du produit ne sera pas fonctionnelle : la page contenant un seul article aura un menu déroulant permettant à l'utilisateur de choisir une option de personnalisation, mais celle-ci ne sera ni envoyée au serveur ni reflétée dans la réponse du serveur.

***
***

## Requis pour le lancement du projet

Node.js

## Backend

1. Dans le dossier backend, depuis votre terminal lancer la commande :

```
npm install
```

2. puis

```
node server (ou nodemon server)
```

***

## Frontend

1. Dans le dossier frontend, puis dans le dossier html ouvrir le fichier  :

```
index.html
```

1. Le MVP est fonctionnel.

***
***

![sreenShot 1](https://github.com/Ahmedson/Orinoco_e-commerce_cameras_vintages/blob/master/assets/screenShot.png)
![sreenShot 2](https://github.com/Ahmedson/Orinoco_e-commerce_cameras_vintages/blob/master/assets/screenShot2.png)

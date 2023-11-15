# Evaluation en cours de formation : Garage de Vincent Parrot.

Lien vers le site : https://garage-vincent-parrot.netlify.app

Ce projet consiste en la création d'un site vitrine pour le Garage Automobile Vincent Parrot. L'objectif principal est de mettre en avant les services de réparation automobile proposés par le garage, ainsi que de présenter les voitures d'occasion disponibles à la vente.

Les fonctionnalités clés de ce projet comprennent la possibilité de se connecter en tant qu'administrateur ou employé, la présentation des services offerts, la définition des horaires d'ouverture du garage, la mise en exposition des voitures d'occasion, la capacité de filtrer la liste des véhicules selon divers critères, un formulaire de contact destiné aux visiteurs, ainsi qu'une section dédiée aux témoignages clients.

L'administrateur bénéficiera d'un espace dédié lui permettant de gérer facilement les informations du site. Dans l'ensemble, cette application vise à créer une présence en ligne pour le garage, en fournissant aux visiteurs des informations claires et la possibilité de contacter le garage ou de laisser leurs propres témoignages.

Vous trouverez dans mon repository Github le lien vers le site déployé en ligne ainsi que dans mon Notion.

Voici le lien vers mon Notion: Suivre [ce lien](https://pickled-raincoat-f6b.notion.site/D-velopper-l-application-web-Garage-Vincent-Parrot-6067ef53e06e4f2abd79fb53bf52d0ae)


Ci dessous les démarches de déploiment en local.

## Déployer l'application localement

Cloner le projet

```bash
    git clone https://github.com/WessamMounchit/Garage_V.Parrot.git
```

Installer les dépendances pour le côté client

```bash
    cd client
    npm install
```
Créer un fichier .env dans le dossier /client avec ce contenu : 

```bash
    REACT_APP_API_URL = http://localhost:8000
```

Installer les dépendances pour le côté server

```bash
    cd server
    npm install
```

Créer un fichier .env dans le dossier /server avec ce contenu : 

```bash
PORT: 5000
SERVER_URL: http://localhost:5000
CLIENT_URL: http://localhost:3000
SECRET: ExempleMDP
PG_CONNECTION_STRING: postgres://rezhiiha:bKqgN6IkbnO2dIObq7QIktz6E9_1svQK@cornelius.db.elephantsql.com/rezhiiha
PG_USER: rezhiiha
PG_HOST: cornelius.db.elephantsql.com
PG_DATABASE: rezhiiha
PG_PASSWORD: bKqgN6IkbnO2dIObq7QIktz6E9_1svQK
PG_PORT: 5432
```
NB: une base de données PostgreSQL hébergée sur https://api.elephantsql.com/ vous est fournie,
en cas de problème avec cette BDD, vous pouvez créer votre propre base de données PostgreSQL,
l'alimenter avec le fichier database.sql (où se touvent toutes les requêtes
nécessaires y compris celle pour créer l'admin) et la connecter à ce serveur,
vous pouvez également modifier la variable "SECRET" et mettre ce que vous voulez à la place.


Démarrer le front :

```bash
    npm start
```

Démarrer le back :

```bash
    npm run dev
```

### Vous retrouverez mes livrables ici :

Suivre [ce lien](https://pickled-raincoat-f6b.notion.site/D-velopper-l-application-web-Garage-Vincent-Parrot-6067ef53e06e4f2abd79fb53bf52d0ae)

## Auteur

-[@WessamMounchit](https://github.com/WessamMounchit/Garage_V.Parrot)

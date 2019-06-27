<p align="center">
    <img src="https://i.imgur.com/rNl9EhX.png" alt="Logo de Utaria" width="500">
</p>

<h1 align="center">api.utaria.fr</h1>
<h4 align="center">
API interne de gestion du réseau Utaria
<br>
Propulsée par Express et JWT.
</h4>

<p align="center">
    <a href="https://twitter.com/Utaria_FR">
        <img src="https://img.shields.io/twitter/follow/Utaria_FR.svg?style=social&label=Suivez-nous%20sur%20Twitter" alt="Suivez-nous">
    </a>
    <a href="https://discord.gg/UNgPrPk">
        <img src="https://img.shields.io/discord/220472433344380928.svg" alt="Discord">
    </a>
    <br>
    <a href="https://github.com/Utaria/api.utaria.fr/commits/master">
        <img src="https://img.shields.io/github/last-commit/Utaria/api.utaria.fr/master.svg" alt="GitHub last commit">
    </a>
    <a href="https://github.com/Utaria/api.utaria.fr/blob/master/LICENSE.md">
        <img src="https://img.shields.io/badge/Licenses-CC%20BY--SA%203.0%20&%20MIT-green.svg" alt="License">
    </a>
</p>

>
> Cette API a été réalisée en interne afin de satisfaire des besoins intra-serveurs. Elle a été réalisée rapidemment et dans un contexte d'évolution technique du serveur. Elle risque donc d'être peu optimisée, pouvant contenir des failles de sécurité, et non adaptée à une utilisation externe. \
> Développé par [Utarwyn](https://github.com/utarwyn). 
>


## En quoi consiste ce programme ?

Ce programme est une API qui met en oeuvre des outils utilisés principalement en interne pour la liaison des serveurs et des services web.
Elle permet aussi à notre boutique de vérifier la validité d'un pseudonyme de joueur.
Ces principales fonctionnalités sont :

* Authentification aux actions avec une clé secrète
* Système de contrôleur / route / modèle pour gérer efficacement les actions
* Vérification de l'identité d'un joueur par son pseudonyme et son mot de passe
* Mise à disposition des plugins déployés en interne via **Jenkins**
* Récupération dynamique d'un hôte de base de données pour un serveur

> :warning: Attention ! Cette API a été réalisée dans le cadre du projet **UTARIA**, elle n'est donc pas utilisable telle quelle. Si vous souhaitez l'utiliser, de nombreux changements sont à prévoir. Dans ce cas, il serait plus judicieux de prendre appui dessus pour réaliser votre **propre API**.

## Quelles technologies utilise-t-il ?

L'API utilise principalement les librairies suivantes :

* Bcrypt **3.+** : fonction de hashage des mots de passe
* Express **4.+** : cadre web rapide et minimaliste pour Node
* JWT (jsonwebtoken) **8.+** : une implémentation des JSON Web Tokens
* Mysql **2.+** : connecteur simple et rapide à nos bases de données

## Remerciements

On remercie tous les participants de notre belle aventure et les joueurs, sans qui nous ne serions pas là aujourd'hui. :fire: :heart_eyes: 

## Licence

> Voir le fichier [LICENSE.md](https://github.com/Utaria/api.utaria.fr/blob/master/LICENSE.md)

---

> GitHub [@Utaria](https://github.com/utaria) &nbsp;&middot;&nbsp;
> Twitter [@Utaria_FR](https://twitter.com/Utaria_FR)

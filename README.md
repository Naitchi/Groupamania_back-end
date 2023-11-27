<div align="center">
  
# 💻 **Groupamania Back-end**

<pre>
Back-end du site Groupamania, un réseau social d'entreprise.
</pre>
  
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Vous ne vous y retrouvez pas dans les réseaux sociaux traditionnel pour votre entreprise ? 
Alors tenter **Groupamania** un tout nouveau réseau social d'entreprise. 
</div>

## Aperçu

**Groupamania** est la dernière application (7ème projet) que j'ai développé pour le parcours "Développeur Web FullStack" d'OpenClassrooms. 
Ce Back-end contient un API rest qui va s'occuper de toutes les requêtes nécessaire pour le réseau.

## Technologies Utilisées

- Bcrypt pour crypter les mots de passe avant la Database <a href="https://www.npmjs.com/package/bcrypt#usage">(Doc)</a>
- Cors pour activer le Cross-origin resource sharing <a href="https://www.npmjs.com/package/cors#usage">(Doc)</a>
- Dotenv pour sécurisé les différentes clés/url <a href="https://www.npmjs.com/package/dotenv#-documentation">(Doc)</a>
- Express v4 comme framework <a href="https://expressjs.com/en/4x/api.html">(Doc)</a>
- JWT pour sécurisé les requêtes <a href="https://jwt.io/introduction/">(Doc)</a>
- Multer pour permettre le transfère d'image <a href="https://www.npmjs.com/package/multer#usage">(Doc)</a>
- MySQL comme base de données <a href="https://dev.mysql.com/doc/">(Doc)</a>
- Password validator pour s'assurer que le mot de passe est sécurisé <a href="https://www.npmjs.com/package/password-validator#usage">(Doc)</a>

## Installation :

```
npm install
```

Créer un ficher .env dans le fichier root de votre projet et y ajouter votre clef pour acceder a la base Mysql avec DB_HOST une paire NAME = VALUE , et votre token pour le cryptage des mots de passe avec PASSWORD_SECRET_TOKEN.

```
DB_HOST = value
PASSWORD_SECRET_TOKEN = value
```

Lancer le serveur :

```node start```

## Documentation : 

### User

1. Signup
Créez un nouveau compte utilisateur.

```vbnet
POST api/user/signup
```

**Body :**

```json
{
  "email": "utilisateur@example.com",
  "password": "mot_de_passe",
  "nickname": "JohnDoe",
  "birthday": "1990-01-01",
  "phone": "+123456789"
}
```

**Response :**
```json
{
  "message": "Utilisateur créé !"
}
```
2. Login

```vbnet
POST api/user/login
```
   
Authentifiez un utilisateur et générez un jeton.

**Body :**

```json
{
  "email": "utilisateur@example.com",
  "password": "mot_de_passe"
}
```
**Response :**
```json
{
  "admin": true,
  "userId": 123,
  "token": "jeton_utilisateur"
}
```
3. Obtenir l'utilisateur actuel

```vbnet
GET api/user/me
```
   
Obtenez des informations sur l'utilisateur actuellement authentifié.

En-têtes de la requête :
```json
Authorization: Bearer <jeton_utilisateur>
```
**Response :**
```json
{
  "user_Id": {
    "userId": 123
  },
  "admin": true
}
```
4. Obtenir tous les utilisateurs

```vbnet
GET api/user/getAllUsers
```
   
Récupérez la liste de tous les utilisateurs.

**Response :**

```json
{
  "users": [
    {
      "id_user": 1,
      "email": "utilisateur1@example.com",
      // Autres propriétés de l'utilisateur
    },
    // Autres utilisateurs
  ]
}
```
5. Obtenir l'utilisateur par ID

```vbnet
GET api/user/getUser/:id
```

Récupérez un utilisateur par son ID.

**Response :**
```json
{
  "user": {
    "id_user": 1,
    "email": "utilisateur1@example.com",
    // Autres propriétés de l'utilisateur
  }
}
```
6. Modifier l'utilisateur

```vbnet
PUT api/user/modifyUser
```

Modifiez les informations de l'utilisateur.

**Body :**
```json
{
  "id_user": 123,
  "nickname": "NomMisAJour",
  "email": "misajour@example.com",
  "phone": "+987654321",
  "birthday": "1990-01-01",
  "description": "Description utilisateur mise à jour"
}
```
**Response :**
```json
{
  "message": "Profil modifié !"
}
```

7. Modifier la photo de profil

```vbnet
PUT api/user/modifyPP
```

Modifiez la photo de profil d'un utilisateur.

**Body :**
```json
{
  "id_user": 123
}
```
**Response :**
```json
{
  "message": "Photo de profil modifiée !",
  "image": "http://votre-url-de-base-de-lapi.com/images/photo-profil-utilisateur.jpg"
}
```
8. Modifier la photo de profil

```vbnet
PUT api/user/modifyPassword
```

Modifiez le mot de passe d'un utilisateur.

**Body :**
```json
{
  "email": "utilisateur@example.com",
  "oldPassword": "ancien_mot_de_passe",
  "newPassword": "nouveau_mot_de_passe"
}
```
**Response :**
```json
{
  "message": "Mot de passe modifié !"
}
```
9. Supprimer l'utilisateur

```vbnet
DELETE api/user/deleteUser/:id
```

Supprimez un utilisateur par son ID.

**Response :**
```json
{
  "message": "Utilisateur supprimé !"
}
```

### Publication : 

1. Créer une publication

```vbnet
POST api/publication/createPublication
```

Créez une nouvelle publication.

**Body :** 

```json
{
  "id_user": 123,
  "content": "Contenu de la publication"
}
```
**Response :**

```json
{
  "message": "Publication créée !"
}
```

2. Supprimer une publication
```vbnet
DELETE api/publication/deletePublication/:id
```

Supprimez une publication par son ID.

**Response :**
```json
{
  "message": "Publication supprimée !"
}
```
3. GET /getOnePublication/:id

```vbnet
GET api/publication/getOnePublication/:id
```

Récupérez une publication par son ID.

**Response :**
```json
{
  "publication": {
    "id_user": 1,
    "nickname": "JohnDoe",
    "profilepicture": "http://votre-url-de-base-de-lapi.com/images/user-profile.jpg",
    "id_publication": 123,
    "content": "Contenu de la publication",
    "date_add": "2023-01-01T12:00:00Z",
    "image": "http://votre-url-de-base-de-lapi.com/images/publication-image.jpg"
  }
}
```

4. Récupérer toutes les publications

```vbnet
GET api/publication/getAllPublications
```

Récupérez la liste de toutes les publications.

**Response :**
```json
{
  "publications": [
    {
      "id_user": 1,
      "nickname": "JohnDoe",
      "profilepicture": "http://votre-url-de-base-de-lapi.com/images/user-profile.jpg",
      "id_publication": 123,
      "content": "Contenu de la publication",
      "date_add": "2023-01-01T12:00:00Z",
      "image": "http://votre-url-de-base-de-lapi.com/images/publication-image.jpg"
    },
    // Autres publications
  ]
}
```
5. Récuperer les publications d'un utilisateur
   
```vbnet
GET api/publication/getAllPublicationsFromUser/:id
```

Récupérez toutes les publications d'un utilisateur par son ID.

**Response :**
```json
{
  "publications": [
    {
      "id_publication": 123,
      "content": "Contenu de la publication",
      "date_add": "2023-01-01T12:00:00Z",
      "image": "http://votre-url-de-base-de-lapi.com/images/publication-image.jpg"
    },
    // Autres publications de l'utilisateur
  ]
}
```
6. Modifier une publication 

```vbnet
PUT api/publication/modifyPost/:id
```

Modifiez l'image et le contenu d'une publication.

**Body :** 

```json
{
  "id_publication": 123,
  "content": "Nouveau contenu de la publication"
}
```
**Response :**

```json
{
  "message": "Photo de profil Modifiée !",
  "image": "http://votre-url-de-base-de-lapi.com/images/nouvelle-image.jpg"
}
```
7. Modifier le contenut d'une publication

```vbnet
PUT api/publication/modifyPostContent/:id
```

Modifiez le contenu d'une publication.

**Body :** 

```json
{
  "id_publication": 123,
  "content": "Nouveau contenu de la publication"
}
```
**Response :**

```json
{
  "message": "Post Modifié !"
}
```

### Comment 

1. Créer un commentaire
```vbnet
POST api/comment/createComment
```

Créez un nouveau commentaire.

**Body :**
```json
{
  "user_id_user": 123,
  "publication_id_publication": 456,
  "content": "Contenu du commentaire"
}
```
**Response :**

```json
{
  "message": "Commentaire créé !"
}
```
2. DELETE /deleteComment/:id

```vbnet
DELETE api/comment/deleteComment/:id
```

Supprimez un commentaire par son ID.

**Response :**
```json
{
  "message": "Commentaire supprimé !"
}
```
3. GET /getCommentsFromAPost/:id

```vbnet
GET api/comment/getCommentsFromAPost/:id
```

Récupérez tous les commentaires d'une publication par son ID.

**Response :**
```json
{
  "comments": [
    {
      "id_comment": 1,
      "user_id_user": 123,
      "nickname": "JohnDoe",
      "profilepicture": "http://votre-url-de-base-de-lapi.com/images/user-profile.jpg",
      "publication_id_publication": 456,
      "content": "Contenu du commentaire",
      "date_add": "2023-01-01T12:00:00Z"
    },
    // Autres commentaires
  ]
}
```
### React 

1. Ajout d'une Réaction

```vbnet
POST api/react/addReact
```

Ajoutez une nouvelle réaction à une publication.

**Body :**
```json
{
  "id_user": 123,
  "id_publication": 456
}
```
**Response :**
```json
{
  "message": "Réaction ajoutée !"
}
```

2. Récupérer les réactions d'une publication
   
```vbnet
GET api/react/getReactsFromAPublication/:id
```

Récupérez toutes les réactions d'une publication par son ID.

**Response :**

```json
{
  "reacts": [
    {
      "user_id_user": 123,
      "publication_id_publication": 456
    },
    // Autres réactions
  ]
}
```
3. Supprimer une reaction

```vbnet
DELETE api/react/deleteReact
```
Supprimez une réaction d'une publication.

**Body :**
```json
{
  "id_user": 123,
  "id_publication": 456
}
```

**Response :**
```json
{
  "message": "Réaction supprimée !"
}
```

## Contact

Vous pouvez me contacter via <a href="https://www.linkedin.com/in/benjamin-clairotte/">Linkedin</a> Si vous avez des questions ou si vous voulez me parler.

## Contribué 

1. Fork it (<https://github.com/naitchi/Groupamania_back-end/fork>)
2. Créer la branch de votre fonctionnalité (`git checkout -b feature/fooBar`)
3. Commit vos changement (`git commit -am 'Add some fooBar'`)
4. Push sur la branch (`git push origin feature/fooBar`)
5. Créer une nouvelle Pull Request


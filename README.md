<div align="center">
  
# 💻 **Groupamania Back-end**

<pre>
Back-end du site **Groupamania**, un réseau social d'entreprise.
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


// TODO 



## Contact

Vous pouvez me contacter via <a href="https://www.linkedin.com/in/benjamin-clairotte/">Linkedin</a> Si vous avez des questions ou si vous voulez me parler.

## Contribué 

1. Fork it (<https://github.com/naitchi/Groupamania_back-end/fork>)
2. Créer la branch de votre fonctionnalité (`git checkout -b feature/fooBar`)
3. Commit vos changement (`git commit -am 'Add some fooBar'`)
4. Push sur la branch (`git push origin feature/fooBar`)
5. Créer une nouvelle Pull Request


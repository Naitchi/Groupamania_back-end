const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dbconn = require("../db_connection.js");

//demander son téléphone, sa date de naissance et son pseudo en plus
exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        email: req.body.email,
        password: hash,
        nickname: req.body.nickname,
        birthday: req.body.birthday,
        phone: req.body.phone,
      };
      dbconn.query("INSERT INTO user SET ?", [user], function (err) {
        if (err) {
          res
            .status(500)
            .json({
              message: "Probleme lors de la création de l'utilisateur !" + err,
            });
        } else {
          res.status(201).json({ message: "Utilisateur créé !" });
        }
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  dbconn.query(
    "SELECT id_user, nickname, password FROM user WHERE email = ?",
    [req.body.email],
    function (error, passwordFromDB) {
      if (passwordFromDB == []) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      if (error) res.status(401).json({ error });
      bcrypt
        .compare(req.body.password, passwordFromDB[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: passwordFromDB[0].id_user,
            token: jwt.sign(
              { userId: passwordFromDB[0].id_user },
              process.env.PASSWORD_SECRET_TOKEN,
              { expiresIn: "24h" }
            ),
          });
        });
    }
  );
};

exports.getAllUsers = (req, res) => {
  dbconn.query("SELECT * FROM user", function (err, users) {
    if (err) {
      res.status(400).json({ message: "Ressources non trouvé" + err });
    } else {
      res.status(200).json({ users });
    }
  });
};

exports.deleteUser = (req, res) => {
  dbconn.query(
    "DELETE FROM user WHERE id_user = ?",
    [req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ message: "Ressources non trouvées " + err });
      } else {
        res.status(203).json({ message: "Utilisateur supprimé !" });
      }
    }
  );
};

exports.getUser = (req, res) => {
  dbconn.query(
    "SELECT * FROM user WHERE id_user = ?",
    [req.params.id],
    function (err, user) {
      if (err) {
        res.status(400).json({ message: "Ressources non trouvées " + err });
      } else {
        res.status(200).json({ user });
      }
    }
  );
};

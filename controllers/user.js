const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const dbconn = require("../db_connection.js");
const exp = require("constants");

//si j'oublie le mot de passe pepelof 😁
exports.crypt = (req, res) => {
  console.log("test");
  bcrypt.hash(req.body.string, 10).then((crypted) => {
    console.log(crypted);
    res.status(200).json({ crypted });
  });
};

//Route pour retrouver l'id de l'utilisateur: ce sert du token dans le localstore
exports.me = (req, res) => {
  console.log("/me");
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user_Id = jwt.verify(token, process.env.PASSWORD_SECRET_TOKEN);
    res.status(200).json({ user_Id });
  } catch {
    res.status(404).json({
      error: new Error("Aucun Utilisateur avec cet ID!"),
    });
  }
};

exports.modifyPP = (req, res) => {
  console.log("modifyPP");
  console.log(req.body.id_user);

  const image = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  dbconn.query(
    `UPDATE user SET profilepicture = ? WHERE id_user = ?`,
    [image, req.body.id_user],
    function (err) {
      if (err) {
        res.status(500).json({
          message: "Problème lors de la modification de l'image !" + err,
        });
      } else {
        res.status(200).json({
          message: "Photo de profil Modifiée !",
          image,
        });
      }
    }
  );
};

//demande pour modifier le password; a besoin de l'email de l'ancien password et d'un nouveau password
exports.modifyPassword = (req, res) => {
  console.log("modifyPassword");
  dbconn.query(
    "SELECT id_user, password FROM user WHERE email = ?",
    [req.body.email],
    function (error, userFromDB) {
      if (userFromDB == []) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      if (error) res.status(401).json({ error });
      bcrypt
        .compare(req.body.oldPassword, userFromDB[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          bcrypt
            .hash(req.body.newPassword, 10)
            .then((hash) => {
              console.log(typeof userFromDB[0].id_user);
              console.log(req.body.newPassword);
              dbconn.query(
                "UPDATE user SET password = ? WHERE id_user = ?",
                [hash, userFromDB[0].id_user],
                function (err) {
                  if (err) {
                    res.status(500).json({
                      message:
                        "Problème lors du changement de mot de passe !" + err,
                    });
                  } else {
                    res.status(201).json({ message: "Mot de passe modifié !" });
                  }
                }
              );
            })
            .catch((error) =>
              res.status(500).json({
                message: "Problème lors du mysql!" + error,
              })
            );
        });
    }
  );
};

exports.signup = (req, res) => {
  console.log("signup");
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const datetime = new Date();
      const user = {
        email: req.body.email,
        password: hash,
        nickname: req.body.nickname,
        birthday: req.body.birthday,
        phone: req.body.phone,
        inscription_date: datetime,
        profilepicture:
          "http://localhost:3000/images/E9a2n7HWQAUYsr2.jpg1633511891199.jpg",
      };
      dbconn.query("INSERT INTO user SET ?", [user], function (err) {
        if (err) {
          res.status(500).json({
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
  console.log("login");
  dbconn.query(
    "SELECT id_user, nickname, password FROM user WHERE email = ?",
    [req.body.email],
    function (error, passwordFromDB) {
      if (passwordFromDB == []) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      if (error) res.status(401).json({ error });
      console.log(passwordFromDB[0].password);
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

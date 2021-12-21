const fs = require("fs");
const dbconn = require("../db_connection.js");

exports.createPublication = (req, res) => {
  console.log("create publication");
  const datetime = new Date();
  const publication = {
    user_id_user: req.body.id_user,
    content: req.body.content,
    date_add: datetime,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  };
  console.log(publication);
  dbconn.query("INSERT INTO publication SET ?", [publication], function (err) {
    if (err) {
      res.status(500).json({ message: "erreur :  " + err });
    } else {
      res.status(200).json({ message: "Publication créée !" });
    }
  });
};

exports.deletePublication = (req, res) => {
  console.log("deletePublication");
  dbconn.query(
    "DELETE FROM publication WHERE id_publication = ?",
    [req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ message: "Ressources non trouvées " + err });
      } else {
        res.status(200).json({ message: "Publication supprimée !" });
      }
    }
  );
};

exports.getOnePublication = (req, res) => {
  console.log("getOnePublication");
  dbconn.query(
    "SELECT id_user, nickname, profilepicture, id_publication, user_id_user, content, date_add, image FROM user JOIN publication ON user.id_user = publication.user_id_user WHERE id_publication = ?",
    [req.params.id],
    function (err, publication) {
      if (err) {
        res.status(400).json({ message: "Ressources non trouvées " + err });
      } else if (publication.length == 0) {
        res.status(404).json({ message: "Ressources absente " + err });
      } else {
        res.status(200).json({ publication: publication[0] });
      }
    }
  );
};

exports.getAllPublication = (req, res) => {
  console.log("getallpublications");
  dbconn.query(
    "SELECT id_user, nickname, profilepicture, id_publication, user_id_user, content, date_add, image FROM user JOIN publication ON user.id_user = publication.user_id_user ORDER BY publication.id_publication DESC",
    function (err, publications) {
      if (err) {
        res.status(400).json({ message: "Ressources non trouvé" + err });
      } else {
        res.status(200).json({ publications });
      }
    }
  );
};

exports.getAllPublicationFromUser = (req, res) => {
  console.log("getallpublication from an User");
  dbconn.query(
    "SELECT * FROM publication WHERE user_id_user = ? ORDER BY id_publication DESC",
    [req, params, id],
    function (err, publications) {
      if (err) {
        res.status(400).json({ message: "Ressources non trouvé" + err });
      } else {
        res.status(200).json({ publications });
      }
    }
  );
};

exports.modifyPost = (req, res) => {
  console.log("modifyPost");
  const image = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  const content = req.body.content;
  dbconn.query(
    `UPDATE publication SET image = ?,content = ? WHERE id_publication = ?`,
    [image, content, req.body.id_publication],
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

exports.modifyPostContent = (req, res) => {
  console.log("modifyPostContent");
  dbconn.query(
    `UPDATE publication SET content = ? WHERE id_publication = ?`,
    [req.body.content, req.body.id_publication],
    function (err) {
      if (err) {
        res.status(500).json({
          message: "Problème lors de la modification du contenu !" + err,
        });
      } else {
        res.status(200).json({
          message: "Post Modifié !",
        });
      }
    }
  );
};

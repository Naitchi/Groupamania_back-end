const fs = require("fs");
const dbconn = require("../db_connection.js");

exports.createPublication = (req, res, next) => {
  const datetime = new Date();
  const publication = {
    user_id_user: req.body.id_user,
    content: req.body.content,
    date_add: datetime,
  };
  dbconn.query("INSERT INTO publication SET ?", [publication], function (err) {
    if (err) res.status(500).json({ message: "erreur :  " + err });
    else res.status(200).json({ message: "Publication créée !" });
  });
};

exports.getOnePublication = (req, res, next) => {
  dbconn.query(
    "SELECT * FROM `publication` where id_publication = ?",
    [req.params.id],
    function (err, publication) {
      if (err)
        res.status(400).json({ message: "Ressources non trouvées " + err });
      else res.status(201).json(publication);
    }
  );
};

exports.deletePublication = (req, res, next) => {
  dbconn.query(
    "DELETE FROM publication WHERE id_publication = ?",
    [req.params.id],
    function (err) {
      if (err)
        res.status(400).json({ message: "Ressources non trouvées " + err });
      else res.status(200).json({ message: "Publication supprimée !" });
    }
  );
};

exports.getAllPublication = (req, res, next) => {
  dbconn.query("SELECT * FROM publication", function (err, publications) {
    if (err) res.status(400).json({ message : "Ressources non trouvé" + err}) ;
    else res.status(200).json({ publications });
  });
};
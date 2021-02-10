const dbconn = require("../db_connection.js");

exports.createComment = (req, res, next) => {
  const datetime = new Date();
  const comment = {
    user_id_user: req.body.id_user,
    publication_id_publication: req.body.id_publication,
    comment_id_comment: req.body.id_comment,
    content: req.body.content,
    date_add: datetime,
  };
  dbconn.query("INSERT INTO comment SET ?", [comment], function (err) {
    if (err) res.status(500).json(err);
    else res.status(200).json({ message: "commentaire créé !" });
  });
};

exports.deleteComment = (req, res, next) => {
  dbconn.query(
    "DELETE FROM comment WHERE id_comment = ?",
    [req.params.id],
    function (err) {
      if (err) res.status(404).json({message:"aucun commentaire trouvé "+err});
      else res.status(200).json({message:"commentaire supprimé !"});
    }
  );
};

//fonction pour voir tout les commentaitres d'un publication en particulier
exports.seeComments = (req, res, next) => {
  dbconn.query(
    "SELECT * FROM comment WHERE publication_id_publication = ?",
    [req.params.id],
    function (err, comments) {
      if (err)
        res.status(404).json({ message: "aucun commentaire trouvé !" + err });
      else res.status(200).json({ comments });
    }
  );
};

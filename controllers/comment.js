const dbconn = require("../db_connection.js");

exports.createComment = (req, res) => {
  console.log("createAComment");
  const datetime = new Date();
  const comment = {
    user_id_user: req.body.user_id_user,
    publication_id_publication: req.body.publication_id_publication,
    content: req.body.content,
    date_add: datetime,
  };
  dbconn.query("INSERT INTO comment SET ?", [comment], function (err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json({ message: "commentaire créé !" });
    }
  });
};

exports.deleteComment = (req, res) => {
  console.log("deleteAComment");
  dbconn.query(
    "DELETE FROM comment WHERE id_comment = ?",
    [req.params.id],
    function (err) {
      if (err) {
        res.status(404).json({ message: "aucun commentaire trouvé " + err });
      } else {
        res.status(200).json({ message: "commentaire supprimé !" });
      }
    }
  );
};

exports.getCommentsFromAPost = (req, res) => {
  console.log("getCommentsFromAPost");
  dbconn.query(
    "SELECT id_comment, user_id_user, nickname, profilepicture, publication_id_publication, content, date_add  FROM comment JOIN user ON user.id_user = comment.user_id_user WHERE publication_id_publication = ? ORDER BY comment.id_comment DESC",
    [req.params.id],
    function (err, comments) {
      if (err) {
        res.status(404).json({ message: "aucun commentaire trouvé !" + err });
      } else {
        res.status(200).json({ comments });
      }
    }
  );
};

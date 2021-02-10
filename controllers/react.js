const dbconn = require("../db_connection.js");

exports.addReact = (req, res, next) => {
  const react = {
    react: req.body.react,
    user_id_user: req.body.id_user,
    publication_id_publication: req.body.id_publication,
    comment_id_comment: req.body.id_comment
  };
  dbconn.query("INSERT INTO react SET ?", [react], function (err) {
    if (err) res.status(400).json({ err });
    else res.status(201).json({ message: "réaction ajoutée !" });
  });
};

exports.seeReactsFromAComment = (req, res, next) => {
  dbconn.query(
    "SELECT * FROM react WHERE comment_id_comment = ?",
    [req.params.id],
    function (err, reacts) {
      if (err)
        res.status(404).json({ message: "aucune reaction trouvée !" + err });
      else res.status(200).json({ reacts });
    }
  );
};

exports.seeReactsFromAPublication = (req, res, next) => {
  dbconn.query(
    "SELECT * FROM react WHERE publication_id_publication = ?",
    [req.params.id],
    function (err, reacts) {
      if (err)
        res.status(404).json({ message: "aucune réactions trouvée !" + err });
      else res.status(200).json({ reacts });
    }
  );
};

exports.deleteReact = (req, res, next) => {
  dbconn.query(
    "DELETE FROM react WHERE id_react = ?",
    [req.params.id],
    function (err) {
      if (err) res.status(400).json({ err });
      else res.status(201).json({ message: "réaction supprimé !" });
    }
  );
};

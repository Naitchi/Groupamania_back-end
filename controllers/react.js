const dbconn = require("../db_connection.js");

exports.addReact = (req, res) => {
  console.log("add react");
  const react = {
    user_id_user: req.body.id_user,
    publication_id_publication: req.body.id_publication,
  };
  dbconn.query("INSERT INTO react SET ?", [react], function (err) {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(201).json({ message: "réaction ajoutée !" });
    }
  });
};

exports.getReactsFromAPublication = (req, res) => {
  dbconn.query(
    "SELECT * FROM react WHERE publication_id_publication = ?",
    [req.params.id],
    function (err, reacts) {
      if (err) {
        res.status(404).json({ message: "aucune réaction trouvée !" + err });
      } else {
        res.status(200).json({ reacts });
      }
    }
  );
};

exports.delete = (req, res) => {
  console.log("delete react");
  console.log(req.body);
  console.log(req.body.id_user, req.body.id_publication);
  dbconn.query(
    "DELETE FROM react WHERE user_id_user = ? and publication_id_publication = ?",
    [req.body.id_user, req.body.id_publication],
    function (err) {
      if (err) {
        res.status(400).json({ err });
      } else {
        res.status(201).json({ message: "réaction supprimée !" });
      }
    }
  );
};

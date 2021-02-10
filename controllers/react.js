const dbconn = require("../db_connection.js");

exports.addReact = (req, res, next) => {
  const react = req.body.like;
  dbconn.query("INSERT INTO react SET ?", [react], function (err) {
    if (err) res.status(400).json({ err });
    else res.status(201).json({ message: "réaction ajoutée !" });
  });
};

exports.deleteReact = (req, res, next) => {
  dbconn
    .query("DELETE FROM react WHERE id = ?", [req.params.id], function (err) {
      if (err) res.status(400).json({ err });
      else res.status(201).json({ message: "réaction supprimé !" });
    });
};

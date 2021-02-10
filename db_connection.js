const mysql = require("mysql");

const dbconn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

dbconn.connect(function (err) {
  if (err) {
    console.log("Database connection error " + err);
  } else {
    console.log("Database connection successful");
  }
});

/*dbconn.query(
  "SELECT * FROM user WHERE id_user = ?" [1],
  function (err, records) {
    if (err) throw err;
  });*/

module.exports = dbconn;

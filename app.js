const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const userRoutes = require("./routes/user");
const publicationRoutes = require("./routes/publication");
const reactRoutes = require('./routes/react');
const commentRoutes = require('./routes/comment');

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
});

app.use(limiter);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/api/user", userRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/react",reactRoutes);
app.use("/api/comment",commentRoutes);

module.exports = app;
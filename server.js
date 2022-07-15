require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const router = require(path.resolve(__dirname, "routes.js"));
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const helmet = require("helmet");
const csrf = require("csurf");
const {
  handleCSRF,
  insertCSRFToken,
} = require("./src/middlewares/middlewares");

const sessionOptions = session({
  secret: process.env.MONGO_STORE_SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTION_STRING,
    dbName: "test-sessions",
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

function makeApp(database) {
  database
    .then(() => app.emit("database connected"))
    .catch((e) => console.error(e));

  app.set("views", path.resolve(__dirname, "src", "views"));
  app.set("view engine", "ejs");

  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.resolve(__dirname, "public")));
  app.use(sessionOptions);
  app.use(flash());
  app.use(helmet());
  app.use(csrf());
  app.use(insertCSRFToken);
  app.use(handleCSRF);
  app.use(router);

  return app;
}

module.exports = makeApp;

require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const router = require(path.resolve(__dirname, "routes.js"));
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const helmet = require("helmet");
const csrf = require("csurf");
const { insertCSRFToken } = require("./src/middlewares/middlewares");
const { handleCSRF } = require("./src/middlewares/middlewares.js");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => app.emit("database connected"));

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

module.exports = app;

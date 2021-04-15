const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const errorHandler = require("./controllers/error");

const MONGODB_URI =
  "mongodb+srv://iuryb:6X26pZqy6L89Zrz@cluster0.1qccr.mongodb.net/DalsDB?retryWrites=true&w=majority";
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(userRoutes);

app.use(errorHandler.get404);

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

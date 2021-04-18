const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./models/user");
const multer = require("multer");
const csrf = require("csurf");

const errorHandler = require("./controllers/error");

const MONGODB_URI =
  "mongodb+srv://iuryb:6X26pZqy6L89Zrz@cluster0.1qccr.mongodb.net/DalsDB?retryWrites=true&w=majority";
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csrf();

app.use(
  session({
    secret: "[11*^aqd4qxqVP/nNsJ&uW~B0o",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use(csrfProtection);
app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.use(errorHandler.get404);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, '/uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
//   }
// })

const port = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

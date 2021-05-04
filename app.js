const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./models/user");
const multer = require("multer");
const csrf = require("csurf");
const flash = require("connect-flash");

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
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).array("file", 10)
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "/images")));

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use(csrfProtection);
app.use("/admin", adminRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.get("/500", errorHandler.get500);
app.use(errorHandler.get404);

app.use((error, req, res, next) => {
  res.redirect("/500");
});

const port = process.env.PORT || 3000;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

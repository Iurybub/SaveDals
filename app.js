const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorHandler = require("./controllers/error");

const MONGODB_URI =
  "mongodb+srv://iuryb:6X26pZqy6L89Zrz@cluster0.1qccr.mongodb.net/DalsDB?retryWrites=true&w=majority";
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

const adoptionRoutes = require("./routes/adoption");
const adminRoutes = require("./routes/admin");

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(adoptionRoutes);

app.use(errorHandler.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

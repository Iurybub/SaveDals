const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal",
  },
  paperword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Request", requestSchema);

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
  // paperworkUrl: {
  //   type: String,
  //   required: true,
  // },
  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model("Request", requestSchema);

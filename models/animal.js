const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const animalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  breed: {
    type: String,
    required: true,
  },
  adopted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = mongoose.model("Animal", animalSchema);

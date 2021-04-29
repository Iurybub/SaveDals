const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testimonialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model("Testimonial", testimonialSchema);

const mongoose = require("mongoose");

const schema = mongoose.Schema({
  avatar: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  birthday: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
    minLength: 3,
  }
});

const model = mongoose.model("candidate", schema);

module.exports = model;
